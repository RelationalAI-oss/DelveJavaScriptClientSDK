/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.2
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ActionResult from './ActionResult';

/**
 * The StatusActionResult model module.
 * @module model/StatusActionResult
 * @version 1.1.2
 */
class StatusActionResult {
    /**
     * Constructs a new <code>StatusActionResult</code>.
     * @alias module:model/StatusActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);
        StatusActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>StatusActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StatusActionResult} obj Optional instance to populate.
     * @return {module:model/StatusActionResult} The populated <code>StatusActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StatusActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);

        }
        return obj;
    }


}


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';




export default StatusActionResult;

