"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

require("dotenv/config");

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

var _logThemes = require("./src/logThemes");

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var port = process.env.PORT || 4000;
var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json());
app.use(_index["default"]);
app.get('/health', function (req, res) {
  _logThemes.log.status('Reached health endpoint');

  res.writeHead(200, 'OK', {
    'Content-Type': 'text/plain'
  });
  res.end('Healthy!');
});
process.on('SIGINT', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
  return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // for ctrl + c
          process.exit();

        case 1:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
})));
app.listen(port, function (e) {
  if (e) _logThemes.log.error("well shoot. unable to start server on port: ".concat(port));

  _logThemes.log.status("Hello, and welcome to weather-dashboard-server! Listening on port: ".concat(port));
});