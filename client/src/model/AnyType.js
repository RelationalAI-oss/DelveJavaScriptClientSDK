/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.8
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The AnyType model module.
 * @module model/AnyType
 * @version 1.0.8
 */
class AnyType {
    /**
     * Constructs a new <code>AnyType</code>.
     * @alias module:model/AnyType
     * @param target_value {Number} 
     * @param type {module:model/AnyType.TypeEnum} 
     */
    constructor(target_value, type) { 
        
        AnyType.initialize(this, target_value, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, target_value, type) { 
        obj['target_value'] = target_value || null;
        obj['type'] = type || 'AnyType';
    }

    /**
     * Constructs a <code>AnyType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AnyType} obj Optional instance to populate.
     * @return {module:model/AnyType} The populated <code>AnyType</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AnyType();

            if (data.hasOwnProperty('target_value')) {
                obj['target_value'] = ApiClient.convertToType(data['target_value'], 'Number');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} target_value
 * @default 0
 */
AnyType.prototype['target_value'] = 0;

/**
 * @member {module:model/AnyType.TypeEnum} type
 * @default 'AnyType'
 */
AnyType.prototype['type'] = 'AnyType';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
AnyType['TypeEnum'] = {

    /**
     * value: "AnyType"
     * @const
     */
    "AnyType": "AnyType"
};



export default AnyType;
