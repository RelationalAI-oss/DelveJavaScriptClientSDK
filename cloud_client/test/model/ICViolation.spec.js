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
    instance = new DelveClientSdk.ICViolation();
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

  describe('ICViolation', function() {
    it('should create an instance of ICViolation', function() {
      // uncomment below and update the code to test ICViolation
      //var instane = new DelveClientSdk.ICViolation();
      //expect(instance).to.be.a(DelveClientSdk.ICViolation);
    });

    it('should have the property relKey (base name: "rel_key")', function() {
      // uncomment below and update the code to test the property relKey
      //var instane = new DelveClientSdk.ICViolation();
      //expect(instance).to.be();
    });

    it('should have the property source (base name: "source")', function() {
      // uncomment below and update the code to test the property source
      //var instane = new DelveClientSdk.ICViolation();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new DelveClientSdk.ICViolation();
      //expect(instance).to.be();
    });

  });

}));
