import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectorMenu, selectorCartPrice, ACTIONS } from './redux';
import { MenuItem, Message, ButtonPay } from './UIComps';
import { loadFoodData } from './utils';

export default function App() {
  const [stateAPIStatus, setAPIStatus] = useState('idle');

  const cartByIds = useSelector((state) => state.cartByIds);
  const { menuList } = useSelector(selectorMenu);
  const cartPrice = useSelector(selectorCartPrice);
  const dispatch = useDispatch();

  useEffect(() => {
    setAPIStatus('loading');
    loadFoodData()
      .then((data) => {
        dispatch({
          type: ACTIONS.LOAD_MENU,
          payload: {
            menu: data,
          },
        });
        setAPIStatus('success');
      })
      .catch((error) => {
        setAPIStatus('failed');
      });
  }, [dispatch]);

  function handleIncrement(id) {
    dispatch({
      type: ACTIONS.ADD_TO_CART,
      payload: {
        itemId: id,
      },
    });
  }

  function handleDecrement(id) {
    dispatch({
      type: ACTIONS.REMOVE_FROM_CART,
      payload: {
        itemId: id,
      },
    });
  }

  return (
    <div className="food-app">
      <header>
        <h1>Ordux</h1>
      </header>
      <Message status={stateAPIStatus} />
      {stateAPIStatus === 'success' && (
        <Fragment>
          <main>
            <ul className="menu-list">
              {menuList.map((item) => {
                const qty = cartByIds[item.id]?.quantity ?? 0;
                return (
                  <MenuItem
                    key={item.id}
                    item={item}
                    quantity={qty}
                    onIncrement={handleIncrement}
                    onDecrement={handleDecrement}
                  />
                );
              })}
            </ul>
          </main>
          <footer className="food-app-footer">
            {cartPrice > 0 && <ButtonPay cartPrice={cartPrice} />}
          </footer>
        </Fragment>
      )}
    </div>
  );
}
