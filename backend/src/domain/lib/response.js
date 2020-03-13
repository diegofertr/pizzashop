'use strict';

module.exports = function setupResponse () {
  function success (data, message) {
    return {
      code: 1,
      data,
      message: message || 'SUCCESS'
    }
  }

  function warning (error) {
    return {
      code: 0,
      data: error,
      message: error.message || 'WARNING'
    }
  }

  function error (error) {
    return {
      code: -1,
      data: error,
      message: error.message || 'UNKNOWN ERROR'
    };
  }

  return {
    success,
    warning,
    error
  }
}