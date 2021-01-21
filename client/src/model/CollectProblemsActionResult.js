/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AbstractProblem from './AbstractProblem';
import ActionResult from './ActionResult';

/**
 * The CollectProblemsActionResult model module.
 * @module model/CollectProblemsActionResult
 * @version 1.1.7
 */
class CollectProblemsActionResult {
    /**
     * Constructs a new <code>CollectProblemsActionResult</code>.
     * @alias module:model/CollectProblemsActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);
        CollectProblemsActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>CollectProblemsActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CollectProblemsActionResult} obj Optional instance to populate.
     * @return {module:model/CollectProblemsActionResult} The populated <code>CollectProblemsActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CollectProblemsActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);

            if (data.hasOwnProperty('problems')) {
                obj['problems'] = ApiClient.convertToType(data['problems'], [AbstractProblem]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/AbstractProblem>} problems
 */
CollectProblemsActionResult.prototype['problems'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';




export default CollectProblemsActionResult;

