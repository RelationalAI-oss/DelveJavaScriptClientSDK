/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.RaiDbSdk);
  }
}(this, function(expect, RaiDbSdk) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new RaiDbSdk.SetOptionsAction();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('SetOptionsAction', function() {
    it('should create an instance of SetOptionsAction', function() {
      // uncomment below and update the code to test SetOptionsAction
      //var instane = new RaiDbSdk.SetOptionsAction();
      //expect(instance).to.be.a(RaiDbSdk.SetOptionsAction);
    });

    it('should have the property abortOnError (base name: "abort_on_error")', function() {
      // uncomment below and update the code to test the property abortOnError
      //var instance = new RaiDbSdk.SetOptionsAction();
      //expect(instance).to.be();
    });

    it('should have the property debug (base name: "debug")', function() {
      // uncomment below and update the code to test the property debug
      //var instance = new RaiDbSdk.SetOptionsAction();
      //expect(instance).to.be();
    });

    it('should have the property debugTrace (base name: "debug_trace")', function() {
      // uncomment below and update the code to test the property debugTrace
      //var instance = new RaiDbSdk.SetOptionsAction();
      //expect(instance).to.be();
    });

    it('should have the property silent (base name: "silent")', function() {
      // uncomment below and update the code to test the property silent
      //var instance = new RaiDbSdk.SetOptionsAction();
      //expect(instance).to.be();
    });

  });

}));
