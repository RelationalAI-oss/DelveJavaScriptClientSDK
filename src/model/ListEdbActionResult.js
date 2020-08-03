/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ActionResult from './ActionResult';
import RelKey from './RelKey';

/**
 * The ListEdbActionResult model module.
 * @module model/ListEdbActionResult
 * @version 1.0.0
 */
class ListEdbActionResult {
    /**
     * Constructs a new <code>ListEdbActionResult</code>.
     * @alias module:model/ListEdbActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @param objtp {String} 
     */
    constructor(objtp) { 
        ActionResult.initialize(this, objtp);
        ListEdbActionResult.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
    }

    /**
     * Constructs a <code>ListEdbActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListEdbActionResult} obj Optional instance to populate.
     * @return {module:model/ListEdbActionResult} The populated <code>ListEdbActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ListEdbActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);

            if (data.hasOwnProperty('rels')) {
                obj['rels'] = ApiClient.convertToType(data['rels'], [RelKey]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/RelKey>} rels
 */
ListEdbActionResult.prototype['rels'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} objtp
 * @default ''
 */
ActionResult.prototype['objtp'] = '';




export default ListEdbActionResult;

