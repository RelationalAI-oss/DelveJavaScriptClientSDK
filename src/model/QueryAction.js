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
import RelDict from './RelDict';
import Source from './Source';

/**
 * The QueryAction model module.
 * @module model/QueryAction
 * @version 1.0.0
 */
class QueryAction {
    /**
     * Constructs a new <code>QueryAction</code>.
     * @alias module:model/QueryAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param objtp {String} 
     */
    constructor(objtp) { 
        Action.initialize(this, objtp);
        QueryAction.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
        obj['source'] = source;
    }

    /**
     * Constructs a <code>QueryAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/QueryAction} obj Optional instance to populate.
     * @return {module:model/QueryAction} The populated <code>QueryAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new QueryAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('source')) {
                obj['source'] = Source.constructFromObject(data['source']);
            }
            if (data.hasOwnProperty('inputs')) {
                obj['inputs'] = RelDict.constructFromObject(data['inputs']);
            }
            if (data.hasOwnProperty('persist')) {
                obj['persist'] = ApiClient.convertToType(data['persist'], ['String']);
            }
            if (data.hasOwnProperty('outputs')) {
                obj['outputs'] = ApiClient.convertToType(data['outputs'], ['String']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Source} source
 */
QueryAction.prototype['source'] = undefined;

/**
 * @member {module:model/RelDict} inputs
 */
QueryAction.prototype['inputs'] = undefined;

/**
 * @member {Array.<String>} persist
 */
QueryAction.prototype['persist'] = undefined;

/**
 * @member {Array.<String>} outputs
 */
QueryAction.prototype['outputs'] = undefined;


// Implement Action interface:
/**
 * @member {String} objtp
 * @default ''
 */
Action.prototype['objtp'] = '';




export default QueryAction;

