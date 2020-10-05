/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.8
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ActionResult from './ActionResult';
import Relation from './Relation';

/**
 * The QueryActionResult model module.
 * @module model/QueryActionResult
 * @version 1.0.8
 */
class QueryActionResult {
    /**
     * Constructs a new <code>QueryActionResult</code>.
     * @alias module:model/QueryActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);
        QueryActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>QueryActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QueryActionResult} obj Optional instance to populate.
     * @return {module:model/QueryActionResult} The populated <code>QueryActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new QueryActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);

            if (data.hasOwnProperty('output')) {
                obj['output'] = ApiClient.convertToType(data['output'], [Relation]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/Relation>} output
 */
QueryActionResult.prototype['output'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';




export default QueryActionResult;

