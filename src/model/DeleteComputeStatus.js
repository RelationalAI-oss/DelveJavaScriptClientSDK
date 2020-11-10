/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.3.1
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DeleteComputeStatus model module.
 * @module model/DeleteComputeStatus
 * @version 1.3.1
 */
class DeleteComputeStatus {
    /**
     * Constructs a new <code>DeleteComputeStatus</code>.
     * @alias module:model/DeleteComputeStatus
     */
    constructor() { 
        
        DeleteComputeStatus.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DeleteComputeStatus</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeleteComputeStatus} obj Optional instance to populate.
     * @return {module:model/DeleteComputeStatus} The populated <code>DeleteComputeStatus</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeleteComputeStatus();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('state')) {
                obj['state'] = ApiClient.convertToType(data['state'], 'String');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} name
 */
DeleteComputeStatus.prototype['name'] = undefined;

/**
 * @member {String} state
 */
DeleteComputeStatus.prototype['state'] = undefined;

/**
 * @member {String} message
 */
DeleteComputeStatus.prototype['message'] = undefined;






export default DeleteComputeStatus;

