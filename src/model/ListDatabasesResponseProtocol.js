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
import DatabaseInfo from './DatabaseInfo';

/**
 * The ListDatabasesResponseProtocol model module.
 * @module model/ListDatabasesResponseProtocol
 * @version 1.3.2
 */
class ListDatabasesResponseProtocol {
    /**
     * Constructs a new <code>ListDatabasesResponseProtocol</code>.
     * @alias module:model/ListDatabasesResponseProtocol
     */
    constructor() { 
        
        ListDatabasesResponseProtocol.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ListDatabasesResponseProtocol</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListDatabasesResponseProtocol} obj Optional instance to populate.
     * @return {module:model/ListDatabasesResponseProtocol} The populated <code>ListDatabasesResponseProtocol</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ListDatabasesResponseProtocol();

            if (data.hasOwnProperty('databases')) {
                obj['databases'] = ApiClient.convertToType(data['databases'], [DatabaseInfo]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/DatabaseInfo>} databases
 */
ListDatabasesResponseProtocol.prototype['databases'] = undefined;






export default ListDatabasesResponseProtocol;

