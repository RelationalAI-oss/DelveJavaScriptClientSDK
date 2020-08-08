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
import LinkedList from './LinkedList';

/**
 * The Nil model module.
 * @module model/Nil
 * @version 1.0.0
 */
class Nil {
    /**
     * Constructs a new <code>Nil</code>.
     * @alias module:model/Nil
     * @extends module:model/LinkedList
     * @implements module:model/LinkedList
     * @param type {String} 
     */
    constructor(type) { 
        LinkedList.initialize(this, type);
        Nil.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>Nil</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Nil} obj Optional instance to populate.
     * @return {module:model/Nil} The populated <code>Nil</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Nil();
            LinkedList.constructFromObject(data, obj);
            LinkedList.constructFromObject(data, obj);

        }
        return obj;
    }


}


// Implement LinkedList interface:
/**
 * @member {String} type
 * @default ''
 */
LinkedList.prototype['type'] = '';




export default Nil;

