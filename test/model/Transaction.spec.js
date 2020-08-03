/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.0
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
    instance = new DelveClientSdk.Transaction();
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

  describe('Transaction', function() {
    it('should create an instance of Transaction', function() {
      // uncomment below and update the code to test Transaction
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be.a(DelveClientSdk.Transaction);
    });

    it('should have the property dbname (base name: "dbname")', function() {
      // uncomment below and update the code to test the property dbname
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be();
    });

    it('should have the property mode (base name: "mode")', function() {
      // uncomment below and update the code to test the property mode
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be();
    });

    it('should have the property readonly (base name: "readonly")', function() {
      // uncomment below and update the code to test the property readonly
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be();
    });

    it('should have the property actions (base name: "actions")', function() {
      // uncomment below and update the code to test the property actions
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be();
    });

    it('should have the property abort (base name: "abort")', function() {
      // uncomment below and update the code to test the property abort
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be();
    });

    it('should have the property objtp (base name: "objtp")', function() {
      // uncomment below and update the code to test the property objtp
      //var instane = new DelveClientSdk.Transaction();
      //expect(instance).to.be();
    });

  });

}));