"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReduxStore = createReduxStore;
exports.ACTIONS = void 0;

var _redux = require("redux");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ACTIONS = {
  CHANGE_DIET: 'CHANGE_DIET',
  LOAD_MENU: 'LOAD_MENU',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART'
};
exports.ACTIONS = ACTIONS;
var initialState = {
  diet: 'all',
  menuById: {},
  menuIdList: {
    all: [],
    veg: []
  },
  cartByIds: {}
};

function foodReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIONS.CHANGE_DIET:
      {
        var diet = state.diet;
        var newDiet = diet === 'veg' ? 'all' : 'veg';
        return _objectSpread({}, state, {
          diet: newDiet,
          cartByIds: {}
        });
      }

    case ACTIONS.LOAD_MENU:
      {
        var menu = action.payload.menu;
        var menuById = {};
        menu.forEach(item => {
          menuById[item.id] = item;
        });
        var allMenuId = menu.map(item => item.id);
        var vegMenuId = menu.filter(item => item.diet === 'veg').map(item => item.id);
        return _objectSpread({}, state, {
          menuById,
          menuIdList: {
            all: allMenuId,
            veg: vegMenuId
          }
        });
      }

    case ACTIONS.ADD_TO_CART:
      {
        var itemId = action.payload.itemId;
        var cartByIds = state.cartByIds;
        var cartItem = cartByIds[itemId] || {
          quantity: 0
        };
        cartItem.quantity += 1;

        var newCart = _objectSpread({}, cartByIds, {
          [itemId]: cartItem
        });

        return _objectSpread({}, state, {
          cartByIds: newCart
        });
      }

    case ACTIONS.REMOVE_FROM_CART:
      {
        var _itemId = action.payload.itemId;
        var _cartByIds = state.cartByIds;
        var _cartItem = _cartByIds[_itemId];

        if (!_cartItem) {
          return state;
        }

        _cartItem.quantity -= 1;

        var _newCart = _objectSpread({}, _cartByIds, {
          [_itemId]: _cartItem
        });

        return _objectSpread({}, state, {
          cartByIds: _newCart
        });
      }

    default:
      return state;
  }
}

function createReduxStore() {
  var store = (0, _redux.createStore)(foodReducer);
  return store;
}

//# sourceMappingURL=redux.js.map