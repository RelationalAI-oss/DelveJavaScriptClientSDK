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
    instance = new RaiCloudSdk.UserInfoProtocol();
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

  describe('UserInfoProtocol', function() {
    it('should create an instance of UserInfoProtocol', function() {
      // uncomment below and update the code to test UserInfoProtocol
      //var instane = new RaiCloudSdk.UserInfoProtocol();
      //expect(instance).to.be.a(RaiCloudSdk.UserInfoProtocol);
    });

    it('should have the property accountName (base name: "account_name")', function() {
      // uncomment below and update the code to test the property accountName
      //var instane = new RaiCloudSdk.UserInfoProtocol();
      //expect(instance).to.be();
    });

    it('should have the property username (base name: "username")', function() {
      // uncomment below and update the code to test the property username
      //var instane = new RaiCloudSdk.UserInfoProtocol();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instane = new RaiCloudSdk.UserInfoProtocol();
      //expect(instance).to.be();
    });

    it('should have the property accessKey1 (base name: "access_key1")', function() {
      // uncomment below and update the code to test the property accessKey1
      //var instane = new RaiCloudSdk.UserInfoProtocol();
      //expect(instance).to.be();
    });

    it('should have the property createdBy (base name: "created_by")', function() {
      // uncomment below and update the code to test the property createdBy
      //var instane = new RaiCloudSdk.UserInfoProtocol();
      //expect(instance).to.be();
    });

  });

}));
