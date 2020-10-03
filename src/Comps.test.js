import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { PaymentFooter } from './Comps';
import { store, ACTIONS } from './redux';

const loadFoodData = [
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
  const { dispatch } = store;
  const cartIds = ['SM', 'SM', 'MP'];

  function renderPaymentFooter(props = {}) {
    return render(
      <Provider store={store}>
        <PaymentFooter {...props} />
      </Provider>,
    );
  }

  const addItemsInStore = () => {
    dispatch({
      type: ACTIONS.LOAD_MENU,
      payload: {
        menu: loadFoodData,
      },
    });
    cartIds.forEach((id) => {
      dispatch({
        type: ACTIONS.ADD_TO_CART,
        payload: {
          itemId: id,
        },
      });
    });
  };

  const resetMenu = () => {
    cartIds.forEach((id) => {
      dispatch({
        type: ACTIONS.REMOVE_FROM_CART,
        payload: {
          itemId: id,
        },
      });
    });
  };

  test('payment footer shows cart price when items present in cart', () => {
    addItemsInStore();
    renderPaymentFooter();

    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($44)');

    resetMenu();
    expect(screen.queryByRole('link', {name: /Pay for food/i})).toBe(null);
  });
});
