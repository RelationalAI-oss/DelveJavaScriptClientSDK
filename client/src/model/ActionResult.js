/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
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

/**
 * The ActionResult model module.
 * @module model/ActionResult
 * @version 1.2.0
 */
class ActionResult {
    /**
     * Constructs a new <code>ActionResult</code>.
     * @alias module:model/ActionResult
     * @param type {String} 
     */
    constructor(type) { 
        
        ActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['type'] = type || '';
    }

    /**
     * Constructs a <code>ActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ActionResult} obj Optional instance to populate.
     * @return {module:model/ActionResult} The populated <code>ActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ActionResult();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
                obj = ApiClient.convertToType(data, obj['type'])
            }
        }
        return obj;
    }


}

/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';






export default ActionResult;

