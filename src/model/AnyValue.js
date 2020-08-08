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

/**
 * The AnyValue model module.
 * @module model/AnyValue
 * @version 1.0.0
 */
class AnyValue {
    /**
     * Constructs a new <code>AnyValue</code>.
     * @alias module:model/AnyValue
     * @param type {module:model/AnyValue.TypeEnum} 
     */
    constructor(type) { 
        
        AnyValue.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['type'] = type;
    }

    /**
     * Constructs a <code>AnyValue</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AnyValue} obj Optional instance to populate.
     * @return {module:model/AnyValue} The populated <code>AnyValue</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AnyValue();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/AnyValue.TypeEnum} type
 * @default 'AnyValue'
 */
AnyValue.prototype['type'] = 'AnyValue';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
AnyValue['TypeEnum'] = {

    /**
     * value: "AnyValue"
     * @const
     */
    "AnyValue": "AnyValue"
};



export default AnyValue;

