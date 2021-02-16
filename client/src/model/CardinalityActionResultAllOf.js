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
import Relation from './Relation';

/**
 * The CardinalityActionResultAllOf model module.
 * @module model/CardinalityActionResultAllOf
 * @version 1.1.3
 */
class CardinalityActionResultAllOf {
    /**
     * Constructs a new <code>CardinalityActionResultAllOf</code>.
     * @alias module:model/CardinalityActionResultAllOf
     */
    constructor() { 
        
        CardinalityActionResultAllOf.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CardinalityActionResultAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardinalityActionResultAllOf} obj Optional instance to populate.
     * @return {module:model/CardinalityActionResultAllOf} The populated <code>CardinalityActionResultAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CardinalityActionResultAllOf();

            if (data.hasOwnProperty('result')) {
                obj['result'] = ApiClient.convertToType(data['result'], [Relation]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/Relation>} result
 */
CardinalityActionResultAllOf.prototype['result'] = undefined;






export default CardinalityActionResultAllOf;

