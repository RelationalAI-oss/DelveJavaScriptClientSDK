/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.5
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
 * The ListSourceAction model module.
 * @module model/ListSourceAction
 * @version 1.0.5
 */
class ListSourceAction {
    /**
     * Constructs a new <code>ListSourceAction</code>.
     * @alias module:model/ListSourceAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        ListSourceAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>ListSourceAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ListSourceAction} obj Optional instance to populate.
     * @return {module:model/ListSourceAction} The populated <code>ListSourceAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ListSourceAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

        }
        return obj;
    }


}


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default ListSourceAction;

