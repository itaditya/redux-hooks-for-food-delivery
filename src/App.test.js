import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import { createReduxStore } from './redux';
import * as utils from './utils';

jest.mock('./utils');

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

describe('Test App', () => {
  function renderApp(store = createReduxStore(), props = {}) {
    return render(
      <Provider store={store}>
        <App {...props} />
      </Provider>,
    );
  }

  beforeEach(() => {
    utils.loadFoodData.mockImplementation(() => Promise.resolve(foodData));
  });

  afterEach(() => {
    utils.loadFoodData.mockRestore();
  });

  test('show loading indicator till API responds', async () => {
    renderApp();

    // during loading, show app name and loading indicator
    expect(screen.getByRole('heading')).toHaveTextContent('Ordux');
    expect(screen.getByRole('status')).toHaveTextContent('Loading...');

    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));
  });

  test('display menu & show price when items are added', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

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

  test('only show veg food when veg filter is applied', async () => {
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    // enable Veg Only filter
    fireEvent.click(screen.getByRole('checkbox', {name: /Veg Only/i}));

    expect(screen.queryByText(/Sausage McMuffin/i)).toBe(null);
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();


    // disable Veg Only filter
    fireEvent.click(screen.getByRole('checkbox', {name: /Veg Only/i}));

    expect(screen.getByText(/Sausage McMuffin/i)).toBeInTheDocument();
    expect(screen.getByText(/Mushroom Pizza/i)).toBeInTheDocument();
  });

  it('shows error if API fails', async () => {
    utils.loadFoodData.mockImplementation(() => Promise.reject());
    renderApp();
    await waitForElementToBeRemoved(() => screen.getByText(/Loading/i));

    expect(screen.getByRole('alert')).toHaveTextContent('Menu failed to load.Please try again...');
  });
});
