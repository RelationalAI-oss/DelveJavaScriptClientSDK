(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (Buffer){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _superagent = _interopRequireDefault(require("superagent"));

var _querystring = _interopRequireDefault(require("querystring"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* @module ApiClient
* @version 1.0.8
*/

/**
* Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
* application to use this class directly - the *Api and model classes provide the public API for the service. The
* contents of this file should be regarded as internal but are documented for completeness.
* @alias module:ApiClient
* @class
*/
var ApiClient = /*#__PURE__*/function () {
  function ApiClient() {
    _classCallCheck(this, ApiClient);

    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default http://127.0.0.1:8010
     */
    this.basePath = 'http://127.0.0.1:8010'.replace(/\/+$/, '');
    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */

    this.authentications = {};
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */

    this.defaultHeaders = {};
    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */

    this.timeout = 60000;
    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */

    this.cache = true;
    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */

    this.enableCookies = false;
    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */

    if (typeof window === 'undefined') {
      this.agent = new _superagent["default"].agent();
    }
    /*
     * Allow user to override superagent agent
     */


    this.requestAgent = null;
    /*
     * Allow user to add superagent plugins
     */

    this.plugins = null;
  }
  /**
  * Returns a string representation for an actual parameter.
  * @param param The actual parameter.
  * @returns {String} The string representation of <code>param</code>.
  */


  _createClass(ApiClient, [{
    key: "paramToString",
    value: function paramToString(param) {
      if (param == undefined || param == null) {
        return '';
      }

      if (param instanceof Date) {
        return param.toJSON();
      }

      if (ApiClient.canBeJsonified(param)) {
        return JSON.stringify(param);
      }

      return param.toString();
    }
    /**
    * Returns a boolean indicating if the parameter could be JSON.stringified
    * @param param The actual parameter
    * @returns {Boolean} Flag indicating if <code>param</code> can be JSON.stringified
    */

  }, {
    key: "buildUrl",

    /**
     * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
     * NOTE: query parameters are not handled here.
     * @param {String} path The path to append to the base URL.
     * @param {Object} pathParams The parameter values to append.
     * @param {String} apiBasePath Base path defined in the path, operation level to override the default one
     * @returns {String} The encoded path with parameter values substituted.
     */
    value: function buildUrl(path, pathParams, apiBasePath) {
      var _this = this;

      if (!path.match(/^\//)) {
        path = '/' + path;
      }

      var url = this.basePath + path; // use API (operation, path) base path if defined

      if (apiBasePath !== null && apiBasePath !== undefined) {
        url = apiBasePath + path;
      }

      url = url.replace(/\{([\w-]+)\}/g, function (fullMatch, key) {
        var value;

        if (pathParams.hasOwnProperty(key)) {
          value = _this.paramToString(pathParams[key]);
        } else {
          value = fullMatch;
        }

        return encodeURIComponent(value);
      });
      return url;
    }
    /**
    * Checks whether the given content type represents JSON.<br>
    * JSON content type examples:<br>
    * <ul>
    * <li>application/json</li>
    * <li>application/json; charset=UTF8</li>
    * <li>APPLICATION/JSON</li>
    * </ul>
    * @param {String} contentType The MIME content type to check.
    * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
    */

  }, {
    key: "isJsonMime",
    value: function isJsonMime(contentType) {
      return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
    }
    /**
    * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
    * @param {Array.<String>} contentTypes
    * @returns {String} The chosen content type, preferring JSON.
    */

  }, {
    key: "jsonPreferredMime",
    value: function jsonPreferredMime(contentTypes) {
      for (var i = 0; i < contentTypes.length; i++) {
        if (this.isJsonMime(contentTypes[i])) {
          return contentTypes[i];
        }
      }

      return contentTypes[0];
    }
    /**
    * Checks whether the given parameter value represents file-like content.
    * @param param The parameter to check.
    * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
    */

  }, {
    key: "isFileParam",
    value: function isFileParam(param) {
      // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
      if (typeof require === 'function') {
        var fs;

        try {
          fs = require('fs');
        } catch (err) {}

        if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
          return true;
        }
      } // Buffer in Node.js


      if (typeof Buffer === 'function' && param instanceof Buffer) {
        return true;
      } // Blob in browser


      if (typeof Blob === 'function' && param instanceof Blob) {
        return true;
      } // File in browser (it seems File object is also instance of Blob, but keep this for safe)


      if (typeof File === 'function' && param instanceof File) {
        return true;
      }

      return false;
    }
    /**
    * Normalizes parameter values:
    * <ul>
    * <li>remove nils</li>
    * <li>keep files and arrays</li>
    * <li>format to string with `paramToString` for other cases</li>
    * </ul>
    * @param {Object.<String, Object>} params The parameters as object properties.
    * @returns {Object.<String, Object>} normalized parameters.
    */

  }, {
    key: "normalizeParams",
    value: function normalizeParams(params) {
      var newParams = {};

      for (var key in params) {
        if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
          var value = params[key];

          if (this.isFileParam(value) || Array.isArray(value)) {
            newParams[key] = value;
          } else {
            newParams[key] = this.paramToString(value);
          }
        }
      }

      return newParams;
    }
    /**
    * Builds a string representation of an array-type actual parameter, according to the given collection format.
    * @param {Array} param An array parameter.
    * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
    * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
    * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
    */

  }, {
    key: "buildCollectionParam",
    value: function buildCollectionParam(param, collectionFormat) {
      if (param == null) {
        return null;
      }

      switch (collectionFormat) {
        case 'csv':
          return param.map(this.paramToString).join(',');

        case 'ssv':
          return param.map(this.paramToString).join(' ');

        case 'tsv':
          return param.map(this.paramToString).join('\t');

        case 'pipes':
          return param.map(this.paramToString).join('|');

        case 'multi':
          //return the array directly as SuperAgent will handle it as expected
          return param.map(this.paramToString);

        default:
          throw new Error('Unknown collection format: ' + collectionFormat);
      }
    }
    /**
    * Applies authentication headers to the request.
    * @param {Object} request The request object created by a <code>superagent()</code> call.
    * @param {Array.<String>} authNames An array of authentication method names.
    */

  }, {
    key: "applyAuthToRequest",
    value: function applyAuthToRequest(request, authNames) {
      var _this2 = this;

      authNames.forEach(function (authName) {
        var auth = _this2.authentications[authName];

        switch (auth.type) {
          case 'basic':
            if (auth.username || auth.password) {
              request.auth(auth.username || '', auth.password || '');
            }

            break;

          case 'bearer':
            if (auth.accessToken) {
              request.set({
                'Authorization': 'Bearer ' + auth.accessToken
              });
            }

            break;

          case 'apiKey':
            if (auth.apiKey) {
              var data = {};

              if (auth.apiKeyPrefix) {
                data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
              } else {
                data[auth.name] = auth.apiKey;
              }

              if (auth['in'] === 'header') {
                request.set(data);
              } else {
                request.query(data);
              }
            }

            break;

          case 'oauth2':
            if (auth.accessToken) {
              request.set({
                'Authorization': 'Bearer ' + auth.accessToken
              });
            }

            break;

          default:
            throw new Error('Unknown authentication type: ' + auth.type);
        }
      });
    }
    /**
     * Deserializes an HTTP response body into a value of the specified type.
     * @param {Object} response A SuperAgent response object.
     * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
     * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
     * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
     * all properties on <code>data<code> will be converted to this type.
     * @returns A value of the specified type.
     */

  }, {
    key: "deserialize",
    value: function deserialize(response, returnType) {
      if (response == null || returnType == null || response.status == 204) {
        return null;
      } // Rely on SuperAgent for parsing response body.
      // See http://visionmedia.github.io/superagent/#parsing-response-bodies


      var data = response.body;

      if (data == null || _typeof(data) === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length) {
        // SuperAgent does not always produce a body; use the unparsed response as a fallback
        data = response.text;
      }

      return ApiClient.convertToType(data, returnType);
    }
    /**
     * Callback function to receive the result of the operation.
     * @callback module:ApiClient~callApiCallback
     * @param {String} error Error message, if any.
     * @param data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Invokes the REST service using the supplied settings and parameters.
     * @param {String} path The base URL to invoke.
     * @param {String} httpMethod The HTTP method to use.
     * @param {Object.<String, String>} pathParams A map of path parameters and their values.
     * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
     * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
     * @param {Object.<String, Object>} formParams A map of form parameters and their values.
     * @param {Object} bodyParam The value to pass as the request body.
     * @param {Array.<String>} authNames An array of authentication type names.
     * @param {Array.<String>} contentTypes An array of request MIME types.
     * @param {Array.<String>} accepts An array of acceptable response MIME types.
     * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
     * constructor for a complex type.
     * @param {String} apiBasePath base path defined in the operation/path level to override the default one
     * @param {module:ApiClient~callApiCallback} callback The callback function.
     * @returns {Object} The SuperAgent request object.
     */

  }, {
    key: "callApi",
    value: function callApi(path, httpMethod, pathParams, queryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts, returnType, apiBasePath, callback) {
      var _this3 = this;

      var url = this.buildUrl(path, pathParams, apiBasePath);
      var request = (0, _superagent["default"])(httpMethod, url);

      if (this.plugins !== null) {
        for (var index in this.plugins) {
          if (this.plugins.hasOwnProperty(index)) {
            request.use(this.plugins[index]);
          }
        }
      } // apply authentications


      this.applyAuthToRequest(request, authNames); // set query parameters

      if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
      }

      request.query(this.normalizeParams(queryParams)); // set header parameters

      request.set(this.defaultHeaders).set(this.normalizeParams(headerParams)); // set requestAgent if it is set by user

      if (this.requestAgent) {
        request.agent(this.requestAgent);
      } // set request timeout


      request.timeout(this.timeout);
      var contentType = this.jsonPreferredMime(contentTypes);

      if (contentType) {
        // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
        if (contentType != 'multipart/form-data') {
          request.type(contentType);
        }
      }

      if (contentType === 'application/x-www-form-urlencoded') {
        request.send(_querystring["default"].stringify(this.normalizeParams(formParams)));
      } else if (contentType == 'multipart/form-data') {
        var _formParams = this.normalizeParams(formParams);

        for (var key in _formParams) {
          if (_formParams.hasOwnProperty(key)) {
            if (this.isFileParam(_formParams[key])) {
              // file field
              request.attach(key, _formParams[key]);
            } else {
              request.field(key, _formParams[key]);
            }
          }
        }
      } else if (bodyParam !== null && bodyParam !== undefined) {
        if (!request.header['Content-Type']) {
          request.type('application/json');
        }

        request.send(bodyParam);
      }

      var accept = this.jsonPreferredMime(accepts);

      if (accept) {
        request.accept(accept);
      }

      if (returnType === 'Blob') {
        request.responseType('blob');
      } else if (returnType === 'String') {
        request.responseType('string');
      } // Attach previously saved cookies, if enabled


      if (this.enableCookies) {
        if (typeof window === 'undefined') {
          this.agent._attachCookies(request);
        } else {
          request.withCredentials();
        }
      }

      request.end(function (error, response) {
        if (callback) {
          var data = null;

          if (!error) {
            try {
              data = _this3.deserialize(response, returnType);

              if (_this3.enableCookies && typeof window === 'undefined') {
                _this3.agent._saveCookies(response);
              }
            } catch (err) {
              error = err;
            }
          }

          callback(error, data, response);
        }
      });
      return request;
    }
    /**
    * Parses an ISO-8601 string representation or epoch representation of a date value.
    * @param {String} str The date value as a string.
    * @returns {Date} The parsed date object.
    */

  }, {
    key: "hostSettings",

    /**
      * Gets an array of host settings
      * @returns An array of host settings
      */
    value: function hostSettings() {
      return [{
        'url': "http://127.0.0.1:8010",
        'description': "No description provided"
      }];
    }
  }, {
    key: "getBasePathFromSettings",
    value: function getBasePathFromSettings(index) {
      var variables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var servers = this.hostSettings(); // check array index out of bound

      if (index < 0 || index >= servers.length) {
        throw new Error("Invalid index " + index + " when selecting the host settings. Must be less than " + servers.length);
      }

      var server = servers[index];
      var url = server['url']; // go through variable and assign a value

      for (var variable_name in server['variables']) {
        if (variable_name in variables) {
          var variable = server['variables'][variable_name];

          if (!('enum_values' in variable) || variable['enum_values'].includes(variables[variable_name])) {
            url = url.replace("{" + variable_name + "}", variables[variable_name]);
          } else {
            throw new Error("The variable `" + variable_name + "` in the host URL has invalid value " + variables[variable_name] + ". Must be " + server['variables'][variable_name]['enum_values'] + ".");
          }
        } else {
          // use default value
          url = url.replace("{" + variable_name + "}", server['variables'][variable_name]['default_value']);
        }
      }

      return url;
    }
    /**
    * Constructs a new map or array model from REST data.
    * @param data {Object|Array} The REST data.
    * @param obj {Object|Array} The target object or array.
    */

  }], [{
    key: "canBeJsonified",
    value: function canBeJsonified(str) {
      if (typeof str !== 'string' && _typeof(str) !== 'object') return false;

      try {
        var type = str.toString();
        return type === '[object Object]' || type === '[object Array]';
      } catch (err) {
        return false;
      }
    }
  }, {
    key: "parseDate",
    value: function parseDate(str) {
      if (isNaN(str)) {
        return new Date(str);
      }

      return new Date(+str);
    }
    /**
    * Converts a value to the specified type.
    * @param {(String|Object)} data The data to convert, as a string or object.
    * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
    * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
    * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
    * all properties on <code>data<code> will be converted to this type.
    * @returns An instance of the specified type or null or undefined if data is null or undefined.
    */

  }, {
    key: "convertToType",
    value: function convertToType(data, type) {
      if (data === null || data === undefined) return data;

      switch (type) {
        case 'Boolean':
          return Boolean(data);

        case 'Integer':
          return parseInt(data, 10);

        case 'Number':
          return parseFloat(data);

        case 'String':
          return String(data);

        case 'Date':
          return ApiClient.parseDate(String(data));

        case 'Blob':
          return data;

        default:
          if (type === Object) {
            // generic object, return directly
            return data;
          } else if (typeof type.constructFromObject === 'function') {
            // for model type like User and enum class
            return type.constructFromObject(data);
          } else if (Array.isArray(type)) {
            // for array type like: ['String']
            var itemType = type[0];
            return data.map(function (item) {
              return ApiClient.convertToType(item, itemType);
            });
          } else if (_typeof(type) === 'object') {
            // for plain object type like: {'String': 'Integer'}
            var keyType, valueType;

            for (var k in type) {
              if (type.hasOwnProperty(k)) {
                keyType = k;
                valueType = type[k];
                break;
              }
            }

            var result = {};

            for (var k in data) {
              if (data.hasOwnProperty(k)) {
                var key = ApiClient.convertToType(k, keyType);
                var value = ApiClient.convertToType(data[k], valueType);
                result[key] = value;
              }
            }

            return result;
          } else {
            // for unknown type, return the data directly
            return data;
          }

      }
    }
  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj, itemType) {
      if (Array.isArray(data)) {
        for (var i = 0; i < data.length; i++) {
          if (data.hasOwnProperty(i)) obj[i] = ApiClient.convertToType(data[i], itemType);
        }
      } else {
        for (var k in data) {
          if (data.hasOwnProperty(k)) obj[k] = ApiClient.convertToType(data[k], itemType);
        }
      }
    }
  }]);

  return ApiClient;
}();
/**
 * Enumeration of collection format separator strategies.
 * @enum {String}
 * @readonly
 */


ApiClient.CollectionFormatEnum = {
  /**
   * Comma-separated values. Value: <code>csv</code>
   * @const
   */
  CSV: ',',

  /**
   * Space-separated values. Value: <code>ssv</code>
   * @const
   */
  SSV: ' ',

  /**
   * Tab-separated values. Value: <code>tsv</code>
   * @const
   */
  TSV: '\t',

  /**
   * Pipe(|)-separated values. Value: <code>pipes</code>
   * @const
   */
  PIPES: '|',

  /**
   * Native array. Value: <code>multi</code>
   * @const
   */
  MULTI: 'multi'
};
/**
* The default API client implementation.
* @type {module:ApiClient}
*/

ApiClient.instance = new ApiClient();
var _default = ApiClient;
exports["default"] = _default;
}).call(this,require("buffer").Buffer)
},{"buffer":82,"fs":81,"querystring":86,"superagent":74}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _InfraError = _interopRequireDefault(require("../model/InfraError"));

var _Transaction = _interopRequireDefault(require("../model/Transaction"));

var _TransactionResult = _interopRequireDefault(require("../model/TransactionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
* Default service.
* @module api/DefaultApi
* @version 1.0.8
*/
var DefaultApi = /*#__PURE__*/function () {
  /**
  * Constructs a new DefaultApi. 
  * @alias module:api/DefaultApi
  * @class
  * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
  * default to {@link module:ApiClient#instance} if unspecified.
  */
  function DefaultApi(apiClient) {
    _classCallCheck(this, DefaultApi);

    this.apiClient = apiClient || _ApiClient["default"].instance;
  }
  /**
   * Callback function to receive the result of the transactionPost operation.
   * @callback module:api/DefaultApi~transactionPostCallback
   * @param {String} error Error message, if any.
   * @param {module:model/TransactionResult} data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Issues a transaction to be executed
   * @param {module:model/Transaction} transaction Optional description in *Markdown*
   * @param {module:api/DefaultApi~transactionPostCallback} callback The callback function, accepting three arguments: error, data, response
   * data is of type: {@link module:model/TransactionResult}
   */


  _createClass(DefaultApi, [{
    key: "transactionPost",
    value: function transactionPost(transaction, callback) {
      var postBody = transaction; // verify the required parameter 'transaction' is set

      if (transaction === undefined || transaction === null) {
        throw new Error("Missing the required parameter 'transaction' when calling transactionPost");
      }

      var pathParams = {};
      var queryParams = {};
      var headerParams = {};
      var formParams = {};
      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = _TransactionResult["default"];
      return this.apiClient.callApi('/transaction', 'POST', pathParams, queryParams, headerParams, formParams, postBody, authNames, contentTypes, accepts, returnType, null, callback);
    }
  }]);

  return DefaultApi;
}();

exports["default"] = DefaultApi;
},{"../ApiClient":1,"../model/InfraError":27,"../model/Transaction":65,"../model/TransactionResult":66}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ApiClient", {
  enumerable: true,
  get: function get() {
    return _ApiClient["default"];
  }
});
Object.defineProperty(exports, "AnyType", {
  enumerable: true,
  get: function get() {
    return _AnyType["default"];
  }
});
Object.defineProperty(exports, "AbstractProblem", {
  enumerable: true,
  get: function get() {
    return _AbstractProblem["default"];
  }
});
Object.defineProperty(exports, "Action", {
  enumerable: true,
  get: function get() {
    return _Action["default"];
  }
});
Object.defineProperty(exports, "ActionResult", {
  enumerable: true,
  get: function get() {
    return _ActionResult["default"];
  }
});
Object.defineProperty(exports, "Appl", {
  enumerable: true,
  get: function get() {
    return _Appl["default"];
  }
});
Object.defineProperty(exports, "Area", {
  enumerable: true,
  get: function get() {
    return _Area["default"];
  }
});
Object.defineProperty(exports, "ArityMismatchError", {
  enumerable: true,
  get: function get() {
    return _ArityMismatchError["default"];
  }
});
Object.defineProperty(exports, "CSVFileSchema", {
  enumerable: true,
  get: function get() {
    return _CSVFileSchema["default"];
  }
});
Object.defineProperty(exports, "CSVFileSyntax", {
  enumerable: true,
  get: function get() {
    return _CSVFileSyntax["default"];
  }
});
Object.defineProperty(exports, "CardinalityAction", {
  enumerable: true,
  get: function get() {
    return _CardinalityAction["default"];
  }
});
Object.defineProperty(exports, "CardinalityActionResult", {
  enumerable: true,
  get: function get() {
    return _CardinalityActionResult["default"];
  }
});
Object.defineProperty(exports, "ClientProblem", {
  enumerable: true,
  get: function get() {
    return _ClientProblem["default"];
  }
});
Object.defineProperty(exports, "CollectProblemsAction", {
  enumerable: true,
  get: function get() {
    return _CollectProblemsAction["default"];
  }
});
Object.defineProperty(exports, "CollectProblemsActionResult", {
  enumerable: true,
  get: function get() {
    return _CollectProblemsActionResult["default"];
  }
});
Object.defineProperty(exports, "ComparisonChainError", {
  enumerable: true,
  get: function get() {
    return _ComparisonChainError["default"];
  }
});
Object.defineProperty(exports, "Cons", {
  enumerable: true,
  get: function get() {
    return _Cons["default"];
  }
});
Object.defineProperty(exports, "ExceptionProblem", {
  enumerable: true,
  get: function get() {
    return _ExceptionProblem["default"];
  }
});
Object.defineProperty(exports, "FileSchema", {
  enumerable: true,
  get: function get() {
    return _FileSchema["default"];
  }
});
Object.defineProperty(exports, "FileSyntax", {
  enumerable: true,
  get: function get() {
    return _FileSyntax["default"];
  }
});
Object.defineProperty(exports, "FrontProblem", {
  enumerable: true,
  get: function get() {
    return _FrontProblem["default"];
  }
});
Object.defineProperty(exports, "ICViolation", {
  enumerable: true,
  get: function get() {
    return _ICViolation["default"];
  }
});
Object.defineProperty(exports, "ImportAction", {
  enumerable: true,
  get: function get() {
    return _ImportAction["default"];
  }
});
Object.defineProperty(exports, "ImportActionResult", {
  enumerable: true,
  get: function get() {
    return _ImportActionResult["default"];
  }
});
Object.defineProperty(exports, "InfraError", {
  enumerable: true,
  get: function get() {
    return _InfraError["default"];
  }
});
Object.defineProperty(exports, "InstallAction", {
  enumerable: true,
  get: function get() {
    return _InstallAction["default"];
  }
});
Object.defineProperty(exports, "InstallActionResult", {
  enumerable: true,
  get: function get() {
    return _InstallActionResult["default"];
  }
});
Object.defineProperty(exports, "IntegrityConstraintProblem", {
  enumerable: true,
  get: function get() {
    return _IntegrityConstraintProblem["default"];
  }
});
Object.defineProperty(exports, "IntegrityConstraintViolation", {
  enumerable: true,
  get: function get() {
    return _IntegrityConstraintViolation["default"];
  }
});
Object.defineProperty(exports, "JSONFileSchema", {
  enumerable: true,
  get: function get() {
    return _JSONFileSchema["default"];
  }
});
Object.defineProperty(exports, "JSONFileSyntax", {
  enumerable: true,
  get: function get() {
    return _JSONFileSyntax["default"];
  }
});
Object.defineProperty(exports, "LabeledAction", {
  enumerable: true,
  get: function get() {
    return _LabeledAction["default"];
  }
});
Object.defineProperty(exports, "LabeledActionResult", {
  enumerable: true,
  get: function get() {
    return _LabeledActionResult["default"];
  }
});
Object.defineProperty(exports, "LinkedList", {
  enumerable: true,
  get: function get() {
    return _LinkedList["default"];
  }
});
Object.defineProperty(exports, "ListEdbAction", {
  enumerable: true,
  get: function get() {
    return _ListEdbAction["default"];
  }
});
Object.defineProperty(exports, "ListEdbActionResult", {
  enumerable: true,
  get: function get() {
    return _ListEdbActionResult["default"];
  }
});
Object.defineProperty(exports, "ListSourceAction", {
  enumerable: true,
  get: function get() {
    return _ListSourceAction["default"];
  }
});
Object.defineProperty(exports, "ListSourceActionResult", {
  enumerable: true,
  get: function get() {
    return _ListSourceActionResult["default"];
  }
});
Object.defineProperty(exports, "Literal", {
  enumerable: true,
  get: function get() {
    return _Literal["default"];
  }
});
Object.defineProperty(exports, "LoadData", {
  enumerable: true,
  get: function get() {
    return _LoadData["default"];
  }
});
Object.defineProperty(exports, "LoadDataAction", {
  enumerable: true,
  get: function get() {
    return _LoadDataAction["default"];
  }
});
Object.defineProperty(exports, "LoadDataActionResult", {
  enumerable: true,
  get: function get() {
    return _LoadDataActionResult["default"];
  }
});
Object.defineProperty(exports, "ModifyWorkspaceAction", {
  enumerable: true,
  get: function get() {
    return _ModifyWorkspaceAction["default"];
  }
});
Object.defineProperty(exports, "ModifyWorkspaceActionResult", {
  enumerable: true,
  get: function get() {
    return _ModifyWorkspaceActionResult["default"];
  }
});
Object.defineProperty(exports, "Nil", {
  enumerable: true,
  get: function get() {
    return _Nil["default"];
  }
});
Object.defineProperty(exports, "OutputProblem", {
  enumerable: true,
  get: function get() {
    return _OutputProblem["default"];
  }
});
Object.defineProperty(exports, "PairAnyValueAnyValue", {
  enumerable: true,
  get: function get() {
    return _PairAnyValueAnyValue["default"];
  }
});
Object.defineProperty(exports, "ParseAction", {
  enumerable: true,
  get: function get() {
    return _ParseAction["default"];
  }
});
Object.defineProperty(exports, "ParseActionResult", {
  enumerable: true,
  get: function get() {
    return _ParseActionResult["default"];
  }
});
Object.defineProperty(exports, "PersistProblem", {
  enumerable: true,
  get: function get() {
    return _PersistProblem["default"];
  }
});
Object.defineProperty(exports, "Point", {
  enumerable: true,
  get: function get() {
    return _Point["default"];
  }
});
Object.defineProperty(exports, "QueryAction", {
  enumerable: true,
  get: function get() {
    return _QueryAction["default"];
  }
});
Object.defineProperty(exports, "QueryActionResult", {
  enumerable: true,
  get: function get() {
    return _QueryActionResult["default"];
  }
});
Object.defineProperty(exports, "Range", {
  enumerable: true,
  get: function get() {
    return _Range["default"];
  }
});
Object.defineProperty(exports, "RelKey", {
  enumerable: true,
  get: function get() {
    return _RelKey["default"];
  }
});
Object.defineProperty(exports, "Relation", {
  enumerable: true,
  get: function get() {
    return _Relation["default"];
  }
});
Object.defineProperty(exports, "SetOptionsAction", {
  enumerable: true,
  get: function get() {
    return _SetOptionsAction["default"];
  }
});
Object.defineProperty(exports, "SetOptionsActionResult", {
  enumerable: true,
  get: function get() {
    return _SetOptionsActionResult["default"];
  }
});
Object.defineProperty(exports, "Source", {
  enumerable: true,
  get: function get() {
    return _Source["default"];
  }
});
Object.defineProperty(exports, "SyntaxError", {
  enumerable: true,
  get: function get() {
    return _SyntaxError["default"];
  }
});
Object.defineProperty(exports, "SyntaxNode", {
  enumerable: true,
  get: function get() {
    return _SyntaxNode["default"];
  }
});
Object.defineProperty(exports, "Token", {
  enumerable: true,
  get: function get() {
    return _Token["default"];
  }
});
Object.defineProperty(exports, "Transaction", {
  enumerable: true,
  get: function get() {
    return _Transaction["default"];
  }
});
Object.defineProperty(exports, "TransactionResult", {
  enumerable: true,
  get: function get() {
    return _TransactionResult["default"];
  }
});
Object.defineProperty(exports, "UndefinedError", {
  enumerable: true,
  get: function get() {
    return _UndefinedError["default"];
  }
});
Object.defineProperty(exports, "UpdateAction", {
  enumerable: true,
  get: function get() {
    return _UpdateAction["default"];
  }
});
Object.defineProperty(exports, "UpdateActionResult", {
  enumerable: true,
  get: function get() {
    return _UpdateActionResult["default"];
  }
});
Object.defineProperty(exports, "WorkspaceLoadProblem", {
  enumerable: true,
  get: function get() {
    return _WorkspaceLoadProblem["default"];
  }
});
Object.defineProperty(exports, "DefaultApi", {
  enumerable: true,
  get: function get() {
    return _DefaultApi["default"];
  }
});

var _ApiClient = _interopRequireDefault(require("./ApiClient"));

var _AnyType = _interopRequireDefault(require("./model/AnyType"));

var _AbstractProblem = _interopRequireDefault(require("./model/AbstractProblem"));

var _Action = _interopRequireDefault(require("./model/Action"));

var _ActionResult = _interopRequireDefault(require("./model/ActionResult"));

var _Appl = _interopRequireDefault(require("./model/Appl"));

var _Area = _interopRequireDefault(require("./model/Area"));

var _ArityMismatchError = _interopRequireDefault(require("./model/ArityMismatchError"));

var _CSVFileSchema = _interopRequireDefault(require("./model/CSVFileSchema"));

var _CSVFileSyntax = _interopRequireDefault(require("./model/CSVFileSyntax"));

var _CardinalityAction = _interopRequireDefault(require("./model/CardinalityAction"));

var _CardinalityActionResult = _interopRequireDefault(require("./model/CardinalityActionResult"));

var _ClientProblem = _interopRequireDefault(require("./model/ClientProblem"));

var _CollectProblemsAction = _interopRequireDefault(require("./model/CollectProblemsAction"));

var _CollectProblemsActionResult = _interopRequireDefault(require("./model/CollectProblemsActionResult"));

var _ComparisonChainError = _interopRequireDefault(require("./model/ComparisonChainError"));

var _Cons = _interopRequireDefault(require("./model/Cons"));

var _ExceptionProblem = _interopRequireDefault(require("./model/ExceptionProblem"));

var _FileSchema = _interopRequireDefault(require("./model/FileSchema"));

var _FileSyntax = _interopRequireDefault(require("./model/FileSyntax"));

var _FrontProblem = _interopRequireDefault(require("./model/FrontProblem"));

var _ICViolation = _interopRequireDefault(require("./model/ICViolation"));

var _ImportAction = _interopRequireDefault(require("./model/ImportAction"));

var _ImportActionResult = _interopRequireDefault(require("./model/ImportActionResult"));

var _InfraError = _interopRequireDefault(require("./model/InfraError"));

var _InstallAction = _interopRequireDefault(require("./model/InstallAction"));

var _InstallActionResult = _interopRequireDefault(require("./model/InstallActionResult"));

var _IntegrityConstraintProblem = _interopRequireDefault(require("./model/IntegrityConstraintProblem"));

var _IntegrityConstraintViolation = _interopRequireDefault(require("./model/IntegrityConstraintViolation"));

var _JSONFileSchema = _interopRequireDefault(require("./model/JSONFileSchema"));

var _JSONFileSyntax = _interopRequireDefault(require("./model/JSONFileSyntax"));

var _LabeledAction = _interopRequireDefault(require("./model/LabeledAction"));

var _LabeledActionResult = _interopRequireDefault(require("./model/LabeledActionResult"));

var _LinkedList = _interopRequireDefault(require("./model/LinkedList"));

var _ListEdbAction = _interopRequireDefault(require("./model/ListEdbAction"));

var _ListEdbActionResult = _interopRequireDefault(require("./model/ListEdbActionResult"));

var _ListSourceAction = _interopRequireDefault(require("./model/ListSourceAction"));

var _ListSourceActionResult = _interopRequireDefault(require("./model/ListSourceActionResult"));

var _Literal = _interopRequireDefault(require("./model/Literal"));

var _LoadData = _interopRequireDefault(require("./model/LoadData"));

var _LoadDataAction = _interopRequireDefault(require("./model/LoadDataAction"));

var _LoadDataActionResult = _interopRequireDefault(require("./model/LoadDataActionResult"));

var _ModifyWorkspaceAction = _interopRequireDefault(require("./model/ModifyWorkspaceAction"));

var _ModifyWorkspaceActionResult = _interopRequireDefault(require("./model/ModifyWorkspaceActionResult"));

var _Nil = _interopRequireDefault(require("./model/Nil"));

var _OutputProblem = _interopRequireDefault(require("./model/OutputProblem"));

var _PairAnyValueAnyValue = _interopRequireDefault(require("./model/PairAnyValueAnyValue"));

var _ParseAction = _interopRequireDefault(require("./model/ParseAction"));

var _ParseActionResult = _interopRequireDefault(require("./model/ParseActionResult"));

var _PersistProblem = _interopRequireDefault(require("./model/PersistProblem"));

var _Point = _interopRequireDefault(require("./model/Point"));

var _QueryAction = _interopRequireDefault(require("./model/QueryAction"));

var _QueryActionResult = _interopRequireDefault(require("./model/QueryActionResult"));

var _Range = _interopRequireDefault(require("./model/Range"));

var _RelKey = _interopRequireDefault(require("./model/RelKey"));

var _Relation = _interopRequireDefault(require("./model/Relation"));

var _SetOptionsAction = _interopRequireDefault(require("./model/SetOptionsAction"));

var _SetOptionsActionResult = _interopRequireDefault(require("./model/SetOptionsActionResult"));

var _Source = _interopRequireDefault(require("./model/Source"));

var _SyntaxError = _interopRequireDefault(require("./model/SyntaxError"));

var _SyntaxNode = _interopRequireDefault(require("./model/SyntaxNode"));

var _Token = _interopRequireDefault(require("./model/Token"));

var _Transaction = _interopRequireDefault(require("./model/Transaction"));

var _TransactionResult = _interopRequireDefault(require("./model/TransactionResult"));

var _UndefinedError = _interopRequireDefault(require("./model/UndefinedError"));

var _UpdateAction = _interopRequireDefault(require("./model/UpdateAction"));

var _UpdateActionResult = _interopRequireDefault(require("./model/UpdateActionResult"));

var _WorkspaceLoadProblem = _interopRequireDefault(require("./model/WorkspaceLoadProblem"));

var _DefaultApi = _interopRequireDefault(require("./api/DefaultApi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
},{"./ApiClient":1,"./api/DefaultApi":2,"./model/AbstractProblem":4,"./model/Action":5,"./model/ActionResult":6,"./model/AnyType":7,"./model/Appl":8,"./model/Area":9,"./model/ArityMismatchError":10,"./model/CSVFileSchema":11,"./model/CSVFileSyntax":12,"./model/CardinalityAction":13,"./model/CardinalityActionResult":14,"./model/ClientProblem":15,"./model/CollectProblemsAction":16,"./model/CollectProblemsActionResult":17,"./model/ComparisonChainError":18,"./model/Cons":19,"./model/ExceptionProblem":20,"./model/FileSchema":21,"./model/FileSyntax":22,"./model/FrontProblem":23,"./model/ICViolation":24,"./model/ImportAction":25,"./model/ImportActionResult":26,"./model/InfraError":27,"./model/InstallAction":28,"./model/InstallActionResult":29,"./model/IntegrityConstraintProblem":30,"./model/IntegrityConstraintViolation":31,"./model/JSONFileSchema":32,"./model/JSONFileSyntax":33,"./model/LabeledAction":34,"./model/LabeledActionResult":35,"./model/LinkedList":36,"./model/ListEdbAction":37,"./model/ListEdbActionResult":38,"./model/ListSourceAction":39,"./model/ListSourceActionResult":40,"./model/Literal":41,"./model/LoadData":42,"./model/LoadDataAction":43,"./model/LoadDataActionResult":44,"./model/ModifyWorkspaceAction":45,"./model/ModifyWorkspaceActionResult":46,"./model/Nil":47,"./model/OutputProblem":48,"./model/PairAnyValueAnyValue":49,"./model/ParseAction":50,"./model/ParseActionResult":51,"./model/PersistProblem":52,"./model/Point":53,"./model/QueryAction":54,"./model/QueryActionResult":55,"./model/Range":56,"./model/RelKey":57,"./model/Relation":58,"./model/SetOptionsAction":59,"./model/SetOptionsActionResult":60,"./model/Source":61,"./model/SyntaxError":62,"./model/SyntaxNode":63,"./model/Token":64,"./model/Transaction":65,"./model/TransactionResult":66,"./model/UndefinedError":67,"./model/UpdateAction":68,"./model/UpdateActionResult":69,"./model/WorkspaceLoadProblem":70}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The AbstractProblem model module.
 * @module model/AbstractProblem
 * @version 1.0.8
 */
var AbstractProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>AbstractProblem</code>.
   * @alias module:model/AbstractProblem
   * @param type {String} 
   */
  function AbstractProblem(type) {
    _classCallCheck(this, AbstractProblem);

    AbstractProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AbstractProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>AbstractProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AbstractProblem} obj Optional instance to populate.
     * @return {module:model/AbstractProblem} The populated <code>AbstractProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AbstractProblem();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return AbstractProblem;
}();
/**
 * @member {String} type
 * @default ''
 */


AbstractProblem.prototype['type'] = '';
var _default = AbstractProblem;
exports["default"] = _default;
},{"../ApiClient":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Action model module.
 * @module model/Action
 * @version 1.0.8
 */
var Action = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Action</code>.
   * @alias module:model/Action
   * @param type {String} 
   */
  function Action(type) {
    _classCallCheck(this, Action);

    Action.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Action, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>Action</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Action} obj Optional instance to populate.
     * @return {module:model/Action} The populated <code>Action</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Action();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Action;
}();
/**
 * @member {String} type
 * @default ''
 */


Action.prototype['type'] = '';
var _default = Action;
exports["default"] = _default;
},{"../ApiClient":1}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ActionResult model module.
 * @module model/ActionResult
 * @version 1.0.8
 */
var ActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ActionResult</code>.
   * @alias module:model/ActionResult
   * @param type {String}
   */
  function ActionResult(type) {
    _classCallCheck(this, ActionResult);

    ActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>ActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ActionResult} obj Optional instance to populate.
     * @return {module:model/ActionResult} The populated <code>ActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ActionResult();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
          obj = _ApiClient["default"].convertToType(data, obj['type']);
        }
      }

      return obj;
    }
  }]);

  return ActionResult;
}();
/**
 * @member {String} type
 * @default ''
 */


ActionResult.prototype['type'] = '';
var _default = ActionResult;
exports["default"] = _default;
},{"../ApiClient":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The AnyType model module.
 * @module model/AnyType
 * @version 1.0.8
 */
var AnyType = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>AnyType</code>.
   * @alias module:model/AnyType
   * @param target_value {Number} 
   * @param type {module:model/AnyType.TypeEnum} 
   */
  function AnyType(target_value, type) {
    _classCallCheck(this, AnyType);

    AnyType.initialize(this, target_value, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(AnyType, null, [{
    key: "initialize",
    value: function initialize(obj, target_value, type) {
      obj['target_value'] = target_value || null;
      obj['type'] = type || 'AnyType';
    }
    /**
     * Constructs a <code>AnyType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AnyType} obj Optional instance to populate.
     * @return {module:model/AnyType} The populated <code>AnyType</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new AnyType();

        if (data.hasOwnProperty('target_value')) {
          obj['target_value'] = _ApiClient["default"].convertToType(data['target_value'], 'Number');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return AnyType;
}();
/**
 * @member {Number} target_value
 * @default 0
 */


AnyType.prototype['target_value'] = 0;
/**
 * @member {module:model/AnyType.TypeEnum} type
 * @default 'AnyType'
 */

AnyType.prototype['type'] = 'AnyType';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

AnyType['TypeEnum'] = {
  /**
   * value: "AnyType"
   * @const
   */
  "AnyType": "AnyType"
};
var _default = AnyType;
exports["default"] = _default;
},{"../ApiClient":1}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Range = _interopRequireDefault(require("./Range"));

var _SyntaxNode = _interopRequireDefault(require("./SyntaxNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Appl model module.
 * @module model/Appl
 * @version 1.0.8
 */
var Appl = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Appl</code>.
   * @alias module:model/Appl
   * @extends module:model/SyntaxNode
   * @implements module:model/SyntaxNode
   * @param type {String} 
   */
  function Appl(type) {
    _classCallCheck(this, Appl);

    _SyntaxNode["default"].initialize(this, type);

    Appl.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Appl, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['error'] = error || false;
      obj['missing'] = missing || false;
      obj['range'] = range;
      obj['symbol'] = symbol || '';
    }
    /**
     * Constructs a <code>Appl</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Appl} obj Optional instance to populate.
     * @return {module:model/Appl} The populated <code>Appl</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Appl();

        _SyntaxNode["default"].constructFromObject(data, obj);

        _SyntaxNode["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('arguments')) {
          obj['arguments'] = _ApiClient["default"].convertToType(data['arguments'], [_SyntaxNode["default"]]);
        }

        if (data.hasOwnProperty('error')) {
          obj['error'] = _ApiClient["default"].convertToType(data['error'], 'Boolean');
        }

        if (data.hasOwnProperty('missing')) {
          obj['missing'] = _ApiClient["default"].convertToType(data['missing'], 'Boolean');
        }

        if (data.hasOwnProperty('range')) {
          obj['range'] = _Range["default"].constructFromObject(data['range']);
        }

        if (data.hasOwnProperty('symbol')) {
          obj['symbol'] = _ApiClient["default"].convertToType(data['symbol'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Appl;
}();
/**
 * @member {Array.<module:model/SyntaxNode>} arguments
 */


Appl.prototype['arguments'] = undefined;
/**
 * @member {Boolean} error
 * @default false
 */

Appl.prototype['error'] = false;
/**
 * @member {Boolean} missing
 * @default false
 */

Appl.prototype['missing'] = false;
/**
 * @member {module:model/Range} range
 */

Appl.prototype['range'] = undefined;
/**
 * @member {String} symbol
 * @default ''
 */

Appl.prototype['symbol'] = ''; // Implement SyntaxNode interface:

/**
 * @member {String} type
 * @default ''
 */

_SyntaxNode["default"].prototype['type'] = '';
var _default = Appl;
exports["default"] = _default;
},{"../ApiClient":1,"./Range":56,"./SyntaxNode":63}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Point = _interopRequireDefault(require("./Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Area model module.
 * @module model/Area
 * @version 1.0.8
 */
var Area = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Area</code>.
   * @alias module:model/Area
   * @param endPoint {module:model/Point} 
   * @param startPoint {module:model/Point} 
   * @param type {module:model/Area.TypeEnum} 
   */
  function Area(endPoint, startPoint, type) {
    _classCallCheck(this, Area);

    Area.initialize(this, endPoint, startPoint, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Area, null, [{
    key: "initialize",
    value: function initialize(obj, endPoint, startPoint, type) {
      obj['end_point'] = endPoint;
      obj['start_point'] = startPoint;
      obj['type'] = type || 'Area';
    }
    /**
     * Constructs a <code>Area</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Area} obj Optional instance to populate.
     * @return {module:model/Area} The populated <code>Area</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Area();

        if (data.hasOwnProperty('end_point')) {
          obj['end_point'] = _Point["default"].constructFromObject(data['end_point']);
        }

        if (data.hasOwnProperty('start_point')) {
          obj['start_point'] = _Point["default"].constructFromObject(data['start_point']);
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Area;
}();
/**
 * @member {module:model/Point} end_point
 */


Area.prototype['end_point'] = undefined;
/**
 * @member {module:model/Point} start_point
 */

Area.prototype['start_point'] = undefined;
/**
 * @member {module:model/Area.TypeEnum} type
 * @default 'Area'
 */

Area.prototype['type'] = 'Area';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

Area['TypeEnum'] = {
  /**
   * value: "Area"
   * @const
   */
  "Area": "Area"
};
var _default = Area;
exports["default"] = _default;
},{"../ApiClient":1,"./Point":53}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AnyType = _interopRequireDefault(require("./AnyType"));

var _FrontProblem = _interopRequireDefault(require("./FrontProblem"));

var _Range = _interopRequireDefault(require("./Range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ArityMismatchError model module.
 * @module model/ArityMismatchError
 * @version 1.0.8
 */
var ArityMismatchError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ArityMismatchError</code>.
   * @alias module:model/ArityMismatchError
   * @extends module:model/FrontProblem
   * @implements module:model/FrontProblem
   * @param type {String} 
   */
  function ArityMismatchError(type) {
    _classCallCheck(this, ArityMismatchError);

    _FrontProblem["default"].initialize(this, type);

    ArityMismatchError.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ArityMismatchError, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['msg'] = msg || '';
      obj['range'] = range;
    }
    /**
     * Constructs a <code>ArityMismatchError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ArityMismatchError} obj Optional instance to populate.
     * @return {module:model/ArityMismatchError} The populated <code>ArityMismatchError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ArityMismatchError();

        _FrontProblem["default"].constructFromObject(data, obj);

        _FrontProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('msg')) {
          obj['msg'] = _ApiClient["default"].convertToType(data['msg'], 'String');
        }

        if (data.hasOwnProperty('node')) {
          obj['node'] = _ApiClient["default"].convertToType(data['node'], _AnyType["default"]);
        }

        if (data.hasOwnProperty('range')) {
          obj['range'] = _Range["default"].constructFromObject(data['range']);
        }
      }

      return obj;
    }
  }]);

  return ArityMismatchError;
}();
/**
 * @member {String} msg
 * @default ''
 */


ArityMismatchError.prototype['msg'] = '';
/**
 * @member {module:model/AnyType} node
 */

ArityMismatchError.prototype['node'] = undefined;
/**
 * @member {module:model/Range} range
 */

ArityMismatchError.prototype['range'] = undefined; // Implement FrontProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_FrontProblem["default"].prototype['type'] = '';
var _default = ArityMismatchError;
exports["default"] = _default;
},{"../ApiClient":1,"./AnyType":7,"./FrontProblem":23,"./Range":56}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _FileSchema = _interopRequireDefault(require("./FileSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CSVFileSchema model module.
 * @module model/CSVFileSchema
 * @version 1.0.8
 */
var CSVFileSchema = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CSVFileSchema</code>.
   * @alias module:model/CSVFileSchema
   * @extends module:model/FileSchema
   * @implements module:model/FileSchema
   * @param type {String} 
   */
  function CSVFileSchema(type) {
    _classCallCheck(this, CSVFileSchema);

    _FileSchema["default"].initialize(this, type);

    CSVFileSchema.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CSVFileSchema, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>CSVFileSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CSVFileSchema} obj Optional instance to populate.
     * @return {module:model/CSVFileSchema} The populated <code>CSVFileSchema</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CSVFileSchema();

        _FileSchema["default"].constructFromObject(data, obj);

        _FileSchema["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('types')) {
          obj['types'] = _ApiClient["default"].convertToType(data['types'], ['String']);
        }
      }

      return obj;
    }
  }]);

  return CSVFileSchema;
}();
/**
 * @member {Array.<String>} types
 */


CSVFileSchema.prototype['types'] = undefined; // Implement FileSchema interface:

/**
 * @member {String} type
 * @default ''
 */

_FileSchema["default"].prototype['type'] = '';
var _default = CSVFileSchema;
exports["default"] = _default;
},{"../ApiClient":1,"./FileSchema":21}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _FileSyntax = _interopRequireDefault(require("./FileSyntax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CSVFileSyntax model module.
 * @module model/CSVFileSyntax
 * @version 1.0.8
 */
var CSVFileSyntax = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CSVFileSyntax</code>.
   * @alias module:model/CSVFileSyntax
   * @extends module:model/FileSyntax
   * @implements module:model/FileSyntax
   * @param type {String} 
   */
  function CSVFileSyntax(type) {
    _classCallCheck(this, CSVFileSyntax);

    _FileSyntax["default"].initialize(this, type);

    CSVFileSyntax.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CSVFileSyntax, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['datarow'] = datarow || 0;
      obj['delim'] = delim || '';
      obj['escapechar'] = escapechar || '';
      obj['header_row'] = headerRow || 0;
      obj['ignorerepeated'] = ignorerepeated || false;
      obj['normalizenames'] = normalizenames || false;
      obj['quotechar'] = quotechar || '';
    }
    /**
     * Constructs a <code>CSVFileSyntax</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CSVFileSyntax} obj Optional instance to populate.
     * @return {module:model/CSVFileSyntax} The populated <code>CSVFileSyntax</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CSVFileSyntax();

        _FileSyntax["default"].constructFromObject(data, obj);

        _FileSyntax["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('datarow')) {
          obj['datarow'] = _ApiClient["default"].convertToType(data['datarow'], 'Number');
        }

        if (data.hasOwnProperty('delim')) {
          obj['delim'] = _ApiClient["default"].convertToType(data['delim'], 'String');
        }

        if (data.hasOwnProperty('escapechar')) {
          obj['escapechar'] = _ApiClient["default"].convertToType(data['escapechar'], 'String');
        }

        if (data.hasOwnProperty('header')) {
          obj['header'] = _ApiClient["default"].convertToType(data['header'], ['String']);
        }

        if (data.hasOwnProperty('header_row')) {
          obj['header_row'] = _ApiClient["default"].convertToType(data['header_row'], 'Number');
        }

        if (data.hasOwnProperty('ignorerepeated')) {
          obj['ignorerepeated'] = _ApiClient["default"].convertToType(data['ignorerepeated'], 'Boolean');
        }

        if (data.hasOwnProperty('missingstrings')) {
          obj['missingstrings'] = _ApiClient["default"].convertToType(data['missingstrings'], ['String']);
        }

        if (data.hasOwnProperty('normalizenames')) {
          obj['normalizenames'] = _ApiClient["default"].convertToType(data['normalizenames'], 'Boolean');
        }

        if (data.hasOwnProperty('quotechar')) {
          obj['quotechar'] = _ApiClient["default"].convertToType(data['quotechar'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CSVFileSyntax;
}();
/**
 * @member {Number} datarow
 * @default 0
 */


CSVFileSyntax.prototype['datarow'] = 0;
/**
 * @member {String} delim
 * @default ''
 */

CSVFileSyntax.prototype['delim'] = '';
/**
 * @member {String} escapechar
 * @default ''
 */

CSVFileSyntax.prototype['escapechar'] = '';
/**
 * @member {Array.<String>} header
 */

CSVFileSyntax.prototype['header'] = undefined;
/**
 * @member {Number} header_row
 * @default 0
 */

CSVFileSyntax.prototype['header_row'] = 0;
/**
 * @member {Boolean} ignorerepeated
 * @default false
 */

CSVFileSyntax.prototype['ignorerepeated'] = false;
/**
 * @member {Array.<String>} missingstrings
 */

CSVFileSyntax.prototype['missingstrings'] = undefined;
/**
 * @member {Boolean} normalizenames
 * @default false
 */

CSVFileSyntax.prototype['normalizenames'] = false;
/**
 * @member {String} quotechar
 * @default ''
 */

CSVFileSyntax.prototype['quotechar'] = ''; // Implement FileSyntax interface:

/**
 * @member {String} type
 * @default ''
 */

_FileSyntax["default"].prototype['type'] = '';
var _default = CSVFileSyntax;
exports["default"] = _default;
},{"../ApiClient":1,"./FileSyntax":22}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CardinalityAction model module.
 * @module model/CardinalityAction
 * @version 1.0.8
 */
var CardinalityAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CardinalityAction</code>.
   * @alias module:model/CardinalityAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function CardinalityAction(type) {
    _classCallCheck(this, CardinalityAction);

    _Action["default"].initialize(this, type);

    CardinalityAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CardinalityAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>CardinalityAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardinalityAction} obj Optional instance to populate.
     * @return {module:model/CardinalityAction} The populated <code>CardinalityAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CardinalityAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('relname')) {
          obj['relname'] = _ApiClient["default"].convertToType(data['relname'], 'String');
        }
      }

      return obj;
    }
  }]);

  return CardinalityAction;
}();
/**
 * @member {String} relname
 */


CardinalityAction.prototype['relname'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = CardinalityAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

var _Relation = _interopRequireDefault(require("./Relation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CardinalityActionResult model module.
 * @module model/CardinalityActionResult
 * @version 1.0.8
 */
var CardinalityActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CardinalityActionResult</code>.
   * @alias module:model/CardinalityActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function CardinalityActionResult(type) {
    _classCallCheck(this, CardinalityActionResult);

    _ActionResult["default"].initialize(this, type);

    CardinalityActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CardinalityActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>CardinalityActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardinalityActionResult} obj Optional instance to populate.
     * @return {module:model/CardinalityActionResult} The populated <code>CardinalityActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CardinalityActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('result')) {
          obj['result'] = _ApiClient["default"].convertToType(data['result'], [_Relation["default"]]);
        }
      }

      return obj;
    }
  }]);

  return CardinalityActionResult;
}();
/**
 * @member {Array.<module:model/Relation>} result
 */


CardinalityActionResult.prototype['result'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = CardinalityActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6,"./Relation":58}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ClientProblem model module.
 * @module model/ClientProblem
 * @version 1.0.8
 */
var ClientProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ClientProblem</code>.
   * @alias module:model/ClientProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function ClientProblem(type) {
    _classCallCheck(this, ClientProblem);

    _AbstractProblem["default"].initialize(this, type);

    ClientProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ClientProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['error_code'] = errorCode || '';
      obj['is_error'] = isError || false;
      obj['is_exception'] = isException || false;
      obj['message'] = message || '';
      obj['path'] = path || '';
      obj['report'] = report || '';
    }
    /**
     * Constructs a <code>ClientProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClientProblem} obj Optional instance to populate.
     * @return {module:model/ClientProblem} The populated <code>ClientProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ClientProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('error_code')) {
          obj['error_code'] = _ApiClient["default"].convertToType(data['error_code'], 'String');
        }

        if (data.hasOwnProperty('is_error')) {
          obj['is_error'] = _ApiClient["default"].convertToType(data['is_error'], 'Boolean');
        }

        if (data.hasOwnProperty('is_exception')) {
          obj['is_exception'] = _ApiClient["default"].convertToType(data['is_exception'], 'Boolean');
        }

        if (data.hasOwnProperty('message')) {
          obj['message'] = _ApiClient["default"].convertToType(data['message'], 'String');
        }

        if (data.hasOwnProperty('path')) {
          obj['path'] = _ApiClient["default"].convertToType(data['path'], 'String');
        }

        if (data.hasOwnProperty('report')) {
          obj['report'] = _ApiClient["default"].convertToType(data['report'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ClientProblem;
}();
/**
 * @member {String} error_code
 * @default ''
 */


ClientProblem.prototype['error_code'] = '';
/**
 * @member {Boolean} is_error
 * @default false
 */

ClientProblem.prototype['is_error'] = false;
/**
 * @member {Boolean} is_exception
 * @default false
 */

ClientProblem.prototype['is_exception'] = false;
/**
 * @member {String} message
 * @default ''
 */

ClientProblem.prototype['message'] = '';
/**
 * @member {String} path
 * @default ''
 */

ClientProblem.prototype['path'] = '';
/**
 * @member {String} report
 * @default ''
 */

ClientProblem.prototype['report'] = ''; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = ClientProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CollectProblemsAction model module.
 * @module model/CollectProblemsAction
 * @version 1.0.8
 */
var CollectProblemsAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CollectProblemsAction</code>.
   * @alias module:model/CollectProblemsAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function CollectProblemsAction(type) {
    _classCallCheck(this, CollectProblemsAction);

    _Action["default"].initialize(this, type);

    CollectProblemsAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CollectProblemsAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>CollectProblemsAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CollectProblemsAction} obj Optional instance to populate.
     * @return {module:model/CollectProblemsAction} The populated <code>CollectProblemsAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CollectProblemsAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return CollectProblemsAction;
}(); // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */


_Action["default"].prototype['type'] = '';
var _default = CollectProblemsAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The CollectProblemsActionResult model module.
 * @module model/CollectProblemsActionResult
 * @version 1.0.8
 */
var CollectProblemsActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>CollectProblemsActionResult</code>.
   * @alias module:model/CollectProblemsActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function CollectProblemsActionResult(type) {
    _classCallCheck(this, CollectProblemsActionResult);

    _ActionResult["default"].initialize(this, type);

    CollectProblemsActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(CollectProblemsActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>CollectProblemsActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CollectProblemsActionResult} obj Optional instance to populate.
     * @return {module:model/CollectProblemsActionResult} The populated <code>CollectProblemsActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new CollectProblemsActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('problems')) {
          obj['problems'] = _ApiClient["default"].convertToType(data['problems'], [_AbstractProblem["default"]]);
        }
      }

      return obj;
    }
  }]);

  return CollectProblemsActionResult;
}();
/**
 * @member {Array.<module:model/AbstractProblem>} problems
 */


CollectProblemsActionResult.prototype['problems'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = CollectProblemsActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4,"./ActionResult":6}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AnyType = _interopRequireDefault(require("./AnyType"));

var _FrontProblem = _interopRequireDefault(require("./FrontProblem"));

var _Range = _interopRequireDefault(require("./Range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ComparisonChainError model module.
 * @module model/ComparisonChainError
 * @version 1.0.8
 */
var ComparisonChainError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ComparisonChainError</code>.
   * @alias module:model/ComparisonChainError
   * @extends module:model/FrontProblem
   * @implements module:model/FrontProblem
   * @param type {String} 
   */
  function ComparisonChainError(type) {
    _classCallCheck(this, ComparisonChainError);

    _FrontProblem["default"].initialize(this, type);

    ComparisonChainError.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ComparisonChainError, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['msg'] = msg || '';
      obj['range'] = range;
    }
    /**
     * Constructs a <code>ComparisonChainError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ComparisonChainError} obj Optional instance to populate.
     * @return {module:model/ComparisonChainError} The populated <code>ComparisonChainError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ComparisonChainError();

        _FrontProblem["default"].constructFromObject(data, obj);

        _FrontProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('msg')) {
          obj['msg'] = _ApiClient["default"].convertToType(data['msg'], 'String');
        }

        if (data.hasOwnProperty('node')) {
          obj['node'] = _ApiClient["default"].convertToType(data['node'], _AnyType["default"]);
        }

        if (data.hasOwnProperty('range')) {
          obj['range'] = _Range["default"].constructFromObject(data['range']);
        }
      }

      return obj;
    }
  }]);

  return ComparisonChainError;
}();
/**
 * @member {String} msg
 * @default ''
 */


ComparisonChainError.prototype['msg'] = '';
/**
 * @member {module:model/AnyType} node
 */

ComparisonChainError.prototype['node'] = undefined;
/**
 * @member {module:model/Range} range
 */

ComparisonChainError.prototype['range'] = undefined; // Implement FrontProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_FrontProblem["default"].prototype['type'] = '';
var _default = ComparisonChainError;
exports["default"] = _default;
},{"../ApiClient":1,"./AnyType":7,"./FrontProblem":23,"./Range":56}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _LinkedList = _interopRequireDefault(require("./LinkedList"));

var _SyntaxNode = _interopRequireDefault(require("./SyntaxNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Cons model module.
 * @module model/Cons
 * @version 1.0.8
 */
var Cons = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Cons</code>.
   * @alias module:model/Cons
   * @extends module:model/LinkedList
   * @implements module:model/LinkedList
   * @param type {String} 
   */
  function Cons(type) {
    _classCallCheck(this, Cons);

    _LinkedList["default"].initialize(this, type);

    Cons.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Cons, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['head'] = head;
      obj['tail'] = tail;
    }
    /**
     * Constructs a <code>Cons</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Cons} obj Optional instance to populate.
     * @return {module:model/Cons} The populated <code>Cons</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Cons();

        _LinkedList["default"].constructFromObject(data, obj);

        _LinkedList["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('head')) {
          obj['head'] = _SyntaxNode["default"].constructFromObject(data['head']);
        }

        if (data.hasOwnProperty('tail')) {
          obj['tail'] = _LinkedList["default"].constructFromObject(data['tail']);
        }
      }

      return obj;
    }
  }]);

  return Cons;
}();
/**
 * @member {module:model/SyntaxNode} head
 */


Cons.prototype['head'] = undefined;
/**
 * @member {module:model/LinkedList} tail
 */

Cons.prototype['tail'] = undefined; // Implement LinkedList interface:

/**
 * @member {String} type
 * @default ''
 */

_LinkedList["default"].prototype['type'] = '';
var _default = Cons;
exports["default"] = _default;
},{"../ApiClient":1,"./LinkedList":36,"./SyntaxNode":63}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ExceptionProblem model module.
 * @module model/ExceptionProblem
 * @version 1.0.8
 */
var ExceptionProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ExceptionProblem</code>.
   * @alias module:model/ExceptionProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function ExceptionProblem(type) {
    _classCallCheck(this, ExceptionProblem);

    _AbstractProblem["default"].initialize(this, type);

    ExceptionProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ExceptionProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['exception'] = exception || '';
    }
    /**
     * Constructs a <code>ExceptionProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ExceptionProblem} obj Optional instance to populate.
     * @return {module:model/ExceptionProblem} The populated <code>ExceptionProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ExceptionProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('exception')) {
          obj['exception'] = _ApiClient["default"].convertToType(data['exception'], 'String');
        }

        if (data.hasOwnProperty('exception_stacktrace')) {
          obj['exception_stacktrace'] = _ApiClient["default"].convertToType(data['exception_stacktrace'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ExceptionProblem;
}();
/**
 * @member {String} exception
 * @default ''
 */


ExceptionProblem.prototype['exception'] = '';
/**
 * @member {String} exception_stacktrace
 */

ExceptionProblem.prototype['exception_stacktrace'] = undefined; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = ExceptionProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FileSchema model module.
 * @module model/FileSchema
 * @version 1.0.8
 */
var FileSchema = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FileSchema</code>.
   * @alias module:model/FileSchema
   * @param type {String} 
   */
  function FileSchema(type) {
    _classCallCheck(this, FileSchema);

    FileSchema.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FileSchema, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>FileSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileSchema} obj Optional instance to populate.
     * @return {module:model/FileSchema} The populated <code>FileSchema</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FileSchema();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return FileSchema;
}();
/**
 * @member {String} type
 * @default ''
 */


FileSchema.prototype['type'] = '';
var _default = FileSchema;
exports["default"] = _default;
},{"../ApiClient":1}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FileSyntax model module.
 * @module model/FileSyntax
 * @version 1.0.8
 */
var FileSyntax = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FileSyntax</code>.
   * @alias module:model/FileSyntax
   * @param type {String} 
   */
  function FileSyntax(type) {
    _classCallCheck(this, FileSyntax);

    FileSyntax.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FileSyntax, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>FileSyntax</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileSyntax} obj Optional instance to populate.
     * @return {module:model/FileSyntax} The populated <code>FileSyntax</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FileSyntax();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return FileSyntax;
}();
/**
 * @member {String} type
 * @default ''
 */


FileSyntax.prototype['type'] = '';
var _default = FileSyntax;
exports["default"] = _default;
},{"../ApiClient":1}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The FrontProblem model module.
 * @module model/FrontProblem
 * @version 1.0.8
 */
var FrontProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>FrontProblem</code>.
   * @alias module:model/FrontProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function FrontProblem(type) {
    _classCallCheck(this, FrontProblem);

    _AbstractProblem["default"].initialize(this, type);

    FrontProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(FrontProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>FrontProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FrontProblem} obj Optional instance to populate.
     * @return {module:model/FrontProblem} The populated <code>FrontProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new FrontProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return FrontProblem;
}(); // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */


_AbstractProblem["default"].prototype['type'] = '';
var _default = FrontProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],24:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _RelKey = _interopRequireDefault(require("./RelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ICViolation model module.
 * @module model/ICViolation
 * @version 1.0.8
 */
var ICViolation = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ICViolation</code>.
   * @alias module:model/ICViolation
   * @param relKey {module:model/RelKey} 
   * @param source {String} 
   * @param type {module:model/ICViolation.TypeEnum} 
   */
  function ICViolation(relKey, source, type) {
    _classCallCheck(this, ICViolation);

    ICViolation.initialize(this, relKey, source, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ICViolation, null, [{
    key: "initialize",
    value: function initialize(obj, relKey, source, type) {
      obj['rel_key'] = relKey;
      obj['source'] = source || '';
      obj['type'] = type || 'ICViolation';
    }
    /**
     * Constructs a <code>ICViolation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ICViolation} obj Optional instance to populate.
     * @return {module:model/ICViolation} The populated <code>ICViolation</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ICViolation();

        if (data.hasOwnProperty('rel_key')) {
          obj['rel_key'] = _RelKey["default"].constructFromObject(data['rel_key']);
        }

        if (data.hasOwnProperty('source')) {
          obj['source'] = _ApiClient["default"].convertToType(data['source'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ICViolation;
}();
/**
 * @member {module:model/RelKey} rel_key
 */


ICViolation.prototype['rel_key'] = undefined;
/**
 * @member {String} source
 * @default ''
 */

ICViolation.prototype['source'] = '';
/**
 * @member {module:model/ICViolation.TypeEnum} type
 * @default 'ICViolation'
 */

ICViolation.prototype['type'] = 'ICViolation';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

ICViolation['TypeEnum'] = {
  /**
   * value: "ICViolation"
   * @const
   */
  "ICViolation": "ICViolation"
};
var _default = ICViolation;
exports["default"] = _default;
},{"../ApiClient":1,"./RelKey":57}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

var _Relation = _interopRequireDefault(require("./Relation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ImportAction model module.
 * @module model/ImportAction
 * @version 1.0.8
 */
var ImportAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ImportAction</code>.
   * @alias module:model/ImportAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function ImportAction(type) {
    _classCallCheck(this, ImportAction);

    _Action["default"].initialize(this, type);

    ImportAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ImportAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ImportAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ImportAction} obj Optional instance to populate.
     * @return {module:model/ImportAction} The populated <code>ImportAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ImportAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('inputs')) {
          obj['inputs'] = _ApiClient["default"].convertToType(data['inputs'], [_Relation["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ImportAction;
}();
/**
 * @member {Array.<module:model/Relation>} inputs
 */


ImportAction.prototype['inputs'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = ImportAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5,"./Relation":58}],26:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ImportActionResult model module.
 * @module model/ImportActionResult
 * @version 1.0.8
 */
var ImportActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ImportActionResult</code>.
   * @alias module:model/ImportActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function ImportActionResult(type) {
    _classCallCheck(this, ImportActionResult);

    _ActionResult["default"].initialize(this, type);

    ImportActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ImportActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ImportActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ImportActionResult} obj Optional instance to populate.
     * @return {module:model/ImportActionResult} The populated <code>ImportActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ImportActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return ImportActionResult;
}(); // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */


_ActionResult["default"].prototype['type'] = '';
var _default = ImportActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6}],27:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The InfraError model module.
 * @module model/InfraError
 * @version 1.0.8
 */
var InfraError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>InfraError</code>.
   * @alias module:model/InfraError
   * @param status {String} 
   * @param message {String} 
   */
  function InfraError(status, message) {
    _classCallCheck(this, InfraError);

    InfraError.initialize(this, status, message);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(InfraError, null, [{
    key: "initialize",
    value: function initialize(obj, status, message) {
      obj['status'] = status;
      obj['message'] = message;
    }
    /**
     * Constructs a <code>InfraError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InfraError} obj Optional instance to populate.
     * @return {module:model/InfraError} The populated <code>InfraError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new InfraError();

        if (data.hasOwnProperty('status')) {
          obj['status'] = _ApiClient["default"].convertToType(data['status'], 'String');
        }

        if (data.hasOwnProperty('message')) {
          obj['message'] = _ApiClient["default"].convertToType(data['message'], 'String');
        }
      }

      return obj;
    }
  }]);

  return InfraError;
}();
/**
 * @member {String} status
 */


InfraError.prototype['status'] = undefined;
/**
 * @member {String} message
 */

InfraError.prototype['message'] = undefined;
var _default = InfraError;
exports["default"] = _default;
},{"../ApiClient":1}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

var _Source = _interopRequireDefault(require("./Source"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The InstallAction model module.
 * @module model/InstallAction
 * @version 1.0.8
 */
var InstallAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>InstallAction</code>.
   * @alias module:model/InstallAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function InstallAction(type) {
    _classCallCheck(this, InstallAction);

    _Action["default"].initialize(this, type);

    InstallAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(InstallAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>InstallAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InstallAction} obj Optional instance to populate.
     * @return {module:model/InstallAction} The populated <code>InstallAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new InstallAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('sources')) {
          obj['sources'] = _ApiClient["default"].convertToType(data['sources'], [_Source["default"]]);
        }
      }

      return obj;
    }
  }]);

  return InstallAction;
}();
/**
 * @member {Array.<module:model/Source>} sources
 */


InstallAction.prototype['sources'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = InstallAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5,"./Source":61}],29:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The InstallActionResult model module.
 * @module model/InstallActionResult
 * @version 1.0.8
 */
var InstallActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>InstallActionResult</code>.
   * @alias module:model/InstallActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function InstallActionResult(type) {
    _classCallCheck(this, InstallActionResult);

    _ActionResult["default"].initialize(this, type);

    InstallActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(InstallActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>InstallActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InstallActionResult} obj Optional instance to populate.
     * @return {module:model/InstallActionResult} The populated <code>InstallActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new InstallActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return InstallActionResult;
}(); // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */


_ActionResult["default"].prototype['type'] = '';
var _default = InstallActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6}],30:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IntegrityConstraintProblem model module.
 * @module model/IntegrityConstraintProblem
 * @version 1.0.8
 */
var IntegrityConstraintProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IntegrityConstraintProblem</code>.
   * @alias module:model/IntegrityConstraintProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function IntegrityConstraintProblem(type) {
    _classCallCheck(this, IntegrityConstraintProblem);

    _AbstractProblem["default"].initialize(this, type);

    IntegrityConstraintProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IntegrityConstraintProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['exception'] = exception || '';
    }
    /**
     * Constructs a <code>IntegrityConstraintProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IntegrityConstraintProblem} obj Optional instance to populate.
     * @return {module:model/IntegrityConstraintProblem} The populated <code>IntegrityConstraintProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IntegrityConstraintProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('exception')) {
          obj['exception'] = _ApiClient["default"].convertToType(data['exception'], 'String');
        }
      }

      return obj;
    }
  }]);

  return IntegrityConstraintProblem;
}();
/**
 * @member {String} exception
 * @default ''
 */


IntegrityConstraintProblem.prototype['exception'] = ''; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = IntegrityConstraintProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],31:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

var _ICViolation = _interopRequireDefault(require("./ICViolation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The IntegrityConstraintViolation model module.
 * @module model/IntegrityConstraintViolation
 * @version 1.0.8
 */
var IntegrityConstraintViolation = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>IntegrityConstraintViolation</code>.
   * @alias module:model/IntegrityConstraintViolation
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function IntegrityConstraintViolation(type) {
    _classCallCheck(this, IntegrityConstraintViolation);

    _AbstractProblem["default"].initialize(this, type);

    IntegrityConstraintViolation.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(IntegrityConstraintViolation, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>IntegrityConstraintViolation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IntegrityConstraintViolation} obj Optional instance to populate.
     * @return {module:model/IntegrityConstraintViolation} The populated <code>IntegrityConstraintViolation</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new IntegrityConstraintViolation();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('sources')) {
          obj['sources'] = _ApiClient["default"].convertToType(data['sources'], [_ICViolation["default"]]);
        }
      }

      return obj;
    }
  }]);

  return IntegrityConstraintViolation;
}();
/**
 * @member {Array.<module:model/ICViolation>} sources
 */


IntegrityConstraintViolation.prototype['sources'] = undefined; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = IntegrityConstraintViolation;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4,"./ICViolation":24}],32:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _FileSchema = _interopRequireDefault(require("./FileSchema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The JSONFileSchema model module.
 * @module model/JSONFileSchema
 * @version 1.0.8
 */
var JSONFileSchema = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>JSONFileSchema</code>.
   * @alias module:model/JSONFileSchema
   * @extends module:model/FileSchema
   * @implements module:model/FileSchema
   * @param type {String} 
   */
  function JSONFileSchema(type) {
    _classCallCheck(this, JSONFileSchema);

    _FileSchema["default"].initialize(this, type);

    JSONFileSchema.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(JSONFileSchema, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>JSONFileSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/JSONFileSchema} obj Optional instance to populate.
     * @return {module:model/JSONFileSchema} The populated <code>JSONFileSchema</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new JSONFileSchema();

        _FileSchema["default"].constructFromObject(data, obj);

        _FileSchema["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return JSONFileSchema;
}(); // Implement FileSchema interface:

/**
 * @member {String} type
 * @default ''
 */


_FileSchema["default"].prototype['type'] = '';
var _default = JSONFileSchema;
exports["default"] = _default;
},{"../ApiClient":1,"./FileSchema":21}],33:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _FileSyntax = _interopRequireDefault(require("./FileSyntax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The JSONFileSyntax model module.
 * @module model/JSONFileSyntax
 * @version 1.0.8
 */
var JSONFileSyntax = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>JSONFileSyntax</code>.
   * @alias module:model/JSONFileSyntax
   * @extends module:model/FileSyntax
   * @implements module:model/FileSyntax
   * @param type {String} 
   */
  function JSONFileSyntax(type) {
    _classCallCheck(this, JSONFileSyntax);

    _FileSyntax["default"].initialize(this, type);

    JSONFileSyntax.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(JSONFileSyntax, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>JSONFileSyntax</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/JSONFileSyntax} obj Optional instance to populate.
     * @return {module:model/JSONFileSyntax} The populated <code>JSONFileSyntax</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new JSONFileSyntax();

        _FileSyntax["default"].constructFromObject(data, obj);

        _FileSyntax["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return JSONFileSyntax;
}(); // Implement FileSyntax interface:

/**
 * @member {String} type
 * @default ''
 */


_FileSyntax["default"].prototype['type'] = '';
var _default = JSONFileSyntax;
exports["default"] = _default;
},{"../ApiClient":1,"./FileSyntax":22}],34:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LabeledAction model module.
 * @module model/LabeledAction
 * @version 1.0.8
 */
var LabeledAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LabeledAction</code>.
   * @alias module:model/LabeledAction
   * @param action {module:model/Action} 
   * @param name {String} 
   * @param type {module:model/LabeledAction.TypeEnum} 
   */
  function LabeledAction(action, name, type) {
    _classCallCheck(this, LabeledAction);

    LabeledAction.initialize(this, action, name, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LabeledAction, null, [{
    key: "initialize",
    value: function initialize(obj, action, name, type) {
      obj['action'] = action;
      obj['name'] = name || '';
      obj['type'] = type || 'LabeledAction';
    }
    /**
     * Constructs a <code>LabeledAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LabeledAction} obj Optional instance to populate.
     * @return {module:model/LabeledAction} The populated <code>LabeledAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LabeledAction();

        if (data.hasOwnProperty('action')) {
          obj['action'] = _Action["default"].constructFromObject(data['action']);
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return LabeledAction;
}();
/**
 * @member {module:model/Action} action
 */


LabeledAction.prototype['action'] = undefined;
/**
 * @member {String} name
 * @default ''
 */

LabeledAction.prototype['name'] = '';
/**
 * @member {module:model/LabeledAction.TypeEnum} type
 * @default 'LabeledAction'
 */

LabeledAction.prototype['type'] = 'LabeledAction';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

LabeledAction['TypeEnum'] = {
  /**
   * value: "LabeledAction"
   * @const
   */
  "LabeledAction": "LabeledAction"
};
var _default = LabeledAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],35:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LabeledActionResult model module.
 * @module model/LabeledActionResult
 * @version 1.0.8
 */
var LabeledActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LabeledActionResult</code>.
   * @alias module:model/LabeledActionResult
   * @param name {String} 
   * @param result {module:model/ActionResult} 
   * @param type {module:model/LabeledActionResult.TypeEnum} 
   */
  function LabeledActionResult(name, result, type) {
    _classCallCheck(this, LabeledActionResult);

    LabeledActionResult.initialize(this, name, result, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LabeledActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, name, result, type) {
      obj['name'] = name || '';
      obj['result'] = result;
      obj['type'] = type || 'LabeledActionResult';
    }
    /**
     * Constructs a <code>LabeledActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LabeledActionResult} obj Optional instance to populate.
     * @return {module:model/LabeledActionResult} The populated <code>LabeledActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LabeledActionResult();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('result')) {
          obj['result'] = _ActionResult["default"].constructFromObject(data['result']);
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return LabeledActionResult;
}();
/**
 * @member {String} name
 * @default ''
 */


LabeledActionResult.prototype['name'] = '';
/**
 * @member {module:model/ActionResult} result
 */

LabeledActionResult.prototype['result'] = undefined;
/**
 * @member {module:model/LabeledActionResult.TypeEnum} type
 * @default 'LabeledActionResult'
 */

LabeledActionResult.prototype['type'] = 'LabeledActionResult';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

LabeledActionResult['TypeEnum'] = {
  /**
   * value: "LabeledActionResult"
   * @const
   */
  "LabeledActionResult": "LabeledActionResult"
};
var _default = LabeledActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6}],36:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LinkedList model module.
 * @module model/LinkedList
 * @version 1.0.8
 */
var LinkedList = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LinkedList</code>.
   * @alias module:model/LinkedList
   * @param type {String} 
   */
  function LinkedList(type) {
    _classCallCheck(this, LinkedList);

    LinkedList.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LinkedList, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>LinkedList</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LinkedList} obj Optional instance to populate.
     * @return {module:model/LinkedList} The populated <code>LinkedList</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LinkedList();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return LinkedList;
}();
/**
 * @member {String} type
 * @default ''
 */


LinkedList.prototype['type'] = '';
var _default = LinkedList;
exports["default"] = _default;
},{"../ApiClient":1}],37:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ListEdbAction model module.
 * @module model/ListEdbAction
 * @version 1.0.8
 */
var ListEdbAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ListEdbAction</code>.
   * @alias module:model/ListEdbAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function ListEdbAction(type) {
    _classCallCheck(this, ListEdbAction);

    _Action["default"].initialize(this, type);

    ListEdbAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ListEdbAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ListEdbAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListEdbAction} obj Optional instance to populate.
     * @return {module:model/ListEdbAction} The populated <code>ListEdbAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ListEdbAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('relname')) {
          obj['relname'] = _ApiClient["default"].convertToType(data['relname'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ListEdbAction;
}();
/**
 * @member {String} relname
 */


ListEdbAction.prototype['relname'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = ListEdbAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

var _RelKey = _interopRequireDefault(require("./RelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ListEdbActionResult model module.
 * @module model/ListEdbActionResult
 * @version 1.0.8
 */
var ListEdbActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ListEdbActionResult</code>.
   * @alias module:model/ListEdbActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function ListEdbActionResult(type) {
    _classCallCheck(this, ListEdbActionResult);

    _ActionResult["default"].initialize(this, type);

    ListEdbActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ListEdbActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ListEdbActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListEdbActionResult} obj Optional instance to populate.
     * @return {module:model/ListEdbActionResult} The populated <code>ListEdbActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ListEdbActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('rels')) {
          obj['rels'] = _ApiClient["default"].convertToType(data['rels'], [_RelKey["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ListEdbActionResult;
}();
/**
 * @member {Array.<module:model/RelKey>} rels
 */


ListEdbActionResult.prototype['rels'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = ListEdbActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6,"./RelKey":57}],39:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ListSourceAction model module.
 * @module model/ListSourceAction
 * @version 1.0.8
 */
var ListSourceAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ListSourceAction</code>.
   * @alias module:model/ListSourceAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function ListSourceAction(type) {
    _classCallCheck(this, ListSourceAction);

    _Action["default"].initialize(this, type);

    ListSourceAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ListSourceAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ListSourceAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListSourceAction} obj Optional instance to populate.
     * @return {module:model/ListSourceAction} The populated <code>ListSourceAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ListSourceAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return ListSourceAction;
}(); // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */


_Action["default"].prototype['type'] = '';
var _default = ListSourceAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

var _Source = _interopRequireDefault(require("./Source"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ListSourceActionResult model module.
 * @module model/ListSourceActionResult
 * @version 1.0.8
 */
var ListSourceActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ListSourceActionResult</code>.
   * @alias module:model/ListSourceActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function ListSourceActionResult(type) {
    _classCallCheck(this, ListSourceActionResult);

    _ActionResult["default"].initialize(this, type);

    ListSourceActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ListSourceActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ListSourceActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListSourceActionResult} obj Optional instance to populate.
     * @return {module:model/ListSourceActionResult} The populated <code>ListSourceActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ListSourceActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('sources')) {
          obj['sources'] = _ApiClient["default"].convertToType(data['sources'], [_Source["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ListSourceActionResult;
}();
/**
 * @member {Array.<module:model/Source>} sources
 */


ListSourceActionResult.prototype['sources'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = ListSourceActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6,"./Source":61}],41:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Range = _interopRequireDefault(require("./Range"));

var _SyntaxNode = _interopRequireDefault(require("./SyntaxNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Literal model module.
 * @module model/Literal
 * @version 1.0.8
 */
var Literal = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Literal</code>.
   * @alias module:model/Literal
   * @extends module:model/SyntaxNode
   * @implements module:model/SyntaxNode
   * @param type {String} 
   */
  function Literal(type) {
    _classCallCheck(this, Literal);

    _SyntaxNode["default"].initialize(this, type);

    Literal.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Literal, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['missing'] = missing || false;
      obj['range'] = range;
      obj['value'] = value || '';
    }
    /**
     * Constructs a <code>Literal</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Literal} obj Optional instance to populate.
     * @return {module:model/Literal} The populated <code>Literal</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Literal();

        _SyntaxNode["default"].constructFromObject(data, obj);

        _SyntaxNode["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('missing')) {
          obj['missing'] = _ApiClient["default"].convertToType(data['missing'], 'Boolean');
        }

        if (data.hasOwnProperty('range')) {
          obj['range'] = _Range["default"].constructFromObject(data['range']);
        }

        if (data.hasOwnProperty('value')) {
          obj['value'] = _ApiClient["default"].convertToType(data['value'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Literal;
}();
/**
 * @member {Boolean} missing
 * @default false
 */


Literal.prototype['missing'] = false;
/**
 * @member {module:model/Range} range
 */

Literal.prototype['range'] = undefined;
/**
 * @member {String} value
 * @default ''
 */

Literal.prototype['value'] = ''; // Implement SyntaxNode interface:

/**
 * @member {String} type
 * @default ''
 */

_SyntaxNode["default"].prototype['type'] = '';
var _default = Literal;
exports["default"] = _default;
},{"../ApiClient":1,"./Range":56,"./SyntaxNode":63}],42:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AnyType = _interopRequireDefault(require("./AnyType"));

var _FileSchema = _interopRequireDefault(require("./FileSchema"));

var _FileSyntax = _interopRequireDefault(require("./FileSyntax"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LoadData model module.
 * @module model/LoadData
 * @version 1.0.8
 */
var LoadData = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LoadData</code>.
   * @alias module:model/LoadData
   * @param contentType {String} 
   * @param key {module:model/AnyType} 
   * @param type {module:model/LoadData.TypeEnum} 
   */
  function LoadData(contentType, key, type) {
    _classCallCheck(this, LoadData);

    LoadData.initialize(this, contentType, key, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LoadData, null, [{
    key: "initialize",
    value: function initialize(obj, contentType, key, type) {
      obj['content_type'] = contentType || '';
      obj['key'] = key;
      obj['type'] = type || 'LoadData';
    }
    /**
     * Constructs a <code>LoadData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadData} obj Optional instance to populate.
     * @return {module:model/LoadData} The populated <code>LoadData</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LoadData();

        if (data.hasOwnProperty('content_type')) {
          obj['content_type'] = _ApiClient["default"].convertToType(data['content_type'], 'String');
        }

        if (data.hasOwnProperty('data')) {
          obj['data'] = _ApiClient["default"].convertToType(data['data'], 'String');
        }

        if (data.hasOwnProperty('file_schema')) {
          obj['file_schema'] = _FileSchema["default"].constructFromObject(data['file_schema']);
        }

        if (data.hasOwnProperty('file_syntax')) {
          obj['file_syntax'] = _FileSyntax["default"].constructFromObject(data['file_syntax']);
        }

        if (data.hasOwnProperty('key')) {
          obj['key'] = _ApiClient["default"].convertToType(data['key'], _AnyType["default"]);
        }

        if (data.hasOwnProperty('path')) {
          obj['path'] = _ApiClient["default"].convertToType(data['path'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return LoadData;
}();
/**
 * @member {String} content_type
 * @default ''
 */


LoadData.prototype['content_type'] = '';
/**
 * @member {String} data
 */

LoadData.prototype['data'] = undefined;
/**
 * @member {module:model/FileSchema} file_schema
 */

LoadData.prototype['file_schema'] = undefined;
/**
 * @member {module:model/FileSyntax} file_syntax
 */

LoadData.prototype['file_syntax'] = undefined;
/**
 * @member {module:model/AnyType} key
 */

LoadData.prototype['key'] = undefined;
/**
 * @member {String} path
 */

LoadData.prototype['path'] = undefined;
/**
 * @member {module:model/LoadData.TypeEnum} type
 * @default 'LoadData'
 */

LoadData.prototype['type'] = 'LoadData';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

LoadData['TypeEnum'] = {
  /**
   * value: "LoadData"
   * @const
   */
  "LoadData": "LoadData"
};
var _default = LoadData;
exports["default"] = _default;
},{"../ApiClient":1,"./AnyType":7,"./FileSchema":21,"./FileSyntax":22}],43:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

var _LoadData = _interopRequireDefault(require("./LoadData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LoadDataAction model module.
 * @module model/LoadDataAction
 * @version 1.0.8
 */
var LoadDataAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LoadDataAction</code>.
   * @alias module:model/LoadDataAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function LoadDataAction(type) {
    _classCallCheck(this, LoadDataAction);

    _Action["default"].initialize(this, type);

    LoadDataAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LoadDataAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['rel'] = rel || '';
      obj['value'] = value;
    }
    /**
     * Constructs a <code>LoadDataAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadDataAction} obj Optional instance to populate.
     * @return {module:model/LoadDataAction} The populated <code>LoadDataAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LoadDataAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('rel')) {
          obj['rel'] = _ApiClient["default"].convertToType(data['rel'], 'String');
        }

        if (data.hasOwnProperty('value')) {
          obj['value'] = _LoadData["default"].constructFromObject(data['value']);
        }
      }

      return obj;
    }
  }]);

  return LoadDataAction;
}();
/**
 * @member {String} rel
 * @default ''
 */


LoadDataAction.prototype['rel'] = '';
/**
 * @member {module:model/LoadData} value
 */

LoadDataAction.prototype['value'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = LoadDataAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5,"./LoadData":42}],44:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The LoadDataActionResult model module.
 * @module model/LoadDataActionResult
 * @version 1.0.8
 */
var LoadDataActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>LoadDataActionResult</code>.
   * @alias module:model/LoadDataActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function LoadDataActionResult(type) {
    _classCallCheck(this, LoadDataActionResult);

    _ActionResult["default"].initialize(this, type);

    LoadDataActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(LoadDataActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>LoadDataActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadDataActionResult} obj Optional instance to populate.
     * @return {module:model/LoadDataActionResult} The populated <code>LoadDataActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new LoadDataActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return LoadDataActionResult;
}(); // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */


_ActionResult["default"].prototype['type'] = '';
var _default = LoadDataActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6}],45:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ModifyWorkspaceAction model module.
 * @module model/ModifyWorkspaceAction
 * @version 1.0.8
 */
var ModifyWorkspaceAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ModifyWorkspaceAction</code>.
   * @alias module:model/ModifyWorkspaceAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function ModifyWorkspaceAction(type) {
    _classCallCheck(this, ModifyWorkspaceAction);

    _Action["default"].initialize(this, type);

    ModifyWorkspaceAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ModifyWorkspaceAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ModifyWorkspaceAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModifyWorkspaceAction} obj Optional instance to populate.
     * @return {module:model/ModifyWorkspaceAction} The populated <code>ModifyWorkspaceAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ModifyWorkspaceAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('delete_edb')) {
          obj['delete_edb'] = _ApiClient["default"].convertToType(data['delete_edb'], 'String');
        }

        if (data.hasOwnProperty('delete_source')) {
          obj['delete_source'] = _ApiClient["default"].convertToType(data['delete_source'], ['String']);
        }

        if (data.hasOwnProperty('enable_library')) {
          obj['enable_library'] = _ApiClient["default"].convertToType(data['enable_library'], 'String');
        }
      }

      return obj;
    }
  }]);

  return ModifyWorkspaceAction;
}();
/**
 * @member {String} delete_edb
 */


ModifyWorkspaceAction.prototype['delete_edb'] = undefined;
/**
 * @member {Array.<String>} delete_source
 */

ModifyWorkspaceAction.prototype['delete_source'] = undefined;
/**
 * @member {String} enable_library
 */

ModifyWorkspaceAction.prototype['enable_library'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = ModifyWorkspaceAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],46:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

var _RelKey = _interopRequireDefault(require("./RelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ModifyWorkspaceActionResult model module.
 * @module model/ModifyWorkspaceActionResult
 * @version 1.0.8
 */
var ModifyWorkspaceActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ModifyWorkspaceActionResult</code>.
   * @alias module:model/ModifyWorkspaceActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function ModifyWorkspaceActionResult(type) {
    _classCallCheck(this, ModifyWorkspaceActionResult);

    _ActionResult["default"].initialize(this, type);

    ModifyWorkspaceActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ModifyWorkspaceActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ModifyWorkspaceActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModifyWorkspaceActionResult} obj Optional instance to populate.
     * @return {module:model/ModifyWorkspaceActionResult} The populated <code>ModifyWorkspaceActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ModifyWorkspaceActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('delete_edb_result')) {
          obj['delete_edb_result'] = _ApiClient["default"].convertToType(data['delete_edb_result'], [_RelKey["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ModifyWorkspaceActionResult;
}();
/**
 * @member {Array.<module:model/RelKey>} delete_edb_result
 */


ModifyWorkspaceActionResult.prototype['delete_edb_result'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = ModifyWorkspaceActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6,"./RelKey":57}],47:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _LinkedList = _interopRequireDefault(require("./LinkedList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Nil model module.
 * @module model/Nil
 * @version 1.0.8
 */
var Nil = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Nil</code>.
   * @alias module:model/Nil
   * @extends module:model/LinkedList
   * @implements module:model/LinkedList
   * @param type {String} 
   */
  function Nil(type) {
    _classCallCheck(this, Nil);

    _LinkedList["default"].initialize(this, type);

    Nil.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Nil, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>Nil</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Nil} obj Optional instance to populate.
     * @return {module:model/Nil} The populated <code>Nil</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Nil();

        _LinkedList["default"].constructFromObject(data, obj);

        _LinkedList["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return Nil;
}(); // Implement LinkedList interface:

/**
 * @member {String} type
 * @default ''
 */


_LinkedList["default"].prototype['type'] = '';
var _default = Nil;
exports["default"] = _default;
},{"../ApiClient":1,"./LinkedList":36}],48:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The OutputProblem model module.
 * @module model/OutputProblem
 * @version 1.0.8
 */
var OutputProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>OutputProblem</code>.
   * @alias module:model/OutputProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function OutputProblem(type) {
    _classCallCheck(this, OutputProblem);

    _AbstractProblem["default"].initialize(this, type);

    OutputProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(OutputProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['exception'] = exception || '';
      obj['name'] = name || '';
    }
    /**
     * Constructs a <code>OutputProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OutputProblem} obj Optional instance to populate.
     * @return {module:model/OutputProblem} The populated <code>OutputProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new OutputProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('exception')) {
          obj['exception'] = _ApiClient["default"].convertToType(data['exception'], 'String');
        }

        if (data.hasOwnProperty('exception_stacktrace')) {
          obj['exception_stacktrace'] = _ApiClient["default"].convertToType(data['exception_stacktrace'], 'String');
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }
      }

      return obj;
    }
  }]);

  return OutputProblem;
}();
/**
 * @member {String} exception
 * @default ''
 */


OutputProblem.prototype['exception'] = '';
/**
 * @member {String} exception_stacktrace
 */

OutputProblem.prototype['exception_stacktrace'] = undefined;
/**
 * @member {String} name
 * @default ''
 */

OutputProblem.prototype['name'] = ''; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = OutputProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],49:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AnyType = _interopRequireDefault(require("./AnyType"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The PairAnyValueAnyValue model module.
 * @module model/PairAnyValueAnyValue
 * @version 1.0.8
 */
var PairAnyValueAnyValue = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>PairAnyValueAnyValue</code>.
   * @alias module:model/PairAnyValueAnyValue
   * @param type {module:model/PairAnyValueAnyValue.TypeEnum} 
   */
  function PairAnyValueAnyValue(type) {
    _classCallCheck(this, PairAnyValueAnyValue);

    PairAnyValueAnyValue.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(PairAnyValueAnyValue, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || 'Pair_AnyValue_AnyValue_';
    }
    /**
     * Constructs a <code>PairAnyValueAnyValue</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PairAnyValueAnyValue} obj Optional instance to populate.
     * @return {module:model/PairAnyValueAnyValue} The populated <code>PairAnyValueAnyValue</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new PairAnyValueAnyValue();

        if (data.hasOwnProperty('first')) {
          obj['first'] = _ApiClient["default"].convertToType(data['first'], _AnyType["default"]);
        }

        if (data.hasOwnProperty('second')) {
          obj['second'] = _ApiClient["default"].convertToType(data['second'], _AnyType["default"]);
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return PairAnyValueAnyValue;
}();
/**
 * @member {module:model/AnyType} first
 */


PairAnyValueAnyValue.prototype['first'] = undefined;
/**
 * @member {module:model/AnyType} second
 */

PairAnyValueAnyValue.prototype['second'] = undefined;
/**
 * @member {module:model/PairAnyValueAnyValue.TypeEnum} type
 * @default 'Pair_AnyValue_AnyValue_'
 */

PairAnyValueAnyValue.prototype['type'] = 'Pair_AnyValue_AnyValue_';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

PairAnyValueAnyValue['TypeEnum'] = {
  /**
   * value: "Pair_AnyValue_AnyValue_"
   * @const
   */
  "Pair_AnyValue_AnyValue_": "Pair_AnyValue_AnyValue_"
};
var _default = PairAnyValueAnyValue;
exports["default"] = _default;
},{"../ApiClient":1,"./AnyType":7}],50:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

var _Source = _interopRequireDefault(require("./Source"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ParseAction model module.
 * @module model/ParseAction
 * @version 1.0.8
 */
var ParseAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ParseAction</code>.
   * @alias module:model/ParseAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function ParseAction(type) {
    _classCallCheck(this, ParseAction);

    _Action["default"].initialize(this, type);

    ParseAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ParseAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['nonterm'] = nonterm || '';
      obj['source'] = source;
    }
    /**
     * Constructs a <code>ParseAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ParseAction} obj Optional instance to populate.
     * @return {module:model/ParseAction} The populated <code>ParseAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ParseAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('nonterm')) {
          obj['nonterm'] = _ApiClient["default"].convertToType(data['nonterm'], 'String');
        }

        if (data.hasOwnProperty('source')) {
          obj['source'] = _Source["default"].constructFromObject(data['source']);
        }
      }

      return obj;
    }
  }]);

  return ParseAction;
}();
/**
 * @member {String} nonterm
 * @default ''
 */


ParseAction.prototype['nonterm'] = '';
/**
 * @member {module:model/Source} source
 */

ParseAction.prototype['source'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = ParseAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5,"./Source":61}],51:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The ParseActionResult model module.
 * @module model/ParseActionResult
 * @version 1.0.8
 */
var ParseActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>ParseActionResult</code>.
   * @alias module:model/ParseActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function ParseActionResult(type) {
    _classCallCheck(this, ParseActionResult);

    _ActionResult["default"].initialize(this, type);

    ParseActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(ParseActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>ParseActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ParseActionResult} obj Optional instance to populate.
     * @return {module:model/ParseActionResult} The populated <code>ParseActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new ParseActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('problems')) {
          obj['problems'] = _ApiClient["default"].convertToType(data['problems'], [_AbstractProblem["default"]]);
        }
      }

      return obj;
    }
  }]);

  return ParseActionResult;
}();
/**
 * @member {Array.<module:model/AbstractProblem>} problems
 */


ParseActionResult.prototype['problems'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = ParseActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4,"./ActionResult":6}],52:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The PersistProblem model module.
 * @module model/PersistProblem
 * @version 1.0.8
 */
var PersistProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>PersistProblem</code>.
   * @alias module:model/PersistProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function PersistProblem(type) {
    _classCallCheck(this, PersistProblem);

    _AbstractProblem["default"].initialize(this, type);

    PersistProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(PersistProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['exception'] = exception || '';
    }
    /**
     * Constructs a <code>PersistProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PersistProblem} obj Optional instance to populate.
     * @return {module:model/PersistProblem} The populated <code>PersistProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new PersistProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('exception')) {
          obj['exception'] = _ApiClient["default"].convertToType(data['exception'], 'String');
        }

        if (data.hasOwnProperty('exception_stacktrace')) {
          obj['exception_stacktrace'] = _ApiClient["default"].convertToType(data['exception_stacktrace'], 'String');
        }
      }

      return obj;
    }
  }]);

  return PersistProblem;
}();
/**
 * @member {String} exception
 * @default ''
 */


PersistProblem.prototype['exception'] = '';
/**
 * @member {String} exception_stacktrace
 */

PersistProblem.prototype['exception_stacktrace'] = undefined; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = PersistProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],53:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Point model module.
 * @module model/Point
 * @version 1.0.8
 */
var Point = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Point</code>.
   * @alias module:model/Point
   * @param column {Number} 
   * @param row {Number} 
   * @param type {module:model/Point.TypeEnum} 
   */
  function Point(column, row, type) {
    _classCallCheck(this, Point);

    Point.initialize(this, column, row, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Point, null, [{
    key: "initialize",
    value: function initialize(obj, column, row, type) {
      obj['column'] = column || 0;
      obj['row'] = row || 0;
      obj['type'] = type || 'Point';
    }
    /**
     * Constructs a <code>Point</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Point} obj Optional instance to populate.
     * @return {module:model/Point} The populated <code>Point</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Point();

        if (data.hasOwnProperty('column')) {
          obj['column'] = _ApiClient["default"].convertToType(data['column'], 'Number');
        }

        if (data.hasOwnProperty('row')) {
          obj['row'] = _ApiClient["default"].convertToType(data['row'], 'Number');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Point;
}();
/**
 * @member {Number} column
 * @default 0
 */


Point.prototype['column'] = 0;
/**
 * @member {Number} row
 * @default 0
 */

Point.prototype['row'] = 0;
/**
 * @member {module:model/Point.TypeEnum} type
 * @default 'Point'
 */

Point.prototype['type'] = 'Point';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

Point['TypeEnum'] = {
  /**
   * value: "Point"
   * @const
   */
  "Point": "Point"
};
var _default = Point;
exports["default"] = _default;
},{"../ApiClient":1}],54:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

var _Relation = _interopRequireDefault(require("./Relation"));

var _Source = _interopRequireDefault(require("./Source"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The QueryAction model module.
 * @module model/QueryAction
 * @version 1.0.8
 */
var QueryAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>QueryAction</code>.
   * @alias module:model/QueryAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String}
   */
  function QueryAction(type) {
    _classCallCheck(this, QueryAction);

    _Action["default"].initialize(this, type);

    QueryAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(QueryAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['source'] = null;
    }
    /**
     * Constructs a <code>QueryAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QueryAction} obj Optional instance to populate.
     * @return {module:model/QueryAction} The populated <code>QueryAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new QueryAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('inputs')) {
          obj['inputs'] = _ApiClient["default"].convertToType(data['inputs'], [_Relation["default"]]);
        }

        if (data.hasOwnProperty('outputs')) {
          obj['outputs'] = _ApiClient["default"].convertToType(data['outputs'], ['String']);
        }

        if (data.hasOwnProperty('persist')) {
          obj['persist'] = _ApiClient["default"].convertToType(data['persist'], ['String']);
        }

        if (data.hasOwnProperty('source')) {
          obj['source'] = _Source["default"].constructFromObject(data['source']);
        }
      }

      return obj;
    }
  }]);

  return QueryAction;
}();
/**
 * @member {Array.<module:model/Relation>} inputs
 */


QueryAction.prototype['inputs'] = undefined;
/**
 * @member {Array.<String>} outputs
 */

QueryAction.prototype['outputs'] = undefined;
/**
 * @member {Array.<String>} persist
 */

QueryAction.prototype['persist'] = undefined;
/**
 * @member {module:model/Source} source
 */

QueryAction.prototype['source'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = QueryAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5,"./Relation":58,"./Source":61}],55:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

var _Relation = _interopRequireDefault(require("./Relation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The QueryActionResult model module.
 * @module model/QueryActionResult
 * @version 1.0.8
 */
var QueryActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>QueryActionResult</code>.
   * @alias module:model/QueryActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function QueryActionResult(type) {
    _classCallCheck(this, QueryActionResult);

    _ActionResult["default"].initialize(this, type);

    QueryActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(QueryActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>QueryActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QueryActionResult} obj Optional instance to populate.
     * @return {module:model/QueryActionResult} The populated <code>QueryActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new QueryActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('output')) {
          obj['output'] = _ApiClient["default"].convertToType(data['output'], [_Relation["default"]]);
        }
      }

      return obj;
    }
  }]);

  return QueryActionResult;
}();
/**
 * @member {Array.<module:model/Relation>} output
 */


QueryActionResult.prototype['output'] = undefined; // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */

_ActionResult["default"].prototype['type'] = '';
var _default = QueryActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6,"./Relation":58}],56:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AnyType = _interopRequireDefault(require("./AnyType"));

var _Area = _interopRequireDefault(require("./Area"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Range model module.
 * @module model/Range
 * @version 1.0.8
 */
var Range = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Range</code>.
   * @alias module:model/Range
   * @param area {module:model/Area} 
   * @param endByte {Number} 
   * @param startByte {Number} 
   * @param type {module:model/Range.TypeEnum} 
   */
  function Range(area, endByte, startByte, type) {
    _classCallCheck(this, Range);

    Range.initialize(this, area, endByte, startByte, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Range, null, [{
    key: "initialize",
    value: function initialize(obj, area, endByte, startByte, type) {
      obj['area'] = area;
      obj['end_byte'] = endByte || 0;
      obj['start_byte'] = startByte || 0;
      obj['type'] = type || 'Range';
    }
    /**
     * Constructs a <code>Range</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Range} obj Optional instance to populate.
     * @return {module:model/Range} The populated <code>Range</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Range();

        if (data.hasOwnProperty('area')) {
          obj['area'] = _Area["default"].constructFromObject(data['area']);
        }

        if (data.hasOwnProperty('end_byte')) {
          obj['end_byte'] = _ApiClient["default"].convertToType(data['end_byte'], 'Number');
        }

        if (data.hasOwnProperty('input')) {
          obj['input'] = _ApiClient["default"].convertToType(data['input'], _AnyType["default"]);
        }

        if (data.hasOwnProperty('start_byte')) {
          obj['start_byte'] = _ApiClient["default"].convertToType(data['start_byte'], 'Number');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Range;
}();
/**
 * @member {module:model/Area} area
 */


Range.prototype['area'] = undefined;
/**
 * @member {Number} end_byte
 * @default 0
 */

Range.prototype['end_byte'] = 0;
/**
 * @member {module:model/AnyType} input
 */

Range.prototype['input'] = undefined;
/**
 * @member {Number} start_byte
 * @default 0
 */

Range.prototype['start_byte'] = 0;
/**
 * @member {module:model/Range.TypeEnum} type
 * @default 'Range'
 */

Range.prototype['type'] = 'Range';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

Range['TypeEnum'] = {
  /**
   * value: "Range"
   * @const
   */
  "Range": "Range"
};
var _default = Range;
exports["default"] = _default;
},{"../ApiClient":1,"./AnyType":7,"./Area":9}],57:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The RelKey model module.
 * @module model/RelKey
 * @version 1.0.8
 */
var RelKey = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>RelKey</code>.
   * @alias module:model/RelKey
   * @param name {String} 
   * @param type {module:model/RelKey.TypeEnum} 
   */
  function RelKey(name, type) {
    _classCallCheck(this, RelKey);

    RelKey.initialize(this, name, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(RelKey, null, [{
    key: "initialize",
    value: function initialize(obj, name, type) {
      obj['name'] = name || '';
      obj['type'] = type || 'RelKey';
    }
    /**
     * Constructs a <code>RelKey</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RelKey} obj Optional instance to populate.
     * @return {module:model/RelKey} The populated <code>RelKey</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new RelKey();

        if (data.hasOwnProperty('keys')) {
          obj['keys'] = _ApiClient["default"].convertToType(data['keys'], ['String']);
        }

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('values')) {
          obj['values'] = _ApiClient["default"].convertToType(data['values'], ['String']);
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return RelKey;
}();
/**
 * @member {Array.<String>} keys
 */


RelKey.prototype['keys'] = undefined;
/**
 * @member {String} name
 * @default ''
 */

RelKey.prototype['name'] = '';
/**
 * @member {Array.<String>} values
 */

RelKey.prototype['values'] = undefined;
/**
 * @member {module:model/RelKey.TypeEnum} type
 * @default 'RelKey'
 */

RelKey.prototype['type'] = 'RelKey';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

RelKey['TypeEnum'] = {
  /**
   * value: "RelKey"
   * @const
   */
  "RelKey": "RelKey"
};
var _default = RelKey;
exports["default"] = _default;
},{"../ApiClient":1}],58:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AnyType = _interopRequireDefault(require("./AnyType"));

var _RelKey = _interopRequireDefault(require("./RelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Relation model module.
 * @module model/Relation
 * @version 1.0.8
 */
var Relation = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Relation</code>.
   * @alias module:model/Relation
   * @param relKey {module:model/RelKey} 
   * @param type {module:model/Relation.TypeEnum} 
   */
  function Relation(relKey, type) {
    _classCallCheck(this, Relation);

    Relation.initialize(this, relKey, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Relation, null, [{
    key: "initialize",
    value: function initialize(obj, relKey, type) {
      obj['rel_key'] = relKey;
      obj['type'] = type || 'Relation';
    }
    /**
     * Constructs a <code>Relation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Relation} obj Optional instance to populate.
     * @return {module:model/Relation} The populated <code>Relation</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Relation();

        if (data.hasOwnProperty('columns')) {
          obj['columns'] = _ApiClient["default"].convertToType(data['columns'], [[_AnyType["default"]]]);
        }

        if (data.hasOwnProperty('rel_key')) {
          obj['rel_key'] = _RelKey["default"].constructFromObject(data['rel_key']);
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Relation;
}();
/**
 * @member {Array.<Array.<module:model/AnyType>>} columns
 */


Relation.prototype['columns'] = undefined;
/**
 * @member {module:model/RelKey} rel_key
 */

Relation.prototype['rel_key'] = undefined;
/**
 * @member {module:model/Relation.TypeEnum} type
 * @default 'Relation'
 */

Relation.prototype['type'] = 'Relation';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

Relation['TypeEnum'] = {
  /**
   * value: "Relation"
   * @const
   */
  "Relation": "Relation"
};
var _default = Relation;
exports["default"] = _default;
},{"../ApiClient":1,"./AnyType":7,"./RelKey":57}],59:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SetOptionsAction model module.
 * @module model/SetOptionsAction
 * @version 1.0.8
 */
var SetOptionsAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SetOptionsAction</code>.
   * @alias module:model/SetOptionsAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function SetOptionsAction(type) {
    _classCallCheck(this, SetOptionsAction);

    _Action["default"].initialize(this, type);

    SetOptionsAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SetOptionsAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>SetOptionsAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SetOptionsAction} obj Optional instance to populate.
     * @return {module:model/SetOptionsAction} The populated <code>SetOptionsAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SetOptionsAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('abort_on_error')) {
          obj['abort_on_error'] = _ApiClient["default"].convertToType(data['abort_on_error'], 'Boolean');
        }

        if (data.hasOwnProperty('broken')) {
          obj['broken'] = _ApiClient["default"].convertToType(data['broken'], 'Boolean');
        }

        if (data.hasOwnProperty('debug')) {
          obj['debug'] = _ApiClient["default"].convertToType(data['debug'], 'Boolean');
        }

        if (data.hasOwnProperty('debug_trace')) {
          obj['debug_trace'] = _ApiClient["default"].convertToType(data['debug_trace'], 'Boolean');
        }

        if (data.hasOwnProperty('silent')) {
          obj['silent'] = _ApiClient["default"].convertToType(data['silent'], 'Boolean');
        }
      }

      return obj;
    }
  }]);

  return SetOptionsAction;
}();
/**
 * @member {Boolean} abort_on_error
 */


SetOptionsAction.prototype['abort_on_error'] = undefined;
/**
 * @member {Boolean} broken
 */

SetOptionsAction.prototype['broken'] = undefined;
/**
 * @member {Boolean} debug
 */

SetOptionsAction.prototype['debug'] = undefined;
/**
 * @member {Boolean} debug_trace
 */

SetOptionsAction.prototype['debug_trace'] = undefined;
/**
 * @member {Boolean} silent
 */

SetOptionsAction.prototype['silent'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = SetOptionsAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5}],60:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SetOptionsActionResult model module.
 * @module model/SetOptionsActionResult
 * @version 1.0.8
 */
var SetOptionsActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SetOptionsActionResult</code>.
   * @alias module:model/SetOptionsActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function SetOptionsActionResult(type) {
    _classCallCheck(this, SetOptionsActionResult);

    _ActionResult["default"].initialize(this, type);

    SetOptionsActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SetOptionsActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>SetOptionsActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SetOptionsActionResult} obj Optional instance to populate.
     * @return {module:model/SetOptionsActionResult} The populated <code>SetOptionsActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SetOptionsActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return SetOptionsActionResult;
}(); // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */


_ActionResult["default"].prototype['type'] = '';
var _default = SetOptionsActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6}],61:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Source model module.
 * @module model/Source
 * @version 1.0.8
 */
var Source = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Source</code>.
   * @alias module:model/Source
   * @param name {String} 
   * @param path {String} 
   * @param value {String} 
   * @param type {module:model/Source.TypeEnum} 
   */
  function Source(name, path, value, type) {
    _classCallCheck(this, Source);

    Source.initialize(this, name, path, value, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Source, null, [{
    key: "initialize",
    value: function initialize(obj, name, path, value, type) {
      obj['name'] = name || '';
      obj['path'] = path || '';
      obj['value'] = value || '';
      obj['type'] = type || 'Source';
    }
    /**
     * Constructs a <code>Source</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Source} obj Optional instance to populate.
     * @return {module:model/Source} The populated <code>Source</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Source();

        if (data.hasOwnProperty('name')) {
          obj['name'] = _ApiClient["default"].convertToType(data['name'], 'String');
        }

        if (data.hasOwnProperty('path')) {
          obj['path'] = _ApiClient["default"].convertToType(data['path'], 'String');
        }

        if (data.hasOwnProperty('value')) {
          obj['value'] = _ApiClient["default"].convertToType(data['value'], 'String');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Source;
}();
/**
 * @member {String} name
 * @default ''
 */


Source.prototype['name'] = '';
/**
 * @member {String} path
 * @default ''
 */

Source.prototype['path'] = '';
/**
 * @member {String} value
 * @default ''
 */

Source.prototype['value'] = '';
/**
 * @member {module:model/Source.TypeEnum} type
 * @default 'Source'
 */

Source.prototype['type'] = 'Source';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

Source['TypeEnum'] = {
  /**
   * value: "Source"
   * @const
   */
  "Source": "Source"
};
var _default = Source;
exports["default"] = _default;
},{"../ApiClient":1}],62:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

var _LinkedList = _interopRequireDefault(require("./LinkedList"));

var _SyntaxNode = _interopRequireDefault(require("./SyntaxNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SyntaxError model module.
 * @module model/SyntaxError
 * @version 1.0.8
 */
var SyntaxError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SyntaxError</code>.
   * @alias module:model/SyntaxError
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function SyntaxError(type) {
    _classCallCheck(this, SyntaxError);

    _AbstractProblem["default"].initialize(this, type);

    SyntaxError.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SyntaxError, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['node'] = node;
      obj['trace'] = trace;
    }
    /**
     * Constructs a <code>SyntaxError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SyntaxError} obj Optional instance to populate.
     * @return {module:model/SyntaxError} The populated <code>SyntaxError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SyntaxError();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('next')) {
          obj['next'] = _SyntaxNode["default"].constructFromObject(data['next']);
        }

        if (data.hasOwnProperty('node')) {
          obj['node'] = _SyntaxNode["default"].constructFromObject(data['node']);
        }

        if (data.hasOwnProperty('trace')) {
          obj['trace'] = _LinkedList["default"].constructFromObject(data['trace']);
        }
      }

      return obj;
    }
  }]);

  return SyntaxError;
}();
/**
 * @member {module:model/SyntaxNode} next
 */


SyntaxError.prototype['next'] = undefined;
/**
 * @member {module:model/SyntaxNode} node
 */

SyntaxError.prototype['node'] = undefined;
/**
 * @member {module:model/LinkedList} trace
 */

SyntaxError.prototype['trace'] = undefined; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = SyntaxError;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4,"./LinkedList":36,"./SyntaxNode":63}],63:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The SyntaxNode model module.
 * @module model/SyntaxNode
 * @version 1.0.8
 */
var SyntaxNode = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>SyntaxNode</code>.
   * @alias module:model/SyntaxNode
   * @param type {String} 
   */
  function SyntaxNode(type) {
    _classCallCheck(this, SyntaxNode);

    SyntaxNode.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(SyntaxNode, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['type'] = type || '';
    }
    /**
     * Constructs a <code>SyntaxNode</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SyntaxNode} obj Optional instance to populate.
     * @return {module:model/SyntaxNode} The populated <code>SyntaxNode</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new SyntaxNode();

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return SyntaxNode;
}();
/**
 * @member {String} type
 * @default ''
 */


SyntaxNode.prototype['type'] = '';
var _default = SyntaxNode;
exports["default"] = _default;
},{"../ApiClient":1}],64:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Range = _interopRequireDefault(require("./Range"));

var _SyntaxNode = _interopRequireDefault(require("./SyntaxNode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Token model module.
 * @module model/Token
 * @version 1.0.8
 */
var Token = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Token</code>.
   * @alias module:model/Token
   * @extends module:model/SyntaxNode
   * @implements module:model/SyntaxNode
   * @param type {String} 
   */
  function Token(type) {
    _classCallCheck(this, Token);

    _SyntaxNode["default"].initialize(this, type);

    Token.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Token, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['range'] = range;
      obj['value'] = value || '';
    }
    /**
     * Constructs a <code>Token</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Token} obj Optional instance to populate.
     * @return {module:model/Token} The populated <code>Token</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Token();

        _SyntaxNode["default"].constructFromObject(data, obj);

        _SyntaxNode["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('range')) {
          obj['range'] = _Range["default"].constructFromObject(data['range']);
        }

        if (data.hasOwnProperty('value')) {
          obj['value'] = _ApiClient["default"].convertToType(data['value'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Token;
}();
/**
 * @member {module:model/Range} range
 */


Token.prototype['range'] = undefined;
/**
 * @member {String} value
 * @default ''
 */

Token.prototype['value'] = ''; // Implement SyntaxNode interface:

/**
 * @member {String} type
 * @default ''
 */

_SyntaxNode["default"].prototype['type'] = '';
var _default = Token;
exports["default"] = _default;
},{"../ApiClient":1,"./Range":56,"./SyntaxNode":63}],65:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _LabeledAction = _interopRequireDefault(require("./LabeledAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The Transaction model module.
 * @module model/Transaction
 * @version 1.0.8
 */
var Transaction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>Transaction</code>.
   * @alias module:model/Transaction
   * @param abort {Boolean} 
   * @param dbname {String} 
   * @param mode {module:model/Transaction.ModeEnum} 
   * @param readonly {Boolean} 
   * @param type {module:model/Transaction.TypeEnum} 
   */
  function Transaction(abort, dbname, mode, readonly, type) {
    _classCallCheck(this, Transaction);

    Transaction.initialize(this, abort, dbname, mode, readonly, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(Transaction, null, [{
    key: "initialize",
    value: function initialize(obj, abort, dbname, mode, readonly, type) {
      obj['abort'] = abort || false;
      obj['dbname'] = dbname || '';
      obj['mode'] = mode || 'OPEN';
      obj['readonly'] = readonly || false;
      obj['type'] = type || 'Transaction';
    }
    /**
     * Constructs a <code>Transaction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Transaction} obj Optional instance to populate.
     * @return {module:model/Transaction} The populated <code>Transaction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new Transaction();

        if (data.hasOwnProperty('abort')) {
          obj['abort'] = _ApiClient["default"].convertToType(data['abort'], 'Boolean');
        }

        if (data.hasOwnProperty('actions')) {
          obj['actions'] = _ApiClient["default"].convertToType(data['actions'], [_LabeledAction["default"]]);
        }

        if (data.hasOwnProperty('dbname')) {
          obj['dbname'] = _ApiClient["default"].convertToType(data['dbname'], 'String');
        }

        if (data.hasOwnProperty('debug_level')) {
          obj['debug_level'] = _ApiClient["default"].convertToType(data['debug_level'], 'Number');
        }

        if (data.hasOwnProperty('mode')) {
          obj['mode'] = _ApiClient["default"].convertToType(data['mode'], 'String');
        }

        if (data.hasOwnProperty('readonly')) {
          obj['readonly'] = _ApiClient["default"].convertToType(data['readonly'], 'Boolean');
        }

        if (data.hasOwnProperty('source_dbname')) {
          obj['source_dbname'] = _ApiClient["default"].convertToType(data['source_dbname'], 'String');
        }

        if (data.hasOwnProperty('version')) {
          obj['version'] = _ApiClient["default"].convertToType(data['version'], 'Number');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return Transaction;
}();
/**
 * @member {Boolean} abort
 * @default false
 */


Transaction.prototype['abort'] = false;
/**
 * @member {Array.<module:model/LabeledAction>} actions
 */

Transaction.prototype['actions'] = undefined;
/**
 * @member {String} dbname
 * @default ''
 */

Transaction.prototype['dbname'] = '';
/**
 * @member {Number} debug_level
 */

Transaction.prototype['debug_level'] = undefined;
/**
 * @member {module:model/Transaction.ModeEnum} mode
 * @default 'OPEN'
 */

Transaction.prototype['mode'] = 'OPEN';
/**
 * @member {Boolean} readonly
 * @default false
 */

Transaction.prototype['readonly'] = false;
/**
 * @member {String} source_dbname
 */

Transaction.prototype['source_dbname'] = undefined;
/**
 * @member {Number} version
 */

Transaction.prototype['version'] = undefined;
/**
 * @member {module:model/Transaction.TypeEnum} type
 * @default 'Transaction'
 */

Transaction.prototype['type'] = 'Transaction';
/**
 * Allowed values for the <code>mode</code> property.
 * @enum {String}
 * @readonly
 */

Transaction['ModeEnum'] = {
  /**
   * value: "OPEN"
   * @const
   */
  "OPEN": "OPEN",

  /**
   * value: "CREATE"
   * @const
   */
  "CREATE": "CREATE",

  /**
   * value: "CREATE_OVERWRITE"
   * @const
   */
  "CREATE_OVERWRITE": "CREATE_OVERWRITE",

  /**
   * value: "OPEN_OR_CREATE"
   * @const
   */
  "OPEN_OR_CREATE": "OPEN_OR_CREATE",

  /**
   * value: "CLONE"
   * @const
   */
  "CLONE": "CLONE",

  /**
   * value: "CLONE_OVERWRITE"
   * @const
   */
  "CLONE_OVERWRITE": "CLONE_OVERWRITE"
};
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

Transaction['TypeEnum'] = {
  /**
   * value: "Transaction"
   * @const
   */
  "Transaction": "Transaction"
};
var _default = Transaction;
exports["default"] = _default;
},{"../ApiClient":1,"./LabeledAction":34}],66:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

var _LabeledActionResult = _interopRequireDefault(require("./LabeledActionResult"));

var _Relation = _interopRequireDefault(require("./Relation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The TransactionResult model module.
 * @module model/TransactionResult
 * @version 1.0.8
 */
var TransactionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>TransactionResult</code>.
   * @alias module:model/TransactionResult
   * @param aborted {Boolean} 
   * @param type {module:model/TransactionResult.TypeEnum} 
   */
  function TransactionResult(aborted, type) {
    _classCallCheck(this, TransactionResult);

    TransactionResult.initialize(this, aborted, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(TransactionResult, null, [{
    key: "initialize",
    value: function initialize(obj, aborted, type) {
      obj['aborted'] = aborted || false;
      obj['type'] = type || 'TransactionResult';
    }
    /**
     * Constructs a <code>TransactionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TransactionResult} obj Optional instance to populate.
     * @return {module:model/TransactionResult} The populated <code>TransactionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new TransactionResult();

        if (data.hasOwnProperty('aborted')) {
          obj['aborted'] = _ApiClient["default"].convertToType(data['aborted'], 'Boolean');
        }

        if (data.hasOwnProperty('actions')) {
          obj['actions'] = _ApiClient["default"].convertToType(data['actions'], [_LabeledActionResult["default"]]);
        }

        if (data.hasOwnProperty('debug_level')) {
          obj['debug_level'] = _ApiClient["default"].convertToType(data['debug_level'], 'Number');
        }

        if (data.hasOwnProperty('output')) {
          obj['output'] = _ApiClient["default"].convertToType(data['output'], [_Relation["default"]]);
        }

        if (data.hasOwnProperty('problems')) {
          obj['problems'] = _ApiClient["default"].convertToType(data['problems'], [_AbstractProblem["default"]]);
        }

        if (data.hasOwnProperty('version')) {
          obj['version'] = _ApiClient["default"].convertToType(data['version'], 'Number');
        }

        if (data.hasOwnProperty('type')) {
          obj['type'] = _ApiClient["default"].convertToType(data['type'], 'String');
        }
      }

      return obj;
    }
  }]);

  return TransactionResult;
}();
/**
 * @member {Boolean} aborted
 * @default false
 */


TransactionResult.prototype['aborted'] = false;
/**
 * @member {Array.<module:model/LabeledActionResult>} actions
 */

TransactionResult.prototype['actions'] = undefined;
/**
 * @member {Number} debug_level
 */

TransactionResult.prototype['debug_level'] = undefined;
/**
 * @member {Array.<module:model/Relation>} output
 */

TransactionResult.prototype['output'] = undefined;
/**
 * @member {Array.<module:model/AbstractProblem>} problems
 */

TransactionResult.prototype['problems'] = undefined;
/**
 * @member {Number} version
 */

TransactionResult.prototype['version'] = undefined;
/**
 * @member {module:model/TransactionResult.TypeEnum} type
 * @default 'TransactionResult'
 */

TransactionResult.prototype['type'] = 'TransactionResult';
/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */

TransactionResult['TypeEnum'] = {
  /**
   * value: "TransactionResult"
   * @const
   */
  "TransactionResult": "TransactionResult"
};
var _default = TransactionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4,"./LabeledActionResult":35,"./Relation":58}],67:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _FrontProblem = _interopRequireDefault(require("./FrontProblem"));

var _Range = _interopRequireDefault(require("./Range"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UndefinedError model module.
 * @module model/UndefinedError
 * @version 1.0.8
 */
var UndefinedError = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UndefinedError</code>.
   * @alias module:model/UndefinedError
   * @extends module:model/FrontProblem
   * @implements module:model/FrontProblem
   * @param type {String} 
   */
  function UndefinedError(type) {
    _classCallCheck(this, UndefinedError);

    _FrontProblem["default"].initialize(this, type);

    UndefinedError.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UndefinedError, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['range'] = range;
      obj['var'] = _var || '';
    }
    /**
     * Constructs a <code>UndefinedError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UndefinedError} obj Optional instance to populate.
     * @return {module:model/UndefinedError} The populated <code>UndefinedError</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UndefinedError();

        _FrontProblem["default"].constructFromObject(data, obj);

        _FrontProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('range')) {
          obj['range'] = _Range["default"].constructFromObject(data['range']);
        }

        if (data.hasOwnProperty('var')) {
          obj['var'] = _ApiClient["default"].convertToType(data['var'], 'String');
        }
      }

      return obj;
    }
  }]);

  return UndefinedError;
}();
/**
 * @member {module:model/Range} range
 */


UndefinedError.prototype['range'] = undefined;
/**
 * @member {String} var
 * @default ''
 */

UndefinedError.prototype['var'] = ''; // Implement FrontProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_FrontProblem["default"].prototype['type'] = '';
var _default = UndefinedError;
exports["default"] = _default;
},{"../ApiClient":1,"./FrontProblem":23,"./Range":56}],68:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _Action = _interopRequireDefault(require("./Action"));

var _PairAnyValueAnyValue = _interopRequireDefault(require("./PairAnyValueAnyValue"));

var _RelKey = _interopRequireDefault(require("./RelKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UpdateAction model module.
 * @module model/UpdateAction
 * @version 1.0.8
 */
var UpdateAction = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateAction</code>.
   * @alias module:model/UpdateAction
   * @extends module:model/Action
   * @implements module:model/Action
   * @param type {String} 
   */
  function UpdateAction(type) {
    _classCallCheck(this, UpdateAction);

    _Action["default"].initialize(this, type);

    UpdateAction.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateAction, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['rel'] = rel;
    }
    /**
     * Constructs a <code>UpdateAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateAction} obj Optional instance to populate.
     * @return {module:model/UpdateAction} The populated <code>UpdateAction</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateAction();

        _Action["default"].constructFromObject(data, obj);

        _Action["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('delta')) {
          obj['delta'] = _ApiClient["default"].convertToType(data['delta'], [_PairAnyValueAnyValue["default"]]);
        }

        if (data.hasOwnProperty('rel')) {
          obj['rel'] = _RelKey["default"].constructFromObject(data['rel']);
        }

        if (data.hasOwnProperty('updates')) {
          obj['updates'] = _ApiClient["default"].convertToType(data['updates'], [_PairAnyValueAnyValue["default"]]);
        }
      }

      return obj;
    }
  }]);

  return UpdateAction;
}();
/**
 * @member {Array.<module:model/PairAnyValueAnyValue>} delta
 */


UpdateAction.prototype['delta'] = undefined;
/**
 * @member {module:model/RelKey} rel
 */

UpdateAction.prototype['rel'] = undefined;
/**
 * @member {Array.<module:model/PairAnyValueAnyValue>} updates
 */

UpdateAction.prototype['updates'] = undefined; // Implement Action interface:

/**
 * @member {String} type
 * @default ''
 */

_Action["default"].prototype['type'] = '';
var _default = UpdateAction;
exports["default"] = _default;
},{"../ApiClient":1,"./Action":5,"./PairAnyValueAnyValue":49,"./RelKey":57}],69:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _ActionResult = _interopRequireDefault(require("./ActionResult"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The UpdateActionResult model module.
 * @module model/UpdateActionResult
 * @version 1.0.8
 */
var UpdateActionResult = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>UpdateActionResult</code>.
   * @alias module:model/UpdateActionResult
   * @extends module:model/ActionResult
   * @implements module:model/ActionResult
   * @param type {String} 
   */
  function UpdateActionResult(type) {
    _classCallCheck(this, UpdateActionResult);

    _ActionResult["default"].initialize(this, type);

    UpdateActionResult.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(UpdateActionResult, null, [{
    key: "initialize",
    value: function initialize(obj, type) {}
    /**
     * Constructs a <code>UpdateActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateActionResult} obj Optional instance to populate.
     * @return {module:model/UpdateActionResult} The populated <code>UpdateActionResult</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new UpdateActionResult();

        _ActionResult["default"].constructFromObject(data, obj);

        _ActionResult["default"].constructFromObject(data, obj);
      }

      return obj;
    }
  }]);

  return UpdateActionResult;
}(); // Implement ActionResult interface:

/**
 * @member {String} type
 * @default ''
 */


_ActionResult["default"].prototype['type'] = '';
var _default = UpdateActionResult;
exports["default"] = _default;
},{"../ApiClient":1,"./ActionResult":6}],70:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ApiClient = _interopRequireDefault(require("../ApiClient"));

var _AbstractProblem = _interopRequireDefault(require("./AbstractProblem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * The WorkspaceLoadProblem model module.
 * @module model/WorkspaceLoadProblem
 * @version 1.0.8
 */
var WorkspaceLoadProblem = /*#__PURE__*/function () {
  /**
   * Constructs a new <code>WorkspaceLoadProblem</code>.
   * @alias module:model/WorkspaceLoadProblem
   * @extends module:model/AbstractProblem
   * @implements module:model/AbstractProblem
   * @param type {String} 
   */
  function WorkspaceLoadProblem(type) {
    _classCallCheck(this, WorkspaceLoadProblem);

    _AbstractProblem["default"].initialize(this, type);

    WorkspaceLoadProblem.initialize(this, type);
  }
  /**
   * Initializes the fields of this object.
   * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
   * Only for internal use.
   */


  _createClass(WorkspaceLoadProblem, null, [{
    key: "initialize",
    value: function initialize(obj, type) {
      obj['exception'] = exception || '';
    }
    /**
     * Constructs a <code>WorkspaceLoadProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/WorkspaceLoadProblem} obj Optional instance to populate.
     * @return {module:model/WorkspaceLoadProblem} The populated <code>WorkspaceLoadProblem</code> instance.
     */

  }, {
    key: "constructFromObject",
    value: function constructFromObject(data, obj) {
      if (data) {
        obj = obj || new WorkspaceLoadProblem();

        _AbstractProblem["default"].constructFromObject(data, obj);

        _AbstractProblem["default"].constructFromObject(data, obj);

        if (data.hasOwnProperty('exception')) {
          obj['exception'] = _ApiClient["default"].convertToType(data['exception'], 'String');
        }
      }

      return obj;
    }
  }]);

  return WorkspaceLoadProblem;
}();
/**
 * @member {String} exception
 * @default ''
 */


WorkspaceLoadProblem.prototype['exception'] = ''; // Implement AbstractProblem interface:

/**
 * @member {String} type
 * @default ''
 */

_AbstractProblem["default"].prototype['type'] = '';
var _default = WorkspaceLoadProblem;
exports["default"] = _default;
},{"../ApiClient":1,"./AbstractProblem":4}],71:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],72:[function(require,module,exports){
module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var arr = []
var replacerStack = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(obj, replacer, spacer)
  } else {
    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(tmp, replacer, spacer)
  } else {
    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, stack, val)
        tmp[key] = val[key]
      }
      if (parent !== undefined) {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as [Circular]
function replaceGetterValues (replacer) {
  replacer = replacer !== undefined ? replacer : function (k, v) { return v }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = '[Circular]'
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}

},{}],73:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;

},{}],74:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Root reference for iframes.
 */
var root;

if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}

var Emitter = require('component-emitter');

var safeStringify = require('fast-safe-stringify');

var RequestBase = require('./request-base');

var isObject = require('./is-object');

var ResponseBase = require('./response-base');

var Agent = require('./agent-base');
/**
 * Noop.
 */


function noop() {}
/**
 * Expose `request`.
 */


module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports = module.exports;
var request = exports;
exports.Request = Request;
/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  }

  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (_unused) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (_unused2) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
  } catch (_unused3) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (_unused4) {}

  throw new Error('Browser-only version of superagent could not find XHR');
};
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */


var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};
/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
  }

  return pairs.join('&');
}
/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */


function pushEncodedKeyValuePair(pairs, key, val) {
  if (val === undefined) return;

  if (val === null) {
    pairs.push(encodeURI(key));
    return;
  }

  if (Array.isArray(val)) {
    val.forEach(function (v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  } else if (isObject(val)) {
    for (var subkey in val) {
      if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
    }
  } else {
    pairs.push(encodeURI(key) + '=' + encodeURIComponent(val));
  }
}
/**
 * Expose serialization method.
 */


request.serializeObject = serialize;
/**
 * Parse the given x-www-form-urlencoded `str`.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');

    if (pos === -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}
/**
 * Expose parser.
 */


request.parseString = parseString;
/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};
/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': safeStringify
};
/**
 * Default parsers.
 *
 *     superagent.parse['application/xml'] = function(str){
 *       return { object parsed from str };
 *     };
 *
 */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};
/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');

    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }

    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/.test(mime);
}
/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */


function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

  if (status === 1223) {
    status = 204;
  }

  this._setStatusProperties(status);

  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.

  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

  this._setHeaderProperties(this.header);

  if (this.text === null && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
} // eslint-disable-next-line new-cap


ResponseBase(Response.prototype);
/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function (str) {
  var parse = request.parse[this.type];

  if (this.req._parser) {
    return this.req._parser(this, str);
  }

  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }

  return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;
  return err;
};
/**
 * Expose `Response`.
 */


request.Response = Response;
/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case

  this._header = {}; // coerces header names to lowercase

  this.on('end', function () {
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (err_) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = err_; // issue #675: return the raw response if the response parsing fails

      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);
    var new_err;

    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
      }
    } catch (err_) {
      new_err = err_; // ok() callback can throw
    } // #1000 don't catch errors from the callback to avoid double calling it


    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}
/**
 * Mixin `Emitter` and `RequestBase`.
 */
// eslint-disable-next-line new-cap


Emitter(Request.prototype); // eslint-disable-next-line new-cap

RequestBase(Request.prototype);
/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function (type) {
  this.set('Content-Type', request.types[type] || type);
  return this;
};
/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }

  var encoder = function encoder(string) {
    if (typeof btoa === 'function') {
      return btoa(string);
    }

    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};
/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.query = function (val) {
  if (typeof val !== 'string') val = serialize(val);
  if (val) this._query.push(val);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }

  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }

  return this._formData;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (err, res) {
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */


Request.prototype.crossDomainError = function () {
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;
  err.status = this.status;
  err.method = this.method;
  err.url = this.url;
  this.callback(err);
}; // This only warns, because the request is still likely to work


Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};

Request.prototype.ca = Request.prototype.agent;
Request.prototype.buffer = Request.prototype.ca; // This throws, because it can't send/receive data as expected

Request.prototype.write = function () {
  throw new Error('Streaming is not supported in browser version of superagent');
};

Request.prototype.pipe = Request.prototype.write;
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */

Request.prototype._isHost = function (obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop; // querystring

  this._finalizeQueryString();

  this._end();
};

Request.prototype._setUploadTimeout = function () {
  var self = this; // upload timeout it's wokrs only if deadline timeout is off

  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(function () {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
}; // eslint-disable-next-line complexity


Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var self = this;
  this.xhr = request.getXHR();
  var xhr = this.xhr;
  var data = this._formData || this._data;

  this._setTimeouts(); // state change


  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;

    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (readyState !== 4) {
      return;
    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"


    var status;

    try {
      status = xhr.status;
    } catch (_unused5) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }

    self.emit('end');
  }; // progress


  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;

      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }

    e.direction = direction;
    self.emit('progress', e);
  };

  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (_unused6) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  if (xhr.upload) {
    this._setUploadTimeout();
  } // initiate request


  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  } // CORS


  if (this._withCredentials) xhr.withCredentials = true; // body

  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];

    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

    if (!_serialize && isJSON(contentType)) {
      _serialize = request.serialize['application/json'];
    }

    if (_serialize) data = _serialize(data);
  } // set header fields


  for (var field in this.header) {
    if (this.header[field] === null) continue;
    if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  } // send stuff


  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined

  xhr.send(typeof data === 'undefined' ? null : data);
};

request.agent = function () {
  return new Agent();
};

['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    var req = new request.Request(method, url);

    this._setDefaults(req);

    if (fn) {
      req.end(fn);
    }

    return req;
  };
});
Agent.prototype.del = Agent.prototype.delete;
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var req = request('GET', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.head = function (url, data, fn) {
  var req = request('HEAD', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.options = function (url, data, fn) {
  var req = request('OPTIONS', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


function del(url, data, fn) {
  var req = request('DELETE', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request.del = del;
request.delete = del;
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var req = request('PATCH', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.post = function (url, data, fn) {
  var req = request('POST', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.put = function (url, data, fn) {
  var req = request('PUT', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./agent-base":73,"./is-object":75,"./request-base":76,"./response-base":77,"component-emitter":71,"fast-safe-stringify":72}],75:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

module.exports = isObject;

},{}],76:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in RequestBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) obj[key] = RequestBase.prototype[key];
  }

  return obj;
}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (val) {
  this._responseType = val;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

var ERROR_CODES = ['ECONNRESET', 'ETIMEDOUT', 'EADDRINFO', 'ESOCKETTIMEDOUT'];
/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err_) {
      console.error(err_);
    }
  }

  if (res && res.status && res.status >= 500 && res.status !== 501) return true;

  if (err) {
    if (err.code && ERROR_CODES.includes(err.code)) return true; // Superagent timeout

    if (err.timeout && err.code === 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        if (_this._maxRetries && _this._maxRetries > _this._retries) {
          return;
        }

        if (_this.timedout && _this.timedoutError) {
          reject(_this.timedoutError);
          return;
        }

        var err = new Error('Aborted');
        err.code = 'ABORTED';
        err.status = _this.status;
        err.method = _this.method;
        err.url = _this.url;
        reject(err);
      });
      self.end(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if (typeof cb !== 'function') throw new Error('Callback required');
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function (field, val) {
  if (isObject(field)) {
    for (var key in field) {
      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};
/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, val) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      if (Object.prototype.hasOwnProperty.call(val, i)) this.field(name, val[i]);
    }

    return this;
  } // val should be defined now


  if (val === null || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof val === 'boolean') {
    val = String(val);
  }

  this._getFormData().append(name, val);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) this.req.abort(); // node

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
};
/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObj && isObject(this._data)) {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArr = this.url.slice(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }

      this.url = this.url.slice(0, index) + '?' + queryArr.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var err = new Error("".concat(reason + timeout, "ms exceeded"));
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.timedoutError = err;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":75}],77:[function(require,module,exports){
"use strict";

/**
 * Module dependencies.
 */
var utils = require('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
  return this.header[field.toLowerCase()];
};
/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
};
/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};

},{"./utils":78}],78:[function(require,module,exports){
"use strict";

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (str) {
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (str) {
  return str.split(/ *; */).reduce(function (obj, str) {
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();
    if (key && val) obj[key] = val;
    return obj;
  }, {});
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (str) {
  return str.split(/ *, */).reduce(function (obj, str) {
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};

},{}],79:[function(require,module,exports){
var RaiDbSdk = require('rai_db_sdk');


var api = new RaiDbSdk.DefaultApi()

function createDatabase(dbname, overwrite, callback) {

  var transaction = new RaiDbSdk.Transaction(); // {Transaction} Optional description in *Markdown*
  transaction.mode = overwrite ? RaiDbSdk.Transaction.ModeEnum.CREATE_OVERWRITE : RaiDbSdk.Transaction.ModeEnum.CREATE;
  transaction.dbname = dbname;
  transaction.actions = [];

  // transaction.
  return api.transactionPost(transaction, callback);
}

function runAction(dbname, action, isReadOnly, mode, callback, name) {
  var transaction = new RaiDbSdk.Transaction(); // {Transaction} Optional description in *Markdown*
  transaction.mode = mode;
  transaction.dbname = dbname;
  transaction.readonly = isReadOnly || true;

  var labeledAction = new RaiDbSdk.LabeledAction();
  labeledAction.name = name || 'single';
  labeledAction.action = action;

  transaction.actions = [];
  transaction.actions.push(labeledAction);

  // transaction.
  return api.transactionPost(transaction, function(error, data, response) {
    callback(error, data.actions[0].result, response);
  });
}

function query(dbname, queryString, callback, outputs, inputs, persist, path, name, isReadOnly) {
  var action = new RaiDbSdk.QueryAction();

  action.source = new RaiDbSdk.Source();
  action.source.name = name || "query";
  action.source.path = path || "";
  action.source.value = queryString;

  action.inputs = inputs || [];
  action.outputs = outputs || [];
  action.persist = persist || [];
  action.type = 'QueryAction';

  return runAction(dbname, action, isReadOnly, RaiDbSdk.Transaction.ModeEnum.OPEN, callback);
}

function callback_gen(apiname){
  return function(error, data, response) {
    if (error || (data.problems && data.problems.length > 0)) {
      if(error) {
        console.error(apiname + ' API call error: ' + error);
      } else {
        console.error(apiname + ' API call error: ' + data);
      }
    } else {
      console.log(apiname + ' API called successfully. Returned data: ' + data);
    }
  }
};

function makeDbName(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// dbname = makeDbName(10)
// createDatabase(dbname, false, function(error, data, response) {
//   callback_gen("create_database")(error, data, response);
//   queryString = "def result = 1";
//   outputs = ["result"];
//   query(dbname, queryString, callback_gen("q1"), outputs);
// });

var dbname = "tictactoe_db";

moves = [
  [1,3,"o"],
  [1,2,"x"],
  [1,1,"o"],
  [2,3,"x"],
  [2,2,"o"],
  [3,3,"x"],
  [3,1,"o"],
  [3,2,"x"],
]

var res = []
idx = 0
while(res.length < 1 && idx < moves.length){

  var queryString = `
  ic game_already_has_a_winner{
      not(win(test_board1, "x") or win(test_board1, "o"))
  }

  ic cats_game {
      exists(x y: test_board1(x, y, "-"))
  }
  `;
  query(dbname, queryString, callback_gen("q1"));

  ++idx;
}

var outputs = ["result"];

},{"rai_db_sdk":3}],80:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],81:[function(require,module,exports){

},{}],82:[function(require,module,exports){
(function (Buffer){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } }
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species != null &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayLike(value)
  }

  if (value == null) {
    throw TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
        : (firstByte > 0xBF) ? 2
          : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

}).call(this,require("buffer").Buffer)
},{"base64-js":80,"buffer":82,"ieee754":83}],83:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],84:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],85:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],86:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":84,"./encode":85}]},{},[79]);
