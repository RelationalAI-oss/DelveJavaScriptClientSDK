/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.2
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
 * The LabeledAction model module.
 * @module model/LabeledAction
 * @version 1.0.2
 */
class LabeledAction {
    /**
     * Constructs a new <code>LabeledAction</code>.
     * @alias module:model/LabeledAction
     * @param action {module:model/Action} 
     * @param name {String} 
     * @param type {module:model/LabeledAction.TypeEnum} 
     */
    constructor(action, name, type) { 
        
        LabeledAction.initialize(this, action, name, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, action, name, type) { 
        obj['action'] = action;
        obj['name'] = name;
        obj['type'] = type;
    }

    /**
     * Constructs a <code>LabeledAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LabeledAction} obj Optional instance to populate.
     * @return {module:model/LabeledAction} The populated <code>LabeledAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LabeledAction();

            if (data.hasOwnProperty('action')) {
                obj['action'] = Action.constructFromObject(data['action']);
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Action} action
 */
LabeledAction.prototype['action'] = undefined;

/**
 * @member {String} name
 * @default ''
 */
LabeledAction.prototype['name'] = '';

/**
 * @member {module:model/LabeledAction.TypeEnum} type
 * @default 'LabeledAction'
 */
LabeledAction.prototype['type'] = 'LabeledAction';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
LabeledAction['TypeEnum'] = {

    /**
     * value: "LabeledAction"
     * @const
     */
    "LabeledAction": "LabeledAction"
};



export default LabeledAction;

