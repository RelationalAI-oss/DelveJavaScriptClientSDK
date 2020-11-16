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
 * The PairSymbolString model module.
 * @module model/PairSymbolString
 * @version 1.1.3
 */
class PairSymbolString {
    /**
     * Constructs a new <code>PairSymbolString</code>.
     * @alias module:model/PairSymbolString
     * @param first {String} 
     * @param second {String} 
     * @param type {module:model/PairSymbolString.TypeEnum} 
     */
    constructor(first, second, type) { 
        
        PairSymbolString.initialize(this, first, second, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, first, second, type) { 
        obj['first'] = first || '';
        obj['second'] = second || '';
        obj['type'] = type || 'Pair_Symbol_String_';
    }

    /**
     * Constructs a <code>PairSymbolString</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/PairSymbolString} obj Optional instance to populate.
     * @return {module:model/PairSymbolString} The populated <code>PairSymbolString</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PairSymbolString();

            if (data.hasOwnProperty('first')) {
                obj['first'] = ApiClient.convertToType(data['first'], 'String');
            }
            if (data.hasOwnProperty('second')) {
                obj['second'] = ApiClient.convertToType(data['second'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} first
 * @default ''
 */
PairSymbolString.prototype['first'] = '';

/**
 * @member {String} second
 * @default ''
 */
PairSymbolString.prototype['second'] = '';

/**
 * @member {module:model/PairSymbolString.TypeEnum} type
 * @default 'Pair_Symbol_String_'
 */
PairSymbolString.prototype['type'] = 'Pair_Symbol_String_';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
PairSymbolString['TypeEnum'] = {

    /**
     * value: "Pair_Symbol_String_"
     * @const
     */
    "Pair_Symbol_String_": "Pair_Symbol_String_"
};



export default PairSymbolString;

