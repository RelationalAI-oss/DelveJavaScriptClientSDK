/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.4
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
 * The CardinalityActionResult model module.
 * @module model/CardinalityActionResult
 * @version 1.0.4
 */
class CardinalityActionResult {
    /**
     * Constructs a new <code>CardinalityActionResult</code>.
     * @alias module:model/CardinalityActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);
        CardinalityActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>CardinalityActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardinalityActionResult} obj Optional instance to populate.
     * @return {module:model/CardinalityActionResult} The populated <code>CardinalityActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CardinalityActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);

            if (data.hasOwnProperty('result')) {
                obj['result'] = ApiClient.convertToType(data['result'], [Relation]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/Relation>} result
 */
CardinalityActionResult.prototype['result'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';




export default CardinalityActionResult;

