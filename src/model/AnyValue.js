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
     * @param objtp {module:model/AnyValue.ObjtpEnum} 
     */
    constructor(objtp) { 
        
        AnyValue.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
        obj['objtp'] = objtp;
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

            if (data.hasOwnProperty('objtp')) {
                obj['objtp'] = ApiClient.convertToType(data['objtp'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/AnyValue.ObjtpEnum} objtp
 * @default 'AnyValue'
 */
AnyValue.prototype['objtp'] = 'AnyValue';





/**
 * Allowed values for the <code>objtp</code> property.
 * @enum {String}
 * @readonly
 */
AnyValue['ObjtpEnum'] = {

    /**
     * value: "AnyValue"
     * @const
     */
    "AnyValue": "AnyValue"
};



export default AnyValue;
