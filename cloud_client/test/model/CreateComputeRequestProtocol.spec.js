/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.4.0
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
    instance = new RaiCloudSdk.CreateComputeRequestProtocol();
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

  describe('CreateComputeRequestProtocol', function() {
    it('should create an instance of CreateComputeRequestProtocol', function() {
      // uncomment below and update the code to test CreateComputeRequestProtocol
      //var instane = new RaiCloudSdk.CreateComputeRequestProtocol();
      //expect(instance).to.be.a(RaiCloudSdk.CreateComputeRequestProtocol);
    });

    it('should have the property region (base name: "region")', function() {
      // uncomment below and update the code to test the property region
      //var instane = new RaiCloudSdk.CreateComputeRequestProtocol();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new RaiCloudSdk.CreateComputeRequestProtocol();
      //expect(instance).to.be();
    });

    it('should have the property size (base name: "size")', function() {
      // uncomment below and update the code to test the property size
      //var instane = new RaiCloudSdk.CreateComputeRequestProtocol();
      //expect(instance).to.be();
    });

    it('should have the property dryrun (base name: "dryrun")', function() {
      // uncomment below and update the code to test the property dryrun
      //var instane = new RaiCloudSdk.CreateComputeRequestProtocol();
      //expect(instance).to.be();
    });

  });

}));
