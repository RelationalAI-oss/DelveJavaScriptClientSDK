/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.4
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AnyType from './AnyType';
import Area from './Area';

/**
 * The Range model module.
 * @module model/Range
 * @version 1.0.4
 */
class Range {
    /**
     * Constructs a new <code>Range</code>.
     * @alias module:model/Range
     * @param area {module:model/Area} 
     * @param endByte {Number} 
     * @param startByte {Number} 
     * @param type {module:model/Range.TypeEnum} 
     */
    constructor(area, endByte, startByte, type) { 
        
        Range.initialize(this, area, endByte, startByte, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, area, endByte, startByte, type) { 
        obj['area'] = area;
        obj['end_byte'] = endByte;
        obj['start_byte'] = startByte;
        obj['type'] = type;
    }

    /**
     * Constructs a <code>Range</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Range} obj Optional instance to populate.
     * @return {module:model/Range} The populated <code>Range</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Range();

            if (data.hasOwnProperty('area')) {
                obj['area'] = Area.constructFromObject(data['area']);
            }
            if (data.hasOwnProperty('end_byte')) {
                obj['end_byte'] = ApiClient.convertToType(data['end_byte'], 'Number');
            }
            if (data.hasOwnProperty('input')) {
                obj['input'] = ApiClient.convertToType(data['input'], AnyType);
            }
            if (data.hasOwnProperty('start_byte')) {
                obj['start_byte'] = ApiClient.convertToType(data['start_byte'], 'Number');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Area} area
 */
Range.prototype['area'] = undefined;

/**
 * @member {Number} end_byte
 * @default 0
 */
Range.prototype['end_byte'] = 0;

/**
 * @member {module:model/AnyType} input
 */
Range.prototype['input'] = undefined;

/**
 * @member {Number} start_byte
 * @default 0
 */
Range.prototype['start_byte'] = 0;

/**
 * @member {module:model/Range.TypeEnum} type
 * @default 'Range'
 */
Range.prototype['type'] = 'Range';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Range['TypeEnum'] = {

    /**
     * value: "Range"
     * @const
     */
    "Range": "Range"
};



export default Range;

