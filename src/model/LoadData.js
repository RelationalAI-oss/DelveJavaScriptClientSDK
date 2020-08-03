/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AnyValue from './AnyValue';
import FileSchema from './FileSchema';
import FileSyntax from './FileSyntax';

/**
 * The LoadData model module.
 * @module model/LoadData
 * @version 1.0.0
 */
class LoadData {
    /**
     * Constructs a new <code>LoadData</code>.
     * @alias module:model/LoadData
     * @param fileSyntax {module:model/FileSyntax} 
     * @param fileSchema {module:model/FileSchema} 
     * @param objtp {module:model/LoadData.ObjtpEnum} 
     */
    constructor(fileSyntax, fileSchema, objtp) { 
        
        LoadData.initialize(this, fileSyntax, fileSchema, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, fileSyntax, fileSchema, objtp) { 
        obj['file_syntax'] = fileSyntax;
        obj['file_schema'] = fileSchema;
        obj['objtp'] = objtp;
    }

    /**
     * Constructs a <code>LoadData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadData} obj Optional instance to populate.
     * @return {module:model/LoadData} The populated <code>LoadData</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LoadData();

            if (data.hasOwnProperty('content_type')) {
                obj['content_type'] = ApiClient.convertToType(data['content_type'], 'String');
            }
            if (data.hasOwnProperty('data')) {
                obj['data'] = ApiClient.convertToType(data['data'], 'String');
            }
            if (data.hasOwnProperty('path')) {
                obj['path'] = ApiClient.convertToType(data['path'], 'String');
            }
            if (data.hasOwnProperty('key')) {
                obj['key'] = AnyValue.constructFromObject(data['key']);
            }
            if (data.hasOwnProperty('file_syntax')) {
                obj['file_syntax'] = FileSyntax.constructFromObject(data['file_syntax']);
            }
            if (data.hasOwnProperty('file_schema')) {
                obj['file_schema'] = FileSchema.constructFromObject(data['file_schema']);
            }
            if (data.hasOwnProperty('objtp')) {
                obj['objtp'] = ApiClient.convertToType(data['objtp'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} content_type
 * @default ''
 */
LoadData.prototype['content_type'] = '';

/**
 * @member {String} data
 * @default ''
 */
LoadData.prototype['data'] = '';

/**
 * @member {String} path
 * @default ''
 */
LoadData.prototype['path'] = '';

/**
 * @member {module:model/AnyValue} key
 */
LoadData.prototype['key'] = undefined;

/**
 * @member {module:model/FileSyntax} file_syntax
 */
LoadData.prototype['file_syntax'] = undefined;

/**
 * @member {module:model/FileSchema} file_schema
 */
LoadData.prototype['file_schema'] = undefined;

/**
 * @member {module:model/LoadData.ObjtpEnum} objtp
 * @default 'LoadData'
 */
LoadData.prototype['objtp'] = 'LoadData';





/**
 * Allowed values for the <code>objtp</code> property.
 * @enum {String}
 * @readonly
 */
LoadData['ObjtpEnum'] = {

    /**
     * value: "LoadData"
     * @const
     */
    "LoadData": "LoadData"
};



export default LoadData;
