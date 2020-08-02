import { createStore } from 'redux';

export const ACTIONS = {
  LOAD_MENU: 'LOAD_MENU',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
};

const initialState = {
  menuByIds: {},
  allMenuIds: [],
  cartByIds: {},
};

function foodReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.LOAD_MENU: {
      const { menu } = action.payload;

      const menuByIds = {};
      menu.forEach((item) => {
        menuByIds[item.id] = item;
      });
      const allMenuIds = menu.map((item) => item.id);

      return {
        ...state,
        menuByIds,
        allMenuIds,
      };
    }
    case ACTIONS.ADD_TO_CART: {
      const { itemId } = action.payload;
      const { cartByIds } = state;

      const cartItem = cartByIds[itemId] || {
        quantity: 0,
      };

      cartItem.quantity += 1;

      const newCart = {
        ...cartByIds,
        [itemId]: cartItem,
      };

      return {
        ...state,
        cartByIds: newCart,
      };
    }
    case ACTIONS.REMOVE_FROM_CART: {
      const { itemId } = action.payload;
      const { cartByIds } = state;

      const cartItem = cartByIds[itemId];

      if (!cartItem) {
        return state;
      }

      cartItem.quantity -= 1;

      const newCart = {
        ...cartByIds,
        [itemId]: cartItem,
      };

      return {
        ...state,
        cartByIds: newCart,
      };
    }
    default:
      return state;
  }
}

export const store = createStore(foodReducer);

export function selectorMenu(state) {
  const { allMenuIds, menuByIds } = state;
  const menuList = [];

  allMenuIds.forEach((id) => {
    menuList.push(menuByIds[id]);
  });

  return {
    menuList,
    menuByIds,
  };
}

export function selectorCart(state) {
  const { cartByIds, menuByIds } = state;
  let cartPrice = 0;

  const cartKeys = Object.keys(cartByIds);
  cartKeys.forEach((id) => {
    const item = menuByIds[id];
    const cartItem = cartByIds[id];

    const price = cartItem.quantity * item.price;
    cartPrice += price;
  });

  return {
    cartPrice,
  };
}
