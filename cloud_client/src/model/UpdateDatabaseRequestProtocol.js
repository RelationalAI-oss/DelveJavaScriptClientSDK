/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.3.2
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The UpdateDatabaseRequestProtocol model module.
 * @module model/UpdateDatabaseRequestProtocol
 * @version 1.3.2
 */
class UpdateDatabaseRequestProtocol {
    /**
     * Constructs a new <code>UpdateDatabaseRequestProtocol</code>.
     * @alias module:model/UpdateDatabaseRequestProtocol
     */
    constructor() { 
        
        UpdateDatabaseRequestProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UpdateDatabaseRequestProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateDatabaseRequestProtocol} obj Optional instance to populate.
     * @return {module:model/UpdateDatabaseRequestProtocol} The populated <code>UpdateDatabaseRequestProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UpdateDatabaseRequestProtocol();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('default_compute_name')) {
                obj['default_compute_name'] = ApiClient.convertToType(data['default_compute_name'], 'String');
            }
            if (data.hasOwnProperty('remove_default_compute')) {
                obj['remove_default_compute'] = ApiClient.convertToType(data['remove_default_compute'], 'Boolean');
            }
            if (data.hasOwnProperty('dryrun')) {
                obj['dryrun'] = ApiClient.convertToType(data['dryrun'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * @member {String} name
 */
UpdateDatabaseRequestProtocol.prototype['name'] = undefined;

/**
 * @member {String} default_compute_name
 */
UpdateDatabaseRequestProtocol.prototype['default_compute_name'] = undefined;

/**
 * @member {Boolean} remove_default_compute
 */
UpdateDatabaseRequestProtocol.prototype['remove_default_compute'] = undefined;

/**
 * @member {Boolean} dryrun
 */
UpdateDatabaseRequestProtocol.prototype['dryrun'] = undefined;






export default UpdateDatabaseRequestProtocol;

