/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.0
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
    instance = new DelveClientSdk.AzureIntegration();
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

  describe('AzureIntegration', function() {
    it('should create an instance of AzureIntegration', function() {
      // uncomment below and update the code to test AzureIntegration
      //var instane = new DelveClientSdk.AzureIntegration();
      //expect(instance).to.be.a(DelveClientSdk.AzureIntegration);
    });

    it('should have the property credentials (base name: "credentials")', function() {
      // uncomment below and update the code to test the property credentials
      //var instane = new DelveClientSdk.AzureIntegration();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new DelveClientSdk.AzureIntegration();
      //expect(instance).to.be();
    });

    it('should have the property storageAllowedLocations (base name: "storage_allowed_locations")', function() {
      // uncomment below and update the code to test the property storageAllowedLocations
      //var instane = new DelveClientSdk.AzureIntegration();
      //expect(instance).to.be();
    });

    it('should have the property storageBlockedLocations (base name: "storage_blocked_locations")', function() {
      // uncomment below and update the code to test the property storageBlockedLocations
      //var instane = new DelveClientSdk.AzureIntegration();
      //expect(instance).to.be();
    });

    it('should have the property tenantId (base name: "tenant_id")', function() {
      // uncomment below and update the code to test the property tenantId
      //var instane = new DelveClientSdk.AzureIntegration();
      //expect(instance).to.be();
    });

  });

}));