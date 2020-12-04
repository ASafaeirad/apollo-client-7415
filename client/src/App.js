import { gql, useSubscription } from '@apollo/client';
import React from 'react';

const NESTED = gql`
  subscription Count {
    counter {
      count
      guess {
        number
      }
    }
  }
`;

const FLAT = gql`
  subscription Count {
    counter {
      count
    }
  }
`;


export default function App() {
  useSubscription(NESTED, {
    onSubscriptionData() {
      console.log('Not Working');
    },
  });

  useSubscription(FLAT, {
    onSubscriptionData() {
      console.log('Working');
    },
  });

  return <main>Open console</main>;
}
