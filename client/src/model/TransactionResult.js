/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.13
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AbstractProblem from './AbstractProblem';
import LabeledActionResult from './LabeledActionResult';
import Relation from './Relation';

/**
 * The TransactionResult model module.
 * @module model/TransactionResult
 * @version 1.1.1
 */
class TransactionResult {
    /**
     * Constructs a new <code>TransactionResult</code>.
     * @alias module:model/TransactionResult
     * @param aborted {Boolean} 
     * @param type {module:model/TransactionResult.TypeEnum} 
     */
    constructor(aborted, type) { 
        
        TransactionResult.initialize(this, aborted, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, aborted, type) { 
        obj['aborted'] = aborted || false;
        obj['type'] = type || 'TransactionResult';
    }

    /**
     * Constructs a <code>TransactionResult</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/TransactionResult} obj Optional instance to populate.
     * @return {module:model/TransactionResult} The populated <code>TransactionResult</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new TransactionResult();

            if (data.hasOwnProperty('aborted')) {
                obj['aborted'] = ApiClient.convertToType(data['aborted'], 'Boolean');
            }
            if (data.hasOwnProperty('actions')) {
                obj['actions'] = ApiClient.convertToType(data['actions'], [LabeledActionResult]);
            }
            if (data.hasOwnProperty('debug_level')) {
                obj['debug_level'] = ApiClient.convertToType(data['debug_level'], 'Number');
            }
            if (data.hasOwnProperty('output')) {
                obj['output'] = ApiClient.convertToType(data['output'], [Relation]);
            }
            if (data.hasOwnProperty('problems')) {
                obj['problems'] = ApiClient.convertToType(data['problems'], [AbstractProblem]);
            }
            if (data.hasOwnProperty('version')) {
                obj['version'] = ApiClient.convertToType(data['version'], 'Number');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Boolean} aborted
 * @default false
 */
TransactionResult.prototype['aborted'] = false;

/**
 * @member {Array.<module:model/LabeledActionResult>} actions
 */
TransactionResult.prototype['actions'] = undefined;

/**
 * @member {Number} debug_level
 */
TransactionResult.prototype['debug_level'] = undefined;

/**
 * @member {Array.<module:model/Relation>} output
 */
TransactionResult.prototype['output'] = undefined;

/**
 * @member {Array.<module:model/AbstractProblem>} problems
 */
TransactionResult.prototype['problems'] = undefined;

/**
 * @member {Number} version
 */
TransactionResult.prototype['version'] = undefined;

/**
 * @member {module:model/TransactionResult.TypeEnum} type
 * @default 'TransactionResult'
 */
TransactionResult.prototype['type'] = 'TransactionResult';





/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
TransactionResult['TypeEnum'] = {

    /**
     * value: "TransactionResult"
     * @const
     */
    "TransactionResult": "TransactionResult"
};



export default TransactionResult;

