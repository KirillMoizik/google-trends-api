(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("https"), require("querystring"));
	else if(typeof define === 'function' && define.amd)
		define("google-trends-api", ["https", "querystring"], factory);
	else if(typeof exports === 'object')
		exports["google-trends-api"] = factory(require("https"), require("querystring"));
	else
		root["google-trends-api"] = factory(root["https"], root["querystring"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _api = __webpack_require__(1);
	
	var _api2 = _interopRequireDefault(_api);
	
	var _login = __webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GoogleTrends = function () {
	  function GoogleTrends() {
	    _classCallCheck(this, GoogleTrends);
	
	    this.cookie = null;
	    this.login = _login.login;
	  }
	
	  _createClass(GoogleTrends, [{
	    key: 'interestByRegion',
	    value: function interestByRegion(reqObj, cb) {
	      return (0, _api2.default)('interest by region', this.cookie)(reqObj, cb);
	    }
	  }, {
	    key: 'interestOverTime',
	    value: function interestOverTime(reqObj, cb) {
	      return (0, _api2.default)('interest over time', this.cookie)(reqObj, cb);
	    }
	  }, {
	    key: 'relatedQueries',
	    value: function relatedQueries(reqObj, cb) {
	      return (0, _api2.default)('relatedQueries', this.cookie)(reqObj, cb);
	    }
	  }, {
	    key: 'relatedTopics',
	    value: function relatedTopics(reqObj, cb) {
	      return (0, _api2.default)('related Topics', this.cookie)(reqObj, cb);
	    }
	  }]);
	
	  return GoogleTrends;
	}();
	
	exports.default = GoogleTrends;
	;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _utilities = __webpack_require__(2);
	
	exports.default = function (searchType, cookie) {
	  return function (reqObj, cb) {
	    var _constructObj = (0, _utilities.constructObj)(reqObj, cb),
	        cbFunc = _constructObj.cbFunc,
	        obj = _constructObj.obj;
	
	    if (obj instanceof Error) return Promise.reject(cbFunc(obj));
	
	    return (0, _utilities.getResults)(searchType, obj, cookie).then(function (res) {
	      return cbFunc(null, res);
	    }).catch(function (err) {
	      return Promise.reject(cbFunc(err));
	    });
	  };
	};
	
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.isLessThan7Days = isLessThan7Days;
	exports.convertDateToString = convertDateToString;
	exports.formatTime = formatTime;
	exports.constructObj = constructObj;
	exports.formatResolution = formatResolution;
	exports.getResults = getResults;
	
	var _request = __webpack_require__(3);
	
	var _request2 = _interopRequireDefault(_request);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function isLessThan7Days(date1, date2) {
	  return Math.abs(date2 - date1) / (24 * 60 * 60 * 1000) < 7;
	};
	
	function convertDateToString(d, shouldIncludeTime) {
	  var month = (d.getUTCMonth() + 1).toString();
	
	  month = month.length < 2 ? '0' + month : month;
	  var day = d.getUTCDate().toString();
	  var year = d.getUTCFullYear().toString();
	  var hour = d.getUTCHours();
	  var minute = d.getUTCMinutes();
	
	  if (shouldIncludeTime) {
	    return year + '-' + month + '-' + day + 'T' + hour + '\\:' + minute + '\\:00';
	  }
	
	  return year + '-' + month + '-' + day;
	};
	
	function formatTime(obj) {
	  if (obj.startTime && !(obj.startTime instanceof Date)) {
	    return new Error('startTime must be a Date object');
	  }
	  if (obj.endTime && !(obj.endTime instanceof Date)) {
	    return new Error('endTime must be a Date object');
	  }
	
	  if (obj.startTime && obj.endTime && obj.startTime > obj.endTime) {
	    var temp = obj.startTime;
	
	    obj.startTime = obj.endTime;
	    obj.endTime = temp;
	  }
	
	  if (!obj.endTime) obj.endTime = new Date();
	  if (!obj.startTime) obj.startTime = new Date('2004-01-01');
	
	  var shouldIncludeTime = isLessThan7Days(obj.startTime, obj.endTime);
	
	  var startTime = convertDateToString(obj.startTime, shouldIncludeTime);
	  var endTime = convertDateToString(obj.endTime, shouldIncludeTime);
	
	  obj.time = startTime + ' ' + endTime;
	  return obj;
	};
	
	function constructObj(obj, cbFunc) {
	  if (typeof obj === 'function') cbFunc = obj;
	
	  if (!obj || !!obj && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || Array.isArray(obj)) {
	    obj = new Error('Must supply an object');
	  } else if (!obj.keyword) obj = new Error('Must have a keyword field');
	
	  if (!!cbFunc && typeof cbFunc !== 'function') {
	    obj = new Error('Callback function must be a function');
	  }
	
	  if (!obj.hl) obj.hl = 'en-US';
	
	  if (!cbFunc) {
	    cbFunc = function cbFunc(err, res) {
	      if (err) return err;
	      return res;
	    };
	  }
	
	  obj = formatTime(obj);
	
	  return {
	    cbFunc: cbFunc,
	    obj: obj
	  };
	};
	
	function formatResolution() {
	  var resolution = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
	
	  var resolutions = ['COUNTRY', 'REGION', 'CITY', 'DMA'];
	  var isResValid = resolutions.some(function (res) {
	    return res === resolution.toUpperCase();
	  });
	
	  if (isResValid) return resolution.toUpperCase();
	  return '';
	}
	
	function getResults(searchType, obj, cookie) {
	  var map = {
	    'interest over time': {
	      path: '/trends/api/widgetdata/multiline',
	      pos: 0
	    },
	    'interest by region': {
	      path: '/trends/api/widgetdata/comparedgeo',
	      pos: 1,
	      resolution: formatResolution(obj.resolution)
	    },
	    'related topics': {
	      path: '/trends/api/widgetdata/relatedsearches',
	      pos: 2
	    },
	    'related queries': {
	      path: '/trends/api/widgetdata/relatedsearches',
	      pos: 3
	    }
	  };
	
	  var options = {
	    method: 'GET',
	    host: 'trends.google.com',
	    path: '/trends/api/explore',
	    qs: {
	      hl: obj.hl,
	      req: JSON.stringify({ comparisonItem: [obj], cat: 0 }),
	      tz: 300
	    }
	  };
	
	  if (cookie) options.cookie = cookie;
	  var _map$searchType = map[searchType],
	      pos = _map$searchType.pos,
	      path = _map$searchType.path,
	      resolution = _map$searchType.resolution;
	
	
	  return (0, _request2.default)(options).then(function (results) {
	    var parsedResults = JSON.parse(results.slice(4)).widgets;
	    var req = parsedResults[pos].request;
	
	    if (resolution) req.resolution = resolution;
	    req = JSON.stringify(req);
	    var token = parsedResults[pos].token;
	    var nextOptions = {
	      path: path,
	      method: 'GET',
	      host: 'trends.google.com',
	      qs: {
	        hl: obj.hl,
	        req: req,
	        token: token,
	        tz: 300
	      }
	    };
	
	    if (cookie) nextOptions.cookie = cookie;
	
	    return (0, _request2.default)(nextOptions);
	  }).then(function (res) {
	    return res.slice(5);
	  });
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = request;
	
	var _https = __webpack_require__(4);
	
	var _https2 = _interopRequireDefault(_https);
	
	var _querystring = __webpack_require__(5);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function request(_ref) {
	  var method = _ref.method,
	      host = _ref.host,
	      path = _ref.path,
	      qs = _ref.qs,
	      cookie = _ref.cookie;
	
	  var options = {
	    cookie: cookie,
	    host: host,
	    method: method,
	    path: path + '?' + _querystring2.default.stringify(qs)
	  };
	
	  return new Promise(function (resolve, reject) {
	    var req = _https2.default.request(options, function (res) {
	      var chunk = '';
	
	      res.on('data', function (data) {
	        chunk += data;
	      });
	
	      res.on('end', function () {
	        resolve(chunk.toString('utf8'));
	      });
	    });
	
	    req.on('error', function (e) {
	      reject(e);
	    });
	
	    req.end();
	  });
	};
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("https");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("querystring");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = request;
	exports.login = login;
	
	var _https = __webpack_require__(4);
	
	var _https2 = _interopRequireDefault(_https);
	
	var _querystring = __webpack_require__(5);
	
	var _querystring2 = _interopRequireDefault(_querystring);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function request(_ref) {
	  var method = _ref.method,
	      host = _ref.host,
	      path = _ref.path,
	      qs = _ref.qs,
	      form = _ref.form,
	      headers = _ref.headers;
	
	  var options = {
	    headers: headers,
	    host: host,
	    method: method,
	    path: path + '?' + _querystring2.default.stringify(qs)
	  };
	
	  return new Promise(function (resolve, reject) {
	    var req = _https2.default.request(options, function (res) {
	      var chunk = '';
	
	      var setCookie = res.headers['set-cookie'];
	
	      res.on('data', function (data) {
	        chunk += data;
	      });
	
	      res.on('end', function () {
	        resolve({
	          data: chunk.toString('utf8'),
	          cookies: setCookie
	        });
	      });
	    });
	
	    req.on('error', function (e) {
	      reject(e);
	    });
	
	    if (form) req.write('data=' + _querystring2.default.stringify(form));
	    req.end();
	  });
	};
	
	function login(_ref2) {
	  var _this = this;
	
	  var email = _ref2.email,
	      password = _ref2.password;
	
	  var options = {
	    host: 'accounts.google.com',
	    method: 'GET',
	    path: '/ServiceLogin'
	  };
	
	  var authOptions = {
	    host: 'accounts.google.com',
	    method: 'POST',
	    path: '/ServiceLoginAuth'
	  };
	
	  return request(options).then(function (results) {
	    var inputs = results.data.match(/<input\b[^>]*>(.*?)/g);
	    var form = inputs.reduce(function (acc, curr) {
	      if (curr.match(/name="(.*?)"/g)) {
	        acc[curr.match(/name="(.*?)"/g)[0].split('"')[1]] = curr.match(/value="(.*?)"/g)[0].split('"')[1];
	      }
	      return acc;
	    }, {});
	
	    form.Email = email;
	    form.Passwd = password;
	    authOptions.form = form;
	
	    var headers = {
	      'Content-Type': 'application/x-www-form-urlencoded',
	      'Content-Length': Buffer.byteLength(form)
	    };
	
	    authOptions.headers = headers;
	
	    return request(authOptions);
	  }).then(function (results) {
	    _this.cookie = results.cookies[0].split(';')[0];
	  });
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=google-trends-api.js.map