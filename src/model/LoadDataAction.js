/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.3
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Action from './Action';
import LoadData from './LoadData';

/**
 * The LoadDataAction model module.
 * @module model/LoadDataAction
 * @version 1.0.3
 */
class LoadDataAction {
    /**
     * Constructs a new <code>LoadDataAction</code>.
     * @alias module:model/LoadDataAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        LoadDataAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['rel'] = rel;
        obj['value'] = value;
    }

    /**
     * Constructs a <code>LoadDataAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/LoadDataAction} obj Optional instance to populate.
     * @return {module:model/LoadDataAction} The populated <code>LoadDataAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new LoadDataAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('rel')) {
                obj['rel'] = ApiClient.convertToType(data['rel'], 'String');
            }
            if (data.hasOwnProperty('value')) {
                obj['value'] = LoadData.constructFromObject(data['value']);
            }
        }
        return obj;
    }


}

/**
 * @member {String} rel
 * @default ''
 */
LoadDataAction.prototype['rel'] = '';

/**
 * @member {module:model/LoadData} value
 */
LoadDataAction.prototype['value'] = undefined;


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default LoadDataAction;

