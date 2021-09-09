"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.weather = void 0;

var _express = _interopRequireDefault(require("express"));

var _logThemes = require("../../src/logThemes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var currentWeatherExample = require('./oneCall.json');

var router = _express["default"].Router();

exports.weather = router;
var NODE_ENV = process.env.NODE_ENV || 'development';
router.get('/current', /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var result, current, future, time, currentTime;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _logThemes.log.status("GET weather/current");

            try {
              if (NODE_ENV === 'development') {
                current = currentWeatherExample.current;
                future = currentWeatherExample.hourly[0];
                time = currentWeatherExample.current.dt;
                currentTime = new Date(time * 1000);
                console.log("Request Time: ".concat(currentTime.toLocaleTimeString('en-US')));
                result = {
                  requestTime: currentTime,
                  current: current,
                  future: future
                };
              }

              if (NODE_ENV === 'production') {}

              res.status(200).send(result);
            } catch (e) {
              _logThemes.log.error(e);

              res.status(500).send({
                error: e
              });
            }

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());