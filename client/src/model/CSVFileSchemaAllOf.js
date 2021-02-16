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
 * The CSVFileSchemaAllOf model module.
 * @module model/CSVFileSchemaAllOf
 * @version 1.1.3
 */
class CSVFileSchemaAllOf {
    /**
     * Constructs a new <code>CSVFileSchemaAllOf</code>.
     * @alias module:model/CSVFileSchemaAllOf
     */
    constructor() { 
        
        CSVFileSchemaAllOf.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CSVFileSchemaAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CSVFileSchemaAllOf} obj Optional instance to populate.
     * @return {module:model/CSVFileSchemaAllOf} The populated <code>CSVFileSchemaAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CSVFileSchemaAllOf();

            if (data.hasOwnProperty('types')) {
                obj['types'] = ApiClient.convertToType(data['types'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<String>} types
 */
CSVFileSchemaAllOf.prototype['types'] = undefined;






export default CSVFileSchemaAllOf;

