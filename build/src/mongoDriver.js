"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongoDBGetAddress = void 0;

var _mongodb = require("mongodb");

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var dbConnect = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var url, client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = process.env.MONGO_DB_URL || 'mongodb://10.0.0.148:27017/';
            client = new _mongodb.MongoClient(url, {
              useNewUrlParser: true,
              useUnifiedTopology: true
            });
            _context.prev = 2;
            _context.next = 5;
            return client.connect();

          case 5:
            console.log('connected to cluster');
            return _context.abrupt("return", client);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));

  return function dbConnect() {
    return _ref.apply(this, arguments);
  };
}();

var mongoDBGetAddress = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_ref3) {
    var targetDB, targetCollection, query, client, db, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            targetDB = _ref3.targetDB, targetCollection = _ref3.targetCollection, query = _ref3.query;
            console.log('Here I go getting the address again:', query);
            _context2.prev = 2;
            _context2.next = 5;
            return dbConnect();

          case 5:
            client = _context2.sent;
            db = client.db(targetDB);
            console.log("connected to db: ".concat(db.namespace));
            _context2.next = 10;
            return db.collection(targetCollection);

          case 10:
            result = _context2.sent;
            _context2.next = 13;
            return client.close();

          case 13:
            console.log('disconnected from db');
            return _context2.abrupt("return", result);

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 17]]);
  }));

  return function mongoDBGetAddress(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.mongoDBGetAddress = mongoDBGetAddress;