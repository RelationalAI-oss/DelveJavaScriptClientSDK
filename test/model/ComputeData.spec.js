/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
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
    factory(root.expect, root.RaiCloudSdk);
  }
}(this, function(expect, RaiCloudSdk) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new RaiCloudSdk.ComputeData();
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

  describe('ComputeData', function() {
    it('should create an instance of ComputeData', function() {
      // uncomment below and update the code to test ComputeData
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be.a(RaiCloudSdk.ComputeData);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property getEtag (base name: "get_etag")', function() {
      // uncomment below and update the code to test the property getEtag
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property accountName (base name: "accountName")', function() {
      // uncomment below and update the code to test the property accountName
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property computeId (base name: "computeId")', function() {
      // uncomment below and update the code to test the property computeId
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property createdBy (base name: "createdBy")', function() {
      // uncomment below and update the code to test the property createdBy
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property computeName (base name: "computeName")', function() {
      // uncomment below and update the code to test the property computeName
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property computeSize (base name: "computeSize")', function() {
      // uncomment below and update the code to test the property computeSize
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property computeRegion (base name: "computeRegion")', function() {
      // uncomment below and update the code to test the property computeRegion
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property infrastructure (base name: "infrastructure")', function() {
      // uncomment below and update the code to test the property infrastructure
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property computeState (base name: "computeState")', function() {
      // uncomment below and update the code to test the property computeState
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property requestedOn (base name: "requestedOn")', function() {
      // uncomment below and update the code to test the property requestedOn
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property createdOn (base name: "createdOn")', function() {
      // uncomment below and update the code to test the property createdOn
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property deletedOn (base name: "deletedOn")', function() {
      // uncomment below and update the code to test the property deletedOn
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

    it('should have the property message (base name: "message")', function() {
      // uncomment below and update the code to test the property message
      //var instane = new RaiCloudSdk.ComputeData();
      //expect(instance).to.be();
    });

  });

}));
