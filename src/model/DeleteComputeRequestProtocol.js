/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.1.1
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DeleteComputeRequestProtocol model module.
 * @module model/DeleteComputeRequestProtocol
 * @version 1.1.1
 */
class DeleteComputeRequestProtocol {
    /**
     * Constructs a new <code>DeleteComputeRequestProtocol</code>.
     * @alias module:model/DeleteComputeRequestProtocol
     */
    constructor() { 
        
        DeleteComputeRequestProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DeleteComputeRequestProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DeleteComputeRequestProtocol} obj Optional instance to populate.
     * @return {module:model/DeleteComputeRequestProtocol} The populated <code>DeleteComputeRequestProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DeleteComputeRequestProtocol();

            if (data.hasOwnProperty('compute_name')) {
                obj['compute_name'] = ApiClient.convertToType(data['compute_name'], 'String');
            }
            if (data.hasOwnProperty('dryrun')) {
                obj['dryrun'] = ApiClient.convertToType(data['dryrun'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * @member {String} compute_name
 */
DeleteComputeRequestProtocol.prototype['compute_name'] = undefined;

/**
 * @member {Boolean} dryrun
 */
DeleteComputeRequestProtocol.prototype['dryrun'] = undefined;






export default DeleteComputeRequestProtocol;

