/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AnyType from './AnyType';
import RelKey from './RelKey';

/**
 * The Relation model module.
 * @module model/Relation
 * @version 1.1.7
 */
class Relation {
    /**
     * Constructs a new <code>Relation</code>.
     * @alias module:model/Relation
     * @param relKey {module:model/RelKey} 
     * @param type {module:model/Relation.TypeEnum} 
     */
    constructor(relKey, type) { 
        
        Relation.initialize(this, relKey, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, relKey, type) { 
        obj['rel_key'] = relKey;
        obj['type'] = type || 'Relation';
    }

    /**
     * Constructs a <code>Relation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Relation} obj Optional instance to populate.
     * @return {module:model/Relation} The populated <code>Relation</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Relation();

            if (data.hasOwnProperty('columns')) {
                obj['columns'] = ApiClient.convertToType(data['columns'], [[AnyType]]);
            }
            if (data.hasOwnProperty('rel_key')) {
                obj['rel_key'] = RelKey.constructFromObject(data['rel_key']);
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<Array.<module:model/AnyType>>} columns
 */
Relation.prototype['columns'] = undefined;

/**
 * @member {module:model/RelKey} rel_key
 */
Relation.prototype['rel_key'] = undefined;

/**
 * @member {module:model/Relation.TypeEnum} type
 * @default 'Relation'
 */
Relation.prototype['type'] = 'Relation';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Relation['TypeEnum'] = {

    /**
     * value: "Relation"
     * @const
     */
    "Relation": "Relation"
};



export default Relation;

