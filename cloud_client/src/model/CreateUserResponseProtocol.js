/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.0.10
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import UserInfoProtocol from './UserInfoProtocol';

/**
 * The CreateUserResponseProtocol model module.
 * @module model/CreateUserResponseProtocol
 * @version 1.0.10
 */
class CreateUserResponseProtocol {
    /**
     * Constructs a new <code>CreateUserResponseProtocol</code>.
     * @alias module:model/CreateUserResponseProtocol
     */
    constructor() { 
        
        CreateUserResponseProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CreateUserResponseProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreateUserResponseProtocol} obj Optional instance to populate.
     * @return {module:model/CreateUserResponseProtocol} The populated <code>CreateUserResponseProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreateUserResponseProtocol();

            if (data.hasOwnProperty('user')) {
                obj['user'] = UserInfoProtocol.constructFromObject(data['user']);
            }
            if (data.hasOwnProperty('private_key')) {
                obj['private_key'] = ApiClient.convertToType(data['private_key'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/UserInfoProtocol} user
 */
CreateUserResponseProtocol.prototype['user'] = undefined;

/**
 * @member {String} private_key
 */
CreateUserResponseProtocol.prototype['private_key'] = undefined;






export default CreateUserResponseProtocol;

