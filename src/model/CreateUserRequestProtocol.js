/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.0.6
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The CreateUserRequestProtocol model module.
 * @module model/CreateUserRequestProtocol
 * @version 1.0.6
 */
class CreateUserRequestProtocol {
    /**
     * Constructs a new <code>CreateUserRequestProtocol</code>.
     * @alias module:model/CreateUserRequestProtocol
     */
    constructor() { 
        
        CreateUserRequestProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CreateUserRequestProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreateUserRequestProtocol} obj Optional instance to populate.
     * @return {module:model/CreateUserRequestProtocol} The populated <code>CreateUserRequestProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreateUserRequestProtocol();

            if (data.hasOwnProperty('username')) {
                obj['username'] = ApiClient.convertToType(data['username'], 'String');
            }
            if (data.hasOwnProperty('dryrun')) {
                obj['dryrun'] = ApiClient.convertToType(data['dryrun'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * @member {String} username
 */
CreateUserRequestProtocol.prototype['username'] = undefined;

/**
 * @member {Boolean} dryrun
 */
CreateUserRequestProtocol.prototype['dryrun'] = undefined;






export default CreateUserRequestProtocol;

