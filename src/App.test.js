import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SynchronousPromise } from 'synchronous-promise';

import App from './App';
import { store } from './redux';
import * as utils from './utils';

jest.mock('./utils');

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

  test('display menu & show price when items are added', () => {
    renderApp();

    act(() => {
      // finish the API loading successfully
      syncPromise.resolve(loadFoodData);
    });

    // on success, show menu
    expect(screen.getByText(/Sausage McMuffin/i)).toBeInTheDocument();
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();
    expect(screen.queryByRole('link', {name: /Pay for food/i})).toBe(null);


    // add Sausage to cart once
    fireEvent.click(screen.getByRole('button', {name: /Add Sausage McMuffin to cart/i}));

    // check that the quantity of Sausage & cart price is shown.
    expect(screen.getByRole('status')).toHaveTextContent(1);
    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($12)');


    // add more items to cart
    fireEvent.click(screen.getByRole('button', {name: /Add Mushroom Pizza to cart/i}));
    fireEvent.click(screen.getByRole('button', {name: /Add Mushroom Pizza to cart/i}));

    // check the quantity of Pizza is shown & cart price is updated
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(2);
    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($52)');


    // remove Pizza from cart
    fireEvent.click(screen.getByRole('button', {name: /Remove Mushroom Pizza from cart/i}));

    // on removing an item, show the updated quantities & price.
    expect(screen.getAllByRole('status')[0]).toHaveTextContent(1);
    expect(screen.getAllByRole('status')[1]).toHaveTextContent(1);
    expect(screen.getByRole('link', {name: /Pay for food/i})).toHaveTextContent('Pay for food ($32)');
  });

  test('only show veg food when veg filter is applied', () => {
    renderApp();

    act(() => {
      // finish the API loading successfully
      syncPromise.resolve(loadFoodData);
    });

    // enable Veg Only filter
    fireEvent.click(screen.getByRole('checkbox', {name: /Veg Only/i}));

    expect(screen.queryByText(/Sausage McMuffin/i)).toBe(null);
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();


    // disable Veg Only filter
    fireEvent.click(screen.getByRole('checkbox', {name: /Veg Only/i}));

    expect(screen.getByText(/Sausage McMuffin/i)).toBeInTheDocument();
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();
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
