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
    instance = new RaiDbSdk.AzureIntegrationAllOf();
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

  describe('AzureIntegrationAllOf', function() {
    it('should create an instance of AzureIntegrationAllOf', function() {
      // uncomment below and update the code to test AzureIntegrationAllOf
      //var instane = new RaiDbSdk.AzureIntegrationAllOf();
      //expect(instance).to.be.a(RaiDbSdk.AzureIntegrationAllOf);
    });

    it('should have the property credentials (base name: "credentials")', function() {
      // uncomment below and update the code to test the property credentials
      //var instane = new RaiDbSdk.AzureIntegrationAllOf();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new RaiDbSdk.AzureIntegrationAllOf();
      //expect(instance).to.be();
    });

    it('should have the property storageAllowedLocations (base name: "storage_allowed_locations")', function() {
      // uncomment below and update the code to test the property storageAllowedLocations
      //var instane = new RaiDbSdk.AzureIntegrationAllOf();
      //expect(instance).to.be();
    });

    it('should have the property storageBlockedLocations (base name: "storage_blocked_locations")', function() {
      // uncomment below and update the code to test the property storageBlockedLocations
      //var instane = new RaiDbSdk.AzureIntegrationAllOf();
      //expect(instance).to.be();
    });

    it('should have the property tenantId (base name: "tenant_id")', function() {
      // uncomment below and update the code to test the property tenantId
      //var instane = new RaiDbSdk.AzureIntegrationAllOf();
      //expect(instance).to.be();
    });

  });

}));
