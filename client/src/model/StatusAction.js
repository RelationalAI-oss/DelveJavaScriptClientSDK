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
import Action from './Action';

/**
 * The StatusAction model module.
 * @module model/StatusAction
 * @version 1.1.8
 */
class StatusAction {
    /**
     * Constructs a new <code>StatusAction</code>.
     * @alias module:model/StatusAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        StatusAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>StatusAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StatusAction} obj Optional instance to populate.
     * @return {module:model/StatusAction} The populated <code>StatusAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StatusAction();
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




export default StatusAction;

