/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.3
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import ActionResult from './ActionResult';
import CollectProblemsActionAllOf from './CollectProblemsActionAllOf';

/**
 * The InstallActionResult model module.
 * @module model/InstallActionResult
 * @version 1.1.3
 */
class InstallActionResult {
    /**
     * Constructs a new <code>InstallActionResult</code>.
     * @alias module:model/InstallActionResult
     * @extends module:model/ActionResult
     * @implements module:model/ActionResult
     * @implements module:model/CollectProblemsActionAllOf
     * @param type {String} 
     */
    constructor(type) { 
        ActionResult.initialize(this, type);CollectProblemsActionAllOf.initialize(this);
        InstallActionResult.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>InstallActionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/InstallActionResult} obj Optional instance to populate.
     * @return {module:model/InstallActionResult} The populated <code>InstallActionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new InstallActionResult();
            ActionResult.constructFromObject(data, obj);
            ActionResult.constructFromObject(data, obj);
            CollectProblemsActionAllOf.constructFromObject(data, obj);

            if (data.hasOwnProperty('dummy')) {
                obj['dummy'] = ApiClient.convertToType(data['dummy'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} dummy
 */
InstallActionResult.prototype['dummy'] = undefined;


// Implement ActionResult interface:
/**
 * @member {String} type
 * @default ''
 */
ActionResult.prototype['type'] = '';
// Implement CollectProblemsActionAllOf interface:
/**
 * @member {String} dummy
 */
CollectProblemsActionAllOf.prototype['dummy'] = undefined;




export default InstallActionResult;

