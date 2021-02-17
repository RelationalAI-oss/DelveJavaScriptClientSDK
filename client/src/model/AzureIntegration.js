/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Integration from './Integration';
import PairSymbolString from './PairSymbolString';

/**
 * The AzureIntegration model module.
 * @module model/AzureIntegration
 * @version 1.2.0
 */
class AzureIntegration {
    /**
     * Constructs a new <code>AzureIntegration</code>.
     * @alias module:model/AzureIntegration
     * @extends module:model/Integration
     * @implements module:model/Integration
     * @param type {String} 
     */
    constructor(type) { 
        Integration.initialize(this, type);
        AzureIntegration.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>AzureIntegration</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AzureIntegration} obj Optional instance to populate.
     * @return {module:model/AzureIntegration} The populated <code>AzureIntegration</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AzureIntegration();
            Integration.constructFromObject(data, obj);
            Integration.constructFromObject(data, obj);

            if (data.hasOwnProperty('credentials')) {
                obj['credentials'] = ApiClient.convertToType(data['credentials'], [PairSymbolString]);
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('storage_allowed_locations')) {
                obj['storage_allowed_locations'] = ApiClient.convertToType(data['storage_allowed_locations'], ['String']);
            }
            if (data.hasOwnProperty('storage_blocked_locations')) {
                obj['storage_blocked_locations'] = ApiClient.convertToType(data['storage_blocked_locations'], ['String']);
            }
            if (data.hasOwnProperty('tenant_id')) {
                obj['tenant_id'] = ApiClient.convertToType(data['tenant_id'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/PairSymbolString>} credentials
 */
AzureIntegration.prototype['credentials'] = undefined;

/**
 * @member {String} name
 */
AzureIntegration.prototype['name'] = undefined;

/**
 * @member {Array.<String>} storage_allowed_locations
 */
AzureIntegration.prototype['storage_allowed_locations'] = undefined;

/**
 * @member {Array.<String>} storage_blocked_locations
 */
AzureIntegration.prototype['storage_blocked_locations'] = undefined;

/**
 * @member {String} tenant_id
 */
AzureIntegration.prototype['tenant_id'] = undefined;


// Implement Integration interface:
/**
 * @member {String} type
 * @default ''
 */
Integration.prototype['type'] = '';




export default AzureIntegration;

