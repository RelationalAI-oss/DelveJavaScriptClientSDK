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
    instance = new DelveClientSdk.LoadDataAction();
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

  describe('LoadDataAction', function() {
    it('should create an instance of LoadDataAction', function() {
      // uncomment below and update the code to test LoadDataAction
      //var instane = new DelveClientSdk.LoadDataAction();
      //expect(instance).to.be.a(DelveClientSdk.LoadDataAction);
    });

    it('should have the property rel (base name: "rel")', function() {
      // uncomment below and update the code to test the property rel
      //var instane = new DelveClientSdk.LoadDataAction();
      //expect(instance).to.be();
    });

    it('should have the property value (base name: "value")', function() {
      // uncomment below and update the code to test the property value
      //var instane = new DelveClientSdk.LoadDataAction();
      //expect(instance).to.be();
    });

  });

}));
