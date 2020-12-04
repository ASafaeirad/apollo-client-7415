const { GraphQLServer, PubSub } = require("graphql-yoga");

const typeDefs = `
  type Query {
    hello: String!
  }

  type Random {
    number: Int!
  }

  type Counter {
    count: Int!
    guess: Random!
  }

  type Subscription {
    counter: Counter!
  }
`;

const resolvers = {
  Query: {
    hello: () => `Hello`,
  },
  Random: {
    number: () => 42,
  },
  Counter: {
    countStr: (counter) => `Current count: ${counter.count}`,
  },
  Subscription: {
    counter: {
      subscribe: (_, __, { pubsub }) => {
        const channel = Math.random().toString(36).substring(2, 15); // random channel
        let count = 0;
        setInterval(
          () => pubsub.publish(channel, { counter: { count: count++ } }),
          2000
        );
        return pubsub.asyncIterator(channel);
      },
    },
  },
};

const pubsub = new PubSub();
const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });

server.start(() => console.log("Server is running on localhost:4000"));
