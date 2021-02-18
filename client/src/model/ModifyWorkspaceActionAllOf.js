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

/**
 * The ModifyWorkspaceActionAllOf model module.
 * @module model/ModifyWorkspaceActionAllOf
 * @version 1.1.3
 */
class ModifyWorkspaceActionAllOf {
    /**
     * Constructs a new <code>ModifyWorkspaceActionAllOf</code>.
     * @alias module:model/ModifyWorkspaceActionAllOf
     */
    constructor() { 
        
        ModifyWorkspaceActionAllOf.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ModifyWorkspaceActionAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ModifyWorkspaceActionAllOf} obj Optional instance to populate.
     * @return {module:model/ModifyWorkspaceActionAllOf} The populated <code>ModifyWorkspaceActionAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ModifyWorkspaceActionAllOf();

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
ModifyWorkspaceActionAllOf.prototype['delete_edb'] = undefined;

/**
 * @member {Array.<String>} delete_source
 */
ModifyWorkspaceActionAllOf.prototype['delete_source'] = undefined;

/**
 * @member {String} enable_library
 */
ModifyWorkspaceActionAllOf.prototype['enable_library'] = undefined;






export default ModifyWorkspaceActionAllOf;

