/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.8
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
import CollectProblemsActionResultAllOf from './CollectProblemsActionResultAllOf';

/**
 * The ParseActionResult model module.
 * @module model/ParseActionResult
 * @version 1.1.8
 */
class ParseActionResult {
    /**
     * Constructs a new <code>ParseActionResult</code>.
     * @alias module:model/ParseActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @implements module:model/CollectProblemsActionResultAllOf
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);CollectProblemsActionResultAllOf.initialize(this);
        ParseActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>ParseActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ParseActionResult} obj Optional instance to populate.
     * @return {module:model/ParseActionResult} The populated <code>ParseActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ParseActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);
            CollectProblemsActionResultAllOf.constructFromObject(data, obj);

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
ParseActionResult.prototype['problems'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';
// Implement CollectProblemsActionResultAllOf interface:
/**
 * @member {Array.<module:model/AbstractProblem>} problems
 */
CollectProblemsActionResultAllOf.prototype['problems'] = undefined;




export default ParseActionResult;

