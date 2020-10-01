/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.5
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
 * The ModifyWorkspaceActionResult model module.
 * @module model/ModifyWorkspaceActionResult
 * @version 1.0.5
 */
class ModifyWorkspaceActionResult {
    /**
     * Constructs a new <code>ModifyWorkspaceActionResult</code>.
     * @alias module:model/ModifyWorkspaceActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);
        ModifyWorkspaceActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>ModifyWorkspaceActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModifyWorkspaceActionResult} obj Optional instance to populate.
     * @return {module:model/ModifyWorkspaceActionResult} The populated <code>ModifyWorkspaceActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ModifyWorkspaceActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);

            if (data.hasOwnProperty('delete_edb_result')) {
                obj['delete_edb_result'] = ApiClient.convertToType(data['delete_edb_result'], [RelKey]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/RelKey>} delete_edb_result
 */
ModifyWorkspaceActionResult.prototype['delete_edb_result'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';




export default ModifyWorkspaceActionResult;

