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
import Relation from './Relation';
import Source from './Source';

/**
 * The QueryAction model module.
 * @module model/QueryAction
 * @version 1.1.8
 */
class QueryAction {
    /**
     * Constructs a new <code>QueryAction</code>.
     * @alias module:model/QueryAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param type {String} 
     */
    constructor(type) { 
        Action.initialize(this, type);
        QueryAction.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['source'] = null;
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

            if (data.hasOwnProperty('inputs')) {
                obj['inputs'] = ApiClient.convertToType(data['inputs'], [Relation]);
            }
            if (data.hasOwnProperty('outputs')) {
                obj['outputs'] = ApiClient.convertToType(data['outputs'], ['String']);
            }
            if (data.hasOwnProperty('persist')) {
                obj['persist'] = ApiClient.convertToType(data['persist'], ['String']);
            }
            if (data.hasOwnProperty('source')) {
                obj['source'] = Source.constructFromObject(data['source']);
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/Relation>} inputs
 */
QueryAction.prototype['inputs'] = undefined;

/**
 * @member {Array.<String>} outputs
 */
QueryAction.prototype['outputs'] = undefined;

/**
 * @member {Array.<String>} persist
 */
QueryAction.prototype['persist'] = undefined;

/**
 * @member {module:model/Source} source
 */
QueryAction.prototype['source'] = undefined;


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';




export default QueryAction;

