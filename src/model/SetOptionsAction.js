/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.9
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
 * The SetOptionsAction model module.
 * @module model/SetOptionsAction
 * @version 1.0.9
 */
class SetOptionsAction {
    /**
     * Constructs a new <code>SetOptionsAction</code>.
     * @alias module:model/SetOptionsAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        SetOptionsAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>SetOptionsAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SetOptionsAction} obj Optional instance to populate.
     * @return {module:model/SetOptionsAction} The populated <code>SetOptionsAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SetOptionsAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('abort_on_error')) {
                obj['abort_on_error'] = ApiClient.convertToType(data['abort_on_error'], 'Boolean');
            }
            if (data.hasOwnProperty('broken')) {
                obj['broken'] = ApiClient.convertToType(data['broken'], 'Boolean');
            }
            if (data.hasOwnProperty('debug')) {
                obj['debug'] = ApiClient.convertToType(data['debug'], 'Boolean');
            }
            if (data.hasOwnProperty('debug_trace')) {
                obj['debug_trace'] = ApiClient.convertToType(data['debug_trace'], 'Boolean');
            }
            if (data.hasOwnProperty('silent')) {
                obj['silent'] = ApiClient.convertToType(data['silent'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * @member {Boolean} abort_on_error
 */
SetOptionsAction.prototype['abort_on_error'] = undefined;

/**
 * @member {Boolean} broken
 */
SetOptionsAction.prototype['broken'] = undefined;

/**
 * @member {Boolean} debug
 */
SetOptionsAction.prototype['debug'] = undefined;

/**
 * @member {Boolean} debug_trace
 */
SetOptionsAction.prototype['debug_trace'] = undefined;

/**
 * @member {Boolean} silent
 */
SetOptionsAction.prototype['silent'] = undefined;


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default SetOptionsAction;

