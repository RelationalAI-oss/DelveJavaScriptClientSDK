/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ComputeInfoProtocol from './ComputeInfoProtocol';

/**
 * The CreateComputeResponseProtocol model module.
 * @module model/CreateComputeResponseProtocol
 * @version 1.2.0
 */
class CreateComputeResponseProtocol {
    /**
     * Constructs a new <code>CreateComputeResponseProtocol</code>.
     * @alias module:model/CreateComputeResponseProtocol
     */
    constructor() {

        CreateComputeResponseProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) {
    }

    /**
     * Constructs a <code>CreateComputeResponseProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CreateComputeResponseProtocol} obj Optional instance to populate.
     * @return {module:model/CreateComputeResponseProtocol} The populated <code>CreateComputeResponseProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CreateComputeResponseProtocol();

            if (data.hasOwnProperty('compute')) {
                obj['compute'] = ComputeInfoProtocol.constructFromObject(data['compute']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/ComputeInfoProtocol} compute
 */
CreateComputeResponseProtocol.prototype['compute'] = undefined;






export default CreateComputeResponseProtocol;
