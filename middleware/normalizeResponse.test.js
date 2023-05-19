import {
  expect,
  jest,
  test,
  beforeEach,
} from '@jest/globals';

import normalizeResponse from './normalizeResponse.js';

let mockRequest;
let mockResponse;
let nextFunction;
const context = {
  requestId: 'woot',
  route: '/test',
};

const middleware = normalizeResponse();

beforeEach(() => {
  mockRequest = {
    context,
  };
  mockResponse = {
    send: (data) => data,
  };
  nextFunction = jest.fn();
});

test('normalizeResponse() should return a function', () => {
  expect(typeof normalizeResponse()).toBe('function');
});

test('normalizeResponse() response should have expected format', () => {
  const expectedResponse = {
    context,
    data: 'test',
    errors: [],
  };

  middleware(mockRequest, mockResponse, nextFunction);

  expect(mockResponse.send('test')).toMatchObject(expectedResponse);
});

test('nextFunction should be called once', () => {
  middleware(mockRequest, mockRequest, nextFunction);

  expect(nextFunction).toBeCalledTimes(1);
});
