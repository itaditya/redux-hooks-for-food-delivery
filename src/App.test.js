import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SynchronousPromise } from 'synchronous-promise';

import App from './App';
import { store } from './redux';
import * as utils from './utils';

jest.mock('./utils');

describe('Test App', () => {
  let syncPromise;

  function renderApp(props = {}) {
    return render(
      <Provider store={store}>
        <App {...props} />
      </Provider>,
    );
  }

  beforeEach(() => {
    syncPromise = SynchronousPromise.unresolved();
    utils.loadFoodData.mockImplementation(() => syncPromise);
  });

  test('show loading indicator till API responds', () => {
    renderApp();

    // during loading, show app name and loading indicator
    expect(screen.getByRole('heading')).toHaveTextContent('Ordux');
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');
  });

  test('display menu & show price when items are added', async () => {
    renderApp();

    act(() => {
      // finish the API loading successfully
      syncPromise.resolve([
        {
          id: 'SN',
          label: 'Schezwan Noodles',
          description: 'Description of Noodles',
          price: 4,
        },
        {
          id: 'CP',
          label: 'Mushroom Pizza',
          description: 'Description of Pizza',
          price: 10,
        },
      ]);
    });

    // on success, show menu
    expect(screen.getByText(/Schezwan Noodles/i)).toBeInTheDocument();
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Pay for food/i})).toBe(null);


    // add Noodles to cart once
    fireEvent.click(screen.getByRole('button', {name: /Add Schezwan Noodles to cart/i}));

    // check that the quantity of Noodles & cart price is shown.
    expect(screen.getByRole('status')).toHaveTextContent(1);
    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($4)');


    // add more items to cart
    fireEvent.click(screen.getByRole('button', {name: /Add Mushroom Pizza to cart/i}));
    fireEvent.click(screen.getByRole('button', {name: /Add Mushroom Pizza to cart/i}));

    // check the quantity of Pizza is shown & cart price is updated
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(2);
    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($24)');


    // remove Pizza from cart
    fireEvent.click(screen.getByRole('button', {name: /Remove Mushroom Pizza from cart/i}));

    // on removing an item, show the updated quantities & price.
    expect(screen.getAllByRole('status')[0]).toHaveTextContent(1);
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(1);
    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($14)');
  });

  it('shows error if API fails', () => {
    renderApp();

    act(() => {
      // API returns error
      syncPromise.reject();
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Menu failed to load.Please try again...');
  });
});
