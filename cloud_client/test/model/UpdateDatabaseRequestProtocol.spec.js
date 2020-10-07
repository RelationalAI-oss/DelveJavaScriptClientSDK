/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
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
    factory(root.expect, root.RaiCloudSdk);
  }
}(this, function(expect, RaiCloudSdk) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new RaiCloudSdk.UpdateDatabaseRequestProtocol();
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

  describe('UpdateDatabaseRequestProtocol', function() {
    it('should create an instance of UpdateDatabaseRequestProtocol', function() {
      // uncomment below and update the code to test UpdateDatabaseRequestProtocol
      //var instane = new RaiCloudSdk.UpdateDatabaseRequestProtocol();
      //expect(instance).to.be.a(RaiCloudSdk.UpdateDatabaseRequestProtocol);
    });

    it('should have the property displayName (base name: "display_name")', function() {
      // uncomment below and update the code to test the property displayName
      //var instane = new RaiCloudSdk.UpdateDatabaseRequestProtocol();
      //expect(instance).to.be();
    });

    it('should have the property defaultComputeName (base name: "default_compute_name")', function() {
      // uncomment below and update the code to test the property defaultComputeName
      //var instane = new RaiCloudSdk.UpdateDatabaseRequestProtocol();
      //expect(instance).to.be();
    });

    it('should have the property removeDefaultCompute (base name: "remove_default_compute")', function() {
      // uncomment below and update the code to test the property removeDefaultCompute
      //var instane = new RaiCloudSdk.UpdateDatabaseRequestProtocol();
      //expect(instance).to.be();
    });

    it('should have the property dryrun (base name: "dryrun")', function() {
      // uncomment below and update the code to test the property dryrun
      //var instane = new RaiCloudSdk.UpdateDatabaseRequestProtocol();
      //expect(instance).to.be();
    });

  });

}));