/* eslint-disable no-undef */
/* eslint-disable func-names */

import '@testing-library/jest-dom'

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn()
    }
  }
