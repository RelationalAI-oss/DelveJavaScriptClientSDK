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
import PairAnyValueAnyValue from './PairAnyValueAnyValue';
import RelKey from './RelKey';

/**
 * The UpdateAction model module.
 * @module model/UpdateAction
 * @version 1.0.0
 */
class UpdateAction {
    /**
     * Constructs a new <code>UpdateAction</code>.
     * @alias module:model/UpdateAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param objtp {String} 
     */
    constructor(objtp) { 
        Action.initialize(this, objtp);
        UpdateAction.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
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

            if (data.hasOwnProperty('rel')) {
                obj['rel'] = RelKey.constructFromObject(data['rel']);
            }
            if (data.hasOwnProperty('updates')) {
                obj['updates'] = ApiClient.convertToType(data['updates'], [PairAnyValueAnyValue]);
            }
            if (data.hasOwnProperty('delta')) {
                obj['delta'] = ApiClient.convertToType(data['delta'], [PairAnyValueAnyValue]);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/RelKey} rel
 */
UpdateAction.prototype['rel'] = undefined;

/**
 * @member {Array.<module:model/PairAnyValueAnyValue>} updates
 */
UpdateAction.prototype['updates'] = undefined;

/**
 * @member {Array.<module:model/PairAnyValueAnyValue>} delta
 */
UpdateAction.prototype['delta'] = undefined;


// Implement Action interface:
/**
 * @member {String} objtp
 * @default ''
 */
Action.prototype['objtp'] = '';




export default UpdateAction;
