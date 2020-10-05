"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _redux = require("./redux");

var _Comps = require("./Comps");

var _utils = require("./utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function App() {
  var diet = (0, _reactRedux.useSelector)(state => state.diet);
  var dispatch = (0, _reactRedux.useDispatch)();
  var stateAPIStatus = useLoadFoodData();
  var menuList = (0, _reactRedux.useSelector)(selectorMenu, _reactRedux.shallowEqual);
  (0, _react.useEffect)(() => {
    console.log('SERVER_EVENT: menu list changed');
  }, [menuList]);

  function handleVegToggle() {
    dispatch({
      type: _redux.ACTIONS.CHANGE_DIET
    });
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "food-app"
  }, /*#__PURE__*/_react.default.createElement("header", null, /*#__PURE__*/_react.default.createElement("h1", null, "Ordux"), /*#__PURE__*/_react.default.createElement("label", null, /*#__PURE__*/_react.default.createElement("input", {
    type: "checkbox",
    name: "veg-checkbox",
    value: diet,
    checked: diet === 'veg',
    onChange: handleVegToggle
  }), "Veg Only")), /*#__PURE__*/_react.default.createElement(_Comps.Message, {
    status: stateAPIStatus
  }), stateAPIStatus === 'success' && /*#__PURE__*/_react.default.createElement(_react.Fragment, null, /*#__PURE__*/_react.default.createElement("main", null, /*#__PURE__*/_react.default.createElement(_Comps.MenuList, {
    menuList: menuList
  })), /*#__PURE__*/_react.default.createElement(_Comps.PaymentFooter, null)));
}

function useLoadFoodData() {
  var _useState = (0, _react.useState)('idle'),
      _useState2 = _slicedToArray(_useState, 2),
      stateAPIStatus = _useState2[0],
      setAPIStatus = _useState2[1];

  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    setAPIStatus('loading');
    (0, _utils.loadFoodData)().then(data => {
      dispatch({
        type: _redux.ACTIONS.LOAD_MENU,
        payload: {
          menu: data
        }
      });
      setAPIStatus('success');
    }).catch(error => {
      setAPIStatus('error');
    });
  }, [dispatch]);
  return stateAPIStatus;
}

function selectorMenu(state) {
  var diet = state.diet,
      menuIdList = state.menuIdList,
      menuById = state.menuById;
  var menuId = menuIdList[diet];
  var menuList = [];
  menuId.forEach(id => {
    menuList.push(menuById[id]);
  });
  return menuList;
}

//# sourceMappingURL=App.js.map