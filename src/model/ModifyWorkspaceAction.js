/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.3
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Action from './Action';

/**
 * The ModifyWorkspaceAction model module.
 * @module model/ModifyWorkspaceAction
 * @version 1.0.3
 */
class ModifyWorkspaceAction {
    /**
     * Constructs a new <code>ModifyWorkspaceAction</code>.
     * @alias module:model/ModifyWorkspaceAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        ModifyWorkspaceAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>ModifyWorkspaceAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModifyWorkspaceAction} obj Optional instance to populate.
     * @return {module:model/ModifyWorkspaceAction} The populated <code>ModifyWorkspaceAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ModifyWorkspaceAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('delete_edb')) {
                obj['delete_edb'] = ApiClient.convertToType(data['delete_edb'], 'String');
            }
            if (data.hasOwnProperty('delete_source')) {
                obj['delete_source'] = ApiClient.convertToType(data['delete_source'], ['String']);
            }
            if (data.hasOwnProperty('enable_library')) {
                obj['enable_library'] = ApiClient.convertToType(data['enable_library'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} delete_edb
 */
ModifyWorkspaceAction.prototype['delete_edb'] = undefined;

/**
 * @member {Array.<String>} delete_source
 */
ModifyWorkspaceAction.prototype['delete_source'] = undefined;

/**
 * @member {String} enable_library
 */
ModifyWorkspaceAction.prototype['enable_library'] = undefined;


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default ModifyWorkspaceAction;

