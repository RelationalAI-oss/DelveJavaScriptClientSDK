/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.4.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The DatabaseInfo model module.
 * @module model/DatabaseInfo
 * @version 1.4.0
 */
class DatabaseInfo {
    /**
     * Constructs a new <code>DatabaseInfo</code>.
     * @alias module:model/DatabaseInfo
     */
    constructor() { 
        
        DatabaseInfo.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>DatabaseInfo</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DatabaseInfo} obj Optional instance to populate.
     * @return {module:model/DatabaseInfo} The populated <code>DatabaseInfo</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DatabaseInfo();

            if (data.hasOwnProperty('account_name')) {
                obj['account_name'] = ApiClient.convertToType(data['account_name'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('region')) {
                obj['region'] = ApiClient.convertToType(data['region'], 'String');
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('created_by')) {
                obj['created_by'] = ApiClient.convertToType(data['created_by'], 'String');
            }
            if (data.hasOwnProperty('default_compute_name')) {
                obj['default_compute_name'] = ApiClient.convertToType(data['default_compute_name'], 'String');
            }
            if (data.hasOwnProperty('state')) {
                obj['state'] = ApiClient.convertToType(data['state'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} account_name
 */
DatabaseInfo.prototype['account_name'] = undefined;

/**
 * @member {String} name
 */
DatabaseInfo.prototype['name'] = undefined;

/**
 * @member {String} region
 */
DatabaseInfo.prototype['region'] = undefined;

/**
 * @member {String} id
 */
DatabaseInfo.prototype['id'] = undefined;

/**
 * @member {String} created_by
 */
DatabaseInfo.prototype['created_by'] = undefined;

/**
 * @member {String} default_compute_name
 */
DatabaseInfo.prototype['default_compute_name'] = undefined;

/**
 * @member {String} state
 */
DatabaseInfo.prototype['state'] = undefined;






export default DatabaseInfo;

