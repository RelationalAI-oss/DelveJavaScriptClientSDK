/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.0.1
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ComputeData from './ComputeData';

/**
 * The ListComputesResponseProtocol model module.
 * @module model/ListComputesResponseProtocol
 * @version 1.0.1
 */
class ListComputesResponseProtocol {
    /**
     * Constructs a new <code>ListComputesResponseProtocol</code>.
     * @alias module:model/ListComputesResponseProtocol
     */
    constructor() { 
        
        ListComputesResponseProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ListComputesResponseProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListComputesResponseProtocol} obj Optional instance to populate.
     * @return {module:model/ListComputesResponseProtocol} The populated <code>ListComputesResponseProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ListComputesResponseProtocol();

            if (data.hasOwnProperty('compute_requests_list')) {
                obj['compute_requests_list'] = ApiClient.convertToType(data['compute_requests_list'], [ComputeData]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/ComputeData>} compute_requests_list
 */
ListComputesResponseProtocol.prototype['compute_requests_list'] = undefined;






export default ListComputesResponseProtocol;

