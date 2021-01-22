/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.8
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The Point model module.
 * @module model/Point
 * @version 1.1.8
 */
class Point {
    /**
     * Constructs a new <code>Point</code>.
     * @alias module:model/Point
     * @param column {Number} 
     * @param row {Number} 
     * @param type {module:model/Point.TypeEnum} 
     */
    constructor(column, row, type) { 
        
        Point.initialize(this, column, row, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, column, row, type) { 
        obj['column'] = column || 0;
        obj['row'] = row || 0;
        obj['type'] = type || 'Point';
    }

    /**
     * Constructs a <code>Point</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Point} obj Optional instance to populate.
     * @return {module:model/Point} The populated <code>Point</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Point();

            if (data.hasOwnProperty('column')) {
                obj['column'] = ApiClient.convertToType(data['column'], 'Number');
            }
            if (data.hasOwnProperty('row')) {
                obj['row'] = ApiClient.convertToType(data['row'], 'Number');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} column
 * @default 0
 */
Point.prototype['column'] = 0;

/**
 * @member {Number} row
 * @default 0
 */
Point.prototype['row'] = 0;

/**
 * @member {module:model/Point.TypeEnum} type
 * @default 'Point'
 */
Point.prototype['type'] = 'Point';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Point['TypeEnum'] = {

    /**
     * value: "Point"
     * @const
     */
    "Point": "Point"
};



export default Point;

