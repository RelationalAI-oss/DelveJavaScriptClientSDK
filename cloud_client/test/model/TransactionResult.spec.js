/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.8
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
    factory(root.expect, root.DelveClientSdk);
  }
}(this, function(expect, DelveClientSdk) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new DelveClientSdk.TransactionResult();
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

  describe('TransactionResult', function() {
    it('should create an instance of TransactionResult', function() {
      // uncomment below and update the code to test TransactionResult
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be.a(DelveClientSdk.TransactionResult);
    });

    it('should have the property aborted (base name: "aborted")', function() {
      // uncomment below and update the code to test the property aborted
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

    it('should have the property actions (base name: "actions")', function() {
      // uncomment below and update the code to test the property actions
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

    it('should have the property debugLevel (base name: "debug_level")', function() {
      // uncomment below and update the code to test the property debugLevel
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

    it('should have the property output (base name: "output")', function() {
      // uncomment below and update the code to test the property output
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

    it('should have the property problems (base name: "problems")', function() {
      // uncomment below and update the code to test the property problems
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

    it('should have the property version (base name: "version")', function() {
      // uncomment below and update the code to test the property version
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new DelveClientSdk.TransactionResult();
      //expect(instance).to.be();
    });

  });

}));
