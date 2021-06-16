"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var log = {
  good: function good(message) {
    return console.log('Good!', _chalk["default"].rgb(194, 242, 128)(message));
  },
  warn: function warn(message) {
    return console.log('Warning', _chalk["default"].rgb(255, 119, 0)(message));
  },
  error: function error(message) {
    return console.log('ERROR', _chalk["default"].rgb(249, 65, 68).bold(message));
  },
  status: function status(message) {
    return console.log('status', _chalk["default"].rgb(0, 180, 216)(message));
  },
  debug: function debug(message) {
    return console.log('DEBUG:', _chalk["default"].rgb(116, 0, 184)(message));
  }
};
exports.log = log;