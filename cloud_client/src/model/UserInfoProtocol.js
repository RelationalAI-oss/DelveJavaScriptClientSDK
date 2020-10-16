/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.0.11
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The UserInfoProtocol model module.
 * @module model/UserInfoProtocol
 * @version 1.0.11
 */
class UserInfoProtocol {
    /**
     * Constructs a new <code>UserInfoProtocol</code>.
     * @alias module:model/UserInfoProtocol
     */
    constructor() { 
        
        UserInfoProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UserInfoProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserInfoProtocol} obj Optional instance to populate.
     * @return {module:model/UserInfoProtocol} The populated <code>UserInfoProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserInfoProtocol();

            if (data.hasOwnProperty('account_name')) {
                obj['account_name'] = ApiClient.convertToType(data['account_name'], 'String');
            }
            if (data.hasOwnProperty('username')) {
                obj['username'] = ApiClient.convertToType(data['username'], 'String');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('access_key1')) {
                obj['access_key1'] = ApiClient.convertToType(data['access_key1'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} account_name
 */
UserInfoProtocol.prototype['account_name'] = undefined;

/**
 * @member {String} username
 */
UserInfoProtocol.prototype['username'] = undefined;

/**
 * @member {String} status
 */
UserInfoProtocol.prototype['status'] = undefined;

/**
 * @member {String} access_key1
 */
UserInfoProtocol.prototype['access_key1'] = undefined;






export default UserInfoProtocol;

