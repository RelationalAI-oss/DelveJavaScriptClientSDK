/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The FileSchema model module.
 * @module model/FileSchema
 * @version 1.1.7
 */
class FileSchema {
    /**
     * Constructs a new <code>FileSchema</code>.
     * @alias module:model/FileSchema
     * @param type {String} 
     */
    constructor(type) { 
        
        FileSchema.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['type'] = type || '';
    }

    /**
     * Constructs a <code>FileSchema</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/FileSchema} obj Optional instance to populate.
     * @return {module:model/FileSchema} The populated <code>FileSchema</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new FileSchema();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} type
 * @default ''
 */
FileSchema.prototype['type'] = '';






export default FileSchema;

