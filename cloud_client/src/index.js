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


import ApiClient from './ApiClient';
import ComputeData from './model/ComputeData';
import CreateComputeRequestProtocol from './model/CreateComputeRequestProtocol';
import CreateComputeResponseProtocol from './model/CreateComputeResponseProtocol';
import CreateUserRequestProtocol from './model/CreateUserRequestProtocol';
import CreateUserResponseProtocol from './model/CreateUserResponseProtocol';
import DatabaseInfo from './model/DatabaseInfo';
import DeleteComputeRequestProtocol from './model/DeleteComputeRequestProtocol';
import DeleteComputeResponseProtocol from './model/DeleteComputeResponseProtocol';
import DeleteComputeStatus from './model/DeleteComputeStatus';
import ListComputesResponseProtocol from './model/ListComputesResponseProtocol';
import ListDatabasesResponseProtocol from './model/ListDatabasesResponseProtocol';
import ListUsersResponseProtocol from './model/ListUsersResponseProtocol';
import UpdateDatabaseRequestProtocol from './model/UpdateDatabaseRequestProtocol';
import UserInfoProtocol from './model/UserInfoProtocol';
import DefaultApi from './api/DefaultApi';


/**
* This_is_a_Client_SDK_for_RAI_Cloud.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var RaiCloudSdk = require('index'); // See note below*.
* var xxxSvc = new RaiCloudSdk.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new RaiCloudSdk.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new RaiCloudSdk.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new RaiCloudSdk.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.8
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The ComputeData model constructor.
     * @property {module:model/ComputeData}
     */
    ComputeData,

    /**
     * The CreateComputeRequestProtocol model constructor.
     * @property {module:model/CreateComputeRequestProtocol}
     */
    CreateComputeRequestProtocol,

    /**
     * The CreateComputeResponseProtocol model constructor.
     * @property {module:model/CreateComputeResponseProtocol}
     */
    CreateComputeResponseProtocol,

    /**
     * The CreateUserRequestProtocol model constructor.
     * @property {module:model/CreateUserRequestProtocol}
     */
    CreateUserRequestProtocol,

    /**
     * The CreateUserResponseProtocol model constructor.
     * @property {module:model/CreateUserResponseProtocol}
     */
    CreateUserResponseProtocol,

    /**
     * The DatabaseInfo model constructor.
     * @property {module:model/DatabaseInfo}
     */
    DatabaseInfo,

    /**
     * The DeleteComputeRequestProtocol model constructor.
     * @property {module:model/DeleteComputeRequestProtocol}
     */
    DeleteComputeRequestProtocol,

    /**
     * The DeleteComputeResponseProtocol model constructor.
     * @property {module:model/DeleteComputeResponseProtocol}
     */
    DeleteComputeResponseProtocol,

    /**
     * The DeleteComputeStatus model constructor.
     * @property {module:model/DeleteComputeStatus}
     */
    DeleteComputeStatus,

    /**
     * The ListComputesResponseProtocol model constructor.
     * @property {module:model/ListComputesResponseProtocol}
     */
    ListComputesResponseProtocol,

    /**
     * The ListDatabasesResponseProtocol model constructor.
     * @property {module:model/ListDatabasesResponseProtocol}
     */
    ListDatabasesResponseProtocol,

    /**
     * The ListUsersResponseProtocol model constructor.
     * @property {module:model/ListUsersResponseProtocol}
     */
    ListUsersResponseProtocol,

    /**
     * The UpdateDatabaseRequestProtocol model constructor.
     * @property {module:model/UpdateDatabaseRequestProtocol}
     */
    UpdateDatabaseRequestProtocol,

    /**
     * The UserInfoProtocol model constructor.
     * @property {module:model/UserInfoProtocol}
     */
    UserInfoProtocol,

    /**
    * The DefaultApi service constructor.
    * @property {module:api/DefaultApi}
    */
    DefaultApi
};
