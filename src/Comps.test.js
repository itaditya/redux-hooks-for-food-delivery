import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { action } from 'mobx';

import { PaymentFooter } from './Comps';
import { RootStore, RootStoreProvider } from './mobx';

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
  function renderPaymentFooter(store = new RootStore(), props = {}) {
    return render(
      <RootStoreProvider value={store}>
        <PaymentFooter {...props} />
      </RootStoreProvider>,
    );
  }

  const addItemsInStore = (store) => {
    store.loadMenu(foodData);
    store.addToCart(store.menu[0]);
    store.addToCart(store.menu[0]);
    store.addToCart(store.menu[1]);
  };

  const resetMenu = action((store) => {
    store.menu = [];
  });

  test('payment footer shows cart price when items present in cart', () => {
    const rootStore = new RootStore();
    addItemsInStore(rootStore);
    renderPaymentFooter(rootStore);

    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($44)');

    resetMenu(rootStore);
    expect(screen.queryByRole('link', {name: /Pay for food/i})).toBe(null);
  });
});
