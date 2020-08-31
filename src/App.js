import React, { Fragment, useEffect, useState } from 'react';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';

import { ACTIONS } from './redux';
import { MenuList, MenuItem, Message, PaymentFooter } from './Comps';
import { loadFoodData } from './utils';

export default function App() {
  const diet = useSelector((state) => state.diet);
  const dispatch = useDispatch();

  const stateAPIStatus = useLoadFoodData();
  const menuList = useSelector(selectorMenu, shallowEqual);

  React.useEffect(() => {
    console.log('hello');
  }, [menuList]);

  function handleVegToggle() {
    dispatch({
      type: ACTIONS.CHANGE_DIET,
      payload: {
        diet: diet === 'veg' ? 'all' : 'veg',
      },
    });
  }

  return (
    <div className="food-app">
      <header>
        <h1>Ordux</h1>
        <label>
          <input type="checkbox" name="veg-checkbox" value={diet} onChange={handleVegToggle} />
          Veg Only
        </label>
      </header>
      <Message status={stateAPIStatus} />
      {stateAPIStatus === 'success' && (
        <Fragment>
          <main>
            <MenuList menuList={menuList} />
          </main>
          <PaymentFooter />
        </Fragment>
      )}
    </div>
  );
}

function selectorMenu(state) {
  const { diet, menuIdList, menuById } = state;
  const menuId = menuIdList[diet];
  const menuList = [];

  menuId.forEach((id) => {
    menuList.push(menuById[id]);
  });

  return menuList;
}

function useLoadFoodData() {
  const [stateAPIStatus, setAPIStatus] = useState('idle');
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

  return stateAPIStatus;
}
