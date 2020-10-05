/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.0.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import DeleteComputeStatus from './DeleteComputeStatus';

/**
 * The DeleteComputeResponseProtocol model module.
 * @module model/DeleteComputeResponseProtocol
 * @version 1.0.7
 */
class DeleteComputeResponseProtocol {
    /**
     * Constructs a new <code>DeleteComputeResponseProtocol</code>.
     * @alias module:model/DeleteComputeResponseProtocol
     */
    constructor() { 
        
        DeleteComputeResponseProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DeleteComputeResponseProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeleteComputeResponseProtocol} obj Optional instance to populate.
     * @return {module:model/DeleteComputeResponseProtocol} The populated <code>DeleteComputeResponseProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeleteComputeResponseProtocol();

            if (data.hasOwnProperty('delete_status')) {
                obj['delete_status'] = DeleteComputeStatus.constructFromObject(data['delete_status']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/DeleteComputeStatus} delete_status
 */
DeleteComputeResponseProtocol.prototype['delete_status'] = undefined;






export default DeleteComputeResponseProtocol;

