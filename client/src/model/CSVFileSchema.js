/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.13
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import FileSchema from './FileSchema';

/**
 * The CSVFileSchema model module.
 * @module model/CSVFileSchema
 * @version 1.1.1
 */
class CSVFileSchema {
    /**
     * Constructs a new <code>CSVFileSchema</code>.
     * @alias module:model/CSVFileSchema
     * @extends module:model/FileSchema
     * @implements module:model/FileSchema
     * @param type {String} 
     */
    constructor(type) { 
        FileSchema.initialize(this, type);
        CSVFileSchema.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>CSVFileSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CSVFileSchema} obj Optional instance to populate.
     * @return {module:model/CSVFileSchema} The populated <code>CSVFileSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CSVFileSchema();
            FileSchema.constructFromObject(data, obj);
            FileSchema.constructFromObject(data, obj);

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
CSVFileSchema.prototype['types'] = undefined;


// Implement FileSchema interface:
/**
 * @member {String} type
 * @default ''
 */
FileSchema.prototype['type'] = '';




export default CSVFileSchema;

