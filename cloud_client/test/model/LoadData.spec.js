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
    instance = new DelveClientSdk.LoadData();
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

  describe('LoadData', function() {
    it('should create an instance of LoadData', function() {
      // uncomment below and update the code to test LoadData
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be.a(DelveClientSdk.LoadData);
    });

    it('should have the property contentType (base name: "content_type")', function() {
      // uncomment below and update the code to test the property contentType
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

    it('should have the property data (base name: "data")', function() {
      // uncomment below and update the code to test the property data
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

    it('should have the property fileSchema (base name: "file_schema")', function() {
      // uncomment below and update the code to test the property fileSchema
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

    it('should have the property fileSyntax (base name: "file_syntax")', function() {
      // uncomment below and update the code to test the property fileSyntax
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

    it('should have the property key (base name: "key")', function() {
      // uncomment below and update the code to test the property key
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

    it('should have the property path (base name: "path")', function() {
      // uncomment below and update the code to test the property path
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new DelveClientSdk.LoadData();
      //expect(instance).to.be();
    });

  });

}));
