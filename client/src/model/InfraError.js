/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.13
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The InfraError model module.
 * @module model/InfraError
 * @version 1.0.13
 */
class InfraError {
    /**
     * Constructs a new <code>InfraError</code>.
     * @alias module:model/InfraError
     * @param status {String} 
     * @param message {String} 
     */
    constructor(status, message) { 
        
        InfraError.initialize(this, status, message);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, status, message) { 
        obj['status'] = status;
        obj['message'] = message;
    }

    /**
     * Constructs a <code>InfraError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InfraError} obj Optional instance to populate.
     * @return {module:model/InfraError} The populated <code>InfraError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InfraError();

            if (data.hasOwnProperty('status')) {
                obj['status'] = ApiClient.convertToType(data['status'], 'String');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} status
 */
InfraError.prototype['status'] = undefined;

/**
 * @member {String} message
 */
InfraError.prototype['message'] = undefined;






export default InfraError;

