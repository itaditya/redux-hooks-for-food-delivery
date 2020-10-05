import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { PaymentFooter } from './Comps';
import { useCartStore } from './zustand';

const foodData = [
  {
    id: 'SM',
    label: 'Sausage McMuffin',
    description: 'Description of McMuffin',
    price: 12,
  },
  {
    id: 'MP',
    label: 'Mushroom Pizza',
    diet: 'veg',
    description: 'Description of Pizza',
    price: 20,
  },
];

describe('Test PaymentFooter', () => {
  function createQueryCache(queryConfig) {
    const queryCache = new QueryCache({
      defaultConfig: queryConfig || {
        queries: {
          retry: false,
        },
      },
    });

    return queryCache;
  }

  function renderPaymentFooter(queryCache = createQueryCache(), props = {}) {
    return render(
      <ReactQueryCacheProvider queryCache={queryCache}>
        <PaymentFooter {...props} />
      </ReactQueryCacheProvider>,
    );
  }

  const addItemsInStore = (queryCache) => {
    queryCache.setQueryData('menu', foodData);
    useCartStore.setState({
      cartByIds: {
        SM: {
          quantity: 2,
        },
        MP: {
          quantity: 1,
        },
      }
    });
  };

  const resetMenu = () => {
    act(() => {
      useCartStore.setState({
        cartByIds: {},
      });
    })
  };

  test('payment footer shows cart price when items present in cart', () => {
    const queryCache = createQueryCache();

    addItemsInStore(queryCache);
    renderPaymentFooter(queryCache);

    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($44)');

    resetMenu();
    expect(screen.queryByRole('link', {name: /Pay for food/i})).toBe(null);
  });
});
