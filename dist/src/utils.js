"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFoodData = loadFoodData;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function loadFoodData() {
  return _loadFoodData.apply(this, arguments);
}

function _loadFoodData() {
  _loadFoodData = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, data;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return window.fetch('/food-menu.json');

          case 2:
            res = _context.sent;

            if (res.ok) {
              _context.next = 5;
              break;
            }

            throw new Error('API failed');

          case 5:
            _context.next = 7;
            return res.json();

          case 7:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadFoodData.apply(this, arguments);
}

//# sourceMappingURL=utils.js.map