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
    instance = new RaiCloudSdk.DefaultApi();
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

  describe('DefaultApi', function() {
    describe('accountCreditsGet', function() {
      it('should call accountCreditsGet successfully', function(done) {
        //uncomment below and update the code to test accountCreditsGet
        //instance.accountCreditsGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('computeDelete', function() {
      it('should call computeDelete successfully', function(done) {
        //uncomment below and update the code to test computeDelete
        //instance.computeDelete(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('computeGet', function() {
      it('should call computeGet successfully', function(done) {
        //uncomment below and update the code to test computeGet
        //instance.computeGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('computePut', function() {
      it('should call computePut successfully', function(done) {
        //uncomment below and update the code to test computePut
        //instance.computePut(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('databaseGet', function() {
      it('should call databaseGet successfully', function(done) {
        //uncomment below and update the code to test databaseGet
        //instance.databaseGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('databasePost', function() {
      it('should call databasePost successfully', function(done) {
        //uncomment below and update the code to test databasePost
        //instance.databasePost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listComputeEvents', function() {
      it('should call listComputeEvents successfully', function(done) {
        //uncomment below and update the code to test listComputeEvents
        //instance.listComputeEvents(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('userGet', function() {
      it('should call userGet successfully', function(done) {
        //uncomment below and update the code to test userGet
        //instance.userGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('userPut', function() {
      it('should call userPut successfully', function(done) {
        //uncomment below and update the code to test userPut
        //instance.userPut(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
