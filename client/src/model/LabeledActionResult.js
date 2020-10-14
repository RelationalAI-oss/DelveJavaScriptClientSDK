/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.10
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
 * The LabeledActionResult model module.
 * @module model/LabeledActionResult
 * @version 1.0.10
 */
class LabeledActionResult {
    /**
     * Constructs a new <code>LabeledActionResult</code>.
     * @alias module:model/LabeledActionResult
     * @param name {String} 
     * @param result {module:model/ActionResult} 
     * @param type {module:model/LabeledActionResult.TypeEnum} 
     */
    constructor(name, result, type) { 
        
        LabeledActionResult.initialize(this, name, result, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, result, type) { 
        obj['name'] = name || '';
        obj['result'] = result;
        obj['type'] = type || 'LabeledActionResult';
    }

    /**
     * Constructs a <code>LabeledActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LabeledActionResult} obj Optional instance to populate.
     * @return {module:model/LabeledActionResult} The populated <code>LabeledActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LabeledActionResult();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('result')) {
                obj['result'] = ActionResult.constructFromObject(data['result']);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} name
 * @default ''
 */
LabeledActionResult.prototype['name'] = '';

/**
 * @member {module:model/ActionResult} result
 */
LabeledActionResult.prototype['result'] = undefined;

/**
 * @member {module:model/LabeledActionResult.TypeEnum} type
 * @default 'LabeledActionResult'
 */
LabeledActionResult.prototype['type'] = 'LabeledActionResult';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
LabeledActionResult['TypeEnum'] = {

    /**
     * value: "LabeledActionResult"
     * @const
     */
    "LabeledActionResult": "LabeledActionResult"
};



export default LabeledActionResult;

