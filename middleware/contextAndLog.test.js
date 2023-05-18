import {
  expect,
  jest,
  test,
  beforeEach,
} from '@jest/globals';

import contextAndLog from './contextAndLog.js';

let mockRequest;
let mockResponse;
let nextFunction;

const middleware = contextAndLog();

beforeEach(() => {
  mockRequest = {
    originalUrl: '/yay',
  };
  mockResponse = {
    send: jest.fn(),
  };
  nextFunction = jest.fn();
});

test('contextAndLog() should return a function', () => {
  expect(typeof contextAndLog()).toBe('function');
});

test('contextAndLog() request.context should have expected format', () => {
  middleware(mockRequest, mockResponse, nextFunction);

  expect(mockRequest.context.endpoint).toBe('/yay');
  expect(typeof mockRequest.context.requestId).toBe('string');
});

test('nextFunction should be called once', () => {
  middleware(mockResponse, mockRequest, nextFunction);

  expect(nextFunction).toBeCalledTimes(1);
});
