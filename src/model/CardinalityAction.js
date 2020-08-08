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
import Action from './Action';

/**
 * The CardinalityAction model module.
 * @module model/CardinalityAction
 * @version 1.0.0
 */
class CardinalityAction {
    /**
     * Constructs a new <code>CardinalityAction</code>.
     * @alias module:model/CardinalityAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        CardinalityAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>CardinalityAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CardinalityAction} obj Optional instance to populate.
     * @return {module:model/CardinalityAction} The populated <code>CardinalityAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CardinalityAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('relname')) {
                obj['relname'] = ApiClient.convertToType(data['relname'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} relname
 * @default ''
 */
CardinalityAction.prototype['relname'] = '';


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default CardinalityAction;

