/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import LoadData from './LoadData';

/**
 * The LoadDataActionAllOf model module.
 * @module model/LoadDataActionAllOf
 * @version 1.2.0
 */
class LoadDataActionAllOf {
    /**
     * Constructs a new <code>LoadDataActionAllOf</code>.
     * @alias module:model/LoadDataActionAllOf
     * @param rel {String} 
     * @param value {module:model/LoadData} 
     */
    constructor(rel, value) { 
        
        LoadDataActionAllOf.initialize(this, rel, value);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, rel, value) { 
        obj['rel'] = rel || '';
        obj['value'] = value;
    }

    /**
     * Constructs a <code>LoadDataActionAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadDataActionAllOf} obj Optional instance to populate.
     * @return {module:model/LoadDataActionAllOf} The populated <code>LoadDataActionAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LoadDataActionAllOf();

            if (data.hasOwnProperty('rel')) {
                obj['rel'] = ApiClient.convertToType(data['rel'], 'String');
            }
            if (data.hasOwnProperty('value')) {
                obj['value'] = LoadData.constructFromObject(data['value']);
            }
        }
        return obj;
    }


}

/**
 * @member {String} rel
 * @default ''
 */
LoadDataActionAllOf.prototype['rel'] = '';

/**
 * @member {module:model/LoadData} value
 */
LoadDataActionAllOf.prototype['value'] = undefined;






export default LoadDataActionAllOf;

