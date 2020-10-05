/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import RelKey from './RelKey';

/**
 * The ICViolation model module.
 * @module model/ICViolation
 * @version 1.0.7
 */
class ICViolation {
    /**
     * Constructs a new <code>ICViolation</code>.
     * @alias module:model/ICViolation
     * @param relKey {module:model/RelKey} 
     * @param source {String} 
     * @param type {module:model/ICViolation.TypeEnum} 
     */
    constructor(relKey, source, type) { 
        
        ICViolation.initialize(this, relKey, source, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, relKey, source, type) { 
        obj['rel_key'] = relKey;
        obj['source'] = source || '';
        obj['type'] = type || 'ICViolation';
    }

    /**
     * Constructs a <code>ICViolation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ICViolation} obj Optional instance to populate.
     * @return {module:model/ICViolation} The populated <code>ICViolation</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ICViolation();

            if (data.hasOwnProperty('rel_key')) {
                obj['rel_key'] = RelKey.constructFromObject(data['rel_key']);
            }
            if (data.hasOwnProperty('source')) {
                obj['source'] = ApiClient.convertToType(data['source'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/RelKey} rel_key
 */
ICViolation.prototype['rel_key'] = undefined;

/**
 * @member {String} source
 * @default ''
 */
ICViolation.prototype['source'] = '';

/**
 * @member {module:model/ICViolation.TypeEnum} type
 * @default 'ICViolation'
 */
ICViolation.prototype['type'] = 'ICViolation';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
ICViolation['TypeEnum'] = {

    /**
     * value: "ICViolation"
     * @const
     */
    "ICViolation": "ICViolation"
};



export default ICViolation;

