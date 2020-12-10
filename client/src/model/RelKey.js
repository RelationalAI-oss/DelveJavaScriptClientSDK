/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.4
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The RelKey model module.
 * @module model/RelKey
 * @version 1.1.4
 */
class RelKey {
    /**
     * Constructs a new <code>RelKey</code>.
     * @alias module:model/RelKey
     * @param name {String} 
     * @param type {module:model/RelKey.TypeEnum} 
     */
    constructor(name, type) { 
        
        RelKey.initialize(this, name, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, type) { 
        obj['name'] = name || '';
        obj['type'] = type || 'RelKey';
    }

    /**
     * Constructs a <code>RelKey</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/RelKey} obj Optional instance to populate.
     * @return {module:model/RelKey} The populated <code>RelKey</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new RelKey();

            if (data.hasOwnProperty('keys')) {
                obj['keys'] = ApiClient.convertToType(data['keys'], ['String']);
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('values')) {
                obj['values'] = ApiClient.convertToType(data['values'], ['String']);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<String>} keys
 */
RelKey.prototype['keys'] = undefined;

/**
 * @member {String} name
 * @default ''
 */
RelKey.prototype['name'] = '';

/**
 * @member {Array.<String>} values
 */
RelKey.prototype['values'] = undefined;

/**
 * @member {module:model/RelKey.TypeEnum} type
 * @default 'RelKey'
 */
RelKey.prototype['type'] = 'RelKey';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
RelKey['TypeEnum'] = {

    /**
     * value: "RelKey"
     * @const
     */
    "RelKey": "RelKey"
};



export default RelKey;

