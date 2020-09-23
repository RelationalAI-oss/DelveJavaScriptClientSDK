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
import PairAnyValueAnyValue from './PairAnyValueAnyValue';
import RelKey from './RelKey';

/**
 * The UpdateAction model module.
 * @module model/UpdateAction
 * @version 1.0.2
 */
class UpdateAction {
    /**
     * Constructs a new <code>UpdateAction</code>.
     * @alias module:model/UpdateAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        UpdateAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['rel'] = rel;
    }

    /**
     * Constructs a <code>UpdateAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UpdateAction} obj Optional instance to populate.
     * @return {module:model/UpdateAction} The populated <code>UpdateAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UpdateAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('delta')) {
                obj['delta'] = ApiClient.convertToType(data['delta'], [PairAnyValueAnyValue]);
            }
            if (data.hasOwnProperty('rel')) {
                obj['rel'] = RelKey.constructFromObject(data['rel']);
            }
            if (data.hasOwnProperty('updates')) {
                obj['updates'] = ApiClient.convertToType(data['updates'], [PairAnyValueAnyValue]);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/PairAnyValueAnyValue>} delta
 */
UpdateAction.prototype['delta'] = undefined;

/**
 * @member {module:model/RelKey} rel
 */
UpdateAction.prototype['rel'] = undefined;

/**
 * @member {Array.<module:model/PairAnyValueAnyValue>} updates
 */
UpdateAction.prototype['updates'] = undefined;


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default UpdateAction;

