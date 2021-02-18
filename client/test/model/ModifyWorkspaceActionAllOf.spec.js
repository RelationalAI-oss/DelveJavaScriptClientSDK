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
    instance = new RaiDbSdk.ModifyWorkspaceActionAllOf();
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

  describe('ModifyWorkspaceActionAllOf', function() {
    it('should create an instance of ModifyWorkspaceActionAllOf', function() {
      // uncomment below and update the code to test ModifyWorkspaceActionAllOf
      //var instane = new RaiDbSdk.ModifyWorkspaceActionAllOf();
      //expect(instance).to.be.a(RaiDbSdk.ModifyWorkspaceActionAllOf);
    });

    it('should have the property deleteEdb (base name: "delete_edb")', function() {
      // uncomment below and update the code to test the property deleteEdb
      //var instane = new RaiDbSdk.ModifyWorkspaceActionAllOf();
      //expect(instance).to.be();
    });

    it('should have the property deleteSource (base name: "delete_source")', function() {
      // uncomment below and update the code to test the property deleteSource
      //var instane = new RaiDbSdk.ModifyWorkspaceActionAllOf();
      //expect(instance).to.be();
    });

    it('should have the property enableLibrary (base name: "enable_library")', function() {
      // uncomment below and update the code to test the property enableLibrary
      //var instane = new RaiDbSdk.ModifyWorkspaceActionAllOf();
      //expect(instance).to.be();
    });

  });

}));
