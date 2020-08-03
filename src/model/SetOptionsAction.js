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
 * The SetOptionsAction model module.
 * @module model/SetOptionsAction
 * @version 1.0.0
 */
class SetOptionsAction {
    /**
     * Constructs a new <code>SetOptionsAction</code>.
     * @alias module:model/SetOptionsAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param objtp {String} 
     */
    constructor(objtp) { 
        Action.initialize(this, objtp);
        SetOptionsAction.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
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

            if (data.hasOwnProperty('debug')) {
                obj['debug'] = ApiClient.convertToType(data['debug'], 'Boolean');
            }
            if (data.hasOwnProperty('debug_trace')) {
                obj['debug_trace'] = ApiClient.convertToType(data['debug_trace'], 'Boolean');
            }
            if (data.hasOwnProperty('broken')) {
                obj['broken'] = ApiClient.convertToType(data['broken'], 'Boolean');
            }
            if (data.hasOwnProperty('silent')) {
                obj['silent'] = ApiClient.convertToType(data['silent'], 'Boolean');
            }
            if (data.hasOwnProperty('abort_on_error')) {
                obj['abort_on_error'] = ApiClient.convertToType(data['abort_on_error'], 'Boolean');
            }
        }
        return obj;
    }


}

/**
 * @member {Boolean} debug
 * @default false
 */
SetOptionsAction.prototype['debug'] = false;

/**
 * @member {Boolean} debug_trace
 * @default false
 */
SetOptionsAction.prototype['debug_trace'] = false;

/**
 * @member {Boolean} broken
 * @default false
 */
SetOptionsAction.prototype['broken'] = false;

/**
 * @member {Boolean} silent
 * @default false
 */
SetOptionsAction.prototype['silent'] = false;

/**
 * @member {Boolean} abort_on_error
 * @default false
 */
SetOptionsAction.prototype['abort_on_error'] = false;


// Implement Action interface:
/**
 * @member {String} objtp
 * @default ''
 */
Action.prototype['objtp'] = '';




export default SetOptionsAction;
