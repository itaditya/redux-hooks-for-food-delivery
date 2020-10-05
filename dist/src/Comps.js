"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuItem = MenuItem;
exports.Message = Message;
exports.PaymentFooter = PaymentFooter;
exports.IconPlus = IconPlus;
exports.IconMinus = IconMinus;
exports.MenuList = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("./redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MenuItem(props) {
  var _cartByIds$item$id$qu, _cartByIds$item$id;

  var item = props.item;
  var cartByIds = (0, _reactRedux.useSelector)(state => state.cartByIds);
  var dispatch = (0, _reactRedux.useDispatch)();
  var quantity = (_cartByIds$item$id$qu = (_cartByIds$item$id = cartByIds[item.id]) === null || _cartByIds$item$id === void 0 ? void 0 : _cartByIds$item$id.quantity) !== null && _cartByIds$item$id$qu !== void 0 ? _cartByIds$item$id$qu : 0;

  function handleIncrement() {
    dispatch({
      type: _redux.ACTIONS.ADD_TO_CART,
      payload: {
        itemId: item.id
      }
    });
  }

  function handleDecrement() {
    dispatch({
      type: _redux.ACTIONS.REMOVE_FROM_CART,
      payload: {
        itemId: item.id
      }
    });
  }

  var addBtn = /*#__PURE__*/_react.default.createElement("button", {
    "aria-label": "Add ".concat(item.label, " to cart"),
    className: "menu-btn-add",
    onClick: handleIncrement
  }, "Add ", /*#__PURE__*/_react.default.createElement(IconPlus, null));

  var increaseBtn = /*#__PURE__*/_react.default.createElement("button", {
    "aria-label": "Add ".concat(item.label, " to cart"),
    className: "menu-btn-item",
    onClick: handleIncrement
  }, /*#__PURE__*/_react.default.createElement(IconPlus, null));

  var decreaseBtn = /*#__PURE__*/_react.default.createElement("button", {
    "aria-label": "Remove ".concat(item.label, " from cart"),
    className: "menu-btn-item",
    onClick: handleDecrement
  }, /*#__PURE__*/_react.default.createElement(IconMinus, null));

  var qtyIndicator = /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-item-qty",
    role: "status",
    "aria-live": "polite"
  }, quantity);

  return /*#__PURE__*/_react.default.createElement("li", {
    className: "menu-item"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-item-title"
  }, /*#__PURE__*/_react.default.createElement("h4", null, item.label), /*#__PURE__*/_react.default.createElement("span", null, "($", item.price, ")")), /*#__PURE__*/_react.default.createElement("p", {
    className: "menu-item-description"
  }, item.description)), quantity === 0 ? addBtn : /*#__PURE__*/_react.default.createElement("div", {
    className: "menu-btn-group"
  }, decreaseBtn, qtyIndicator, increaseBtn));
}

function PureMenuList(props) {
  console.log('MenuList Re-Render');
  var menuList = props.menuList;
  return /*#__PURE__*/_react.default.createElement("ul", {
    className: "menu-list"
  }, menuList.map(item => /*#__PURE__*/_react.default.createElement(MenuItem, {
    key: item.id,
    item: item
  })));
}

var MenuList = _react.default.memo(PureMenuList);

exports.MenuList = MenuList;

function Message(props) {
  var status = props.status;
  var messages = {
    loading: 'Loading...',
    error: /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, "Menu failed to load.", /*#__PURE__*/_react.default.createElement("br", null), "Please try again...")
  };
  var messageText = messages[status];

  if (!messageText) {
    return null;
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "message-".concat(status),
    role: status === 'error' ? 'alert' : 'status',
    "aria-live": "polite",
    "aria-busy": status === 'loading'
  }, messageText);
}

function selectorCartPrice(state) {
  var cartByIds = state.cartByIds,
      menuById = state.menuById;
  var cartPrice = 0;
  var cartKeys = Object.keys(cartByIds);
  cartKeys.forEach(id => {
    var item = menuById[id];
    var cartItem = cartByIds[id];
    var price = cartItem.quantity * item.price;
    cartPrice += price;
  });
  return cartPrice;
}

function PaymentFooter() {
  var cartPrice = (0, _reactRedux.useSelector)(selectorCartPrice);
  return /*#__PURE__*/_react.default.createElement("footer", null, cartPrice > 0 && /*#__PURE__*/_react.default.createElement("a", {
    href: "#payment",
    className: "food-app-pay-btn",
    "aria-live": "polite"
  }, "Pay for food ($", cartPrice, ")"));
} // source- https://feathericons.com/


function IconPlus() {
  return /*#__PURE__*/_react.default.createElement("svg", {
    className: "icon-plus",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false"
  }, /*#__PURE__*/_react.default.createElement("line", {
    x1: "12",
    y1: "5",
    x2: "12",
    y2: "19"
  }), /*#__PURE__*/_react.default.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
} // source- https://feathericons.com/


function IconMinus() {
  return /*#__PURE__*/_react.default.createElement("svg", {
    className: "icon-minus",
    viewBox: "0 0 24 24",
    width: "1em",
    height: "1em",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    focusable: "false"
  }, /*#__PURE__*/_react.default.createElement("line", {
    x1: "5",
    y1: "12",
    x2: "19",
    y2: "12"
  }));
}

//# sourceMappingURL=Comps.js.map