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
import LabeledAction from './LabeledAction';

/**
 * The Transaction model module.
 * @module model/Transaction
 * @version 1.0.0
 */
class Transaction {
    /**
     * Constructs a new <code>Transaction</code>.
     * @alias module:model/Transaction
     * @param abort {Boolean} 
     * @param dbname {String} 
     * @param mode {module:model/Transaction.ModeEnum} 
     * @param readonly {Boolean} 
     * @param type {module:model/Transaction.TypeEnum} 
     */
    constructor(abort, dbname, mode, readonly, type) { 
        
        Transaction.initialize(this, abort, dbname, mode, readonly, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, abort, dbname, mode, readonly, type) { 
        obj['abort'] = abort;
        obj['dbname'] = dbname;
        obj['mode'] = mode;
        obj['readonly'] = readonly;
        obj['type'] = type;
    }

    /**
     * Constructs a <code>Transaction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Transaction} obj Optional instance to populate.
     * @return {module:model/Transaction} The populated <code>Transaction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Transaction();

            if (data.hasOwnProperty('abort')) {
                obj['abort'] = ApiClient.convertToType(data['abort'], 'Boolean');
            }
            if (data.hasOwnProperty('actions')) {
                obj['actions'] = ApiClient.convertToType(data['actions'], [LabeledAction]);
            }
            if (data.hasOwnProperty('dbname')) {
                obj['dbname'] = ApiClient.convertToType(data['dbname'], 'String');
            }
            if (data.hasOwnProperty('debug_level')) {
                obj['debug_level'] = ApiClient.convertToType(data['debug_level'], 'Number');
            }
            if (data.hasOwnProperty('mode')) {
                obj['mode'] = ApiClient.convertToType(data['mode'], 'String');
            }
            if (data.hasOwnProperty('readonly')) {
                obj['readonly'] = ApiClient.convertToType(data['readonly'], 'Boolean');
            }
            if (data.hasOwnProperty('source_dbname')) {
                obj['source_dbname'] = ApiClient.convertToType(data['source_dbname'], 'String');
            }
            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Boolean} abort
 * @default false
 */
Transaction.prototype['abort'] = false;

/**
 * @member {Array.<module:model/LabeledAction>} actions
 */
Transaction.prototype['actions'] = undefined;

/**
 * @member {String} dbname
 * @default ''
 */
Transaction.prototype['dbname'] = '';

/**
 * @member {Number} debug_level
 */
Transaction.prototype['debug_level'] = undefined;

/**
 * @member {module:model/Transaction.ModeEnum} mode
 * @default 'OPEN'
 */
Transaction.prototype['mode'] = 'OPEN';

/**
 * @member {Boolean} readonly
 * @default false
 */
Transaction.prototype['readonly'] = false;

/**
 * @member {String} source_dbname
 */
Transaction.prototype['source_dbname'] = undefined;

/**
 * @member {module:model/Transaction.TypeEnum} type
 * @default 'Transaction'
 */
Transaction.prototype['type'] = 'Transaction';





/**
 * Allowed values for the <code>mode</code> property.
 * @enum {String}
 * @readonly
 */
Transaction['ModeEnum'] = {

    /**
     * value: "OPEN"
     * @const
     */
    "OPEN": "OPEN",

    /**
     * value: "CREATE"
     * @const
     */
    "CREATE": "CREATE",

    /**
     * value: "CREATE_OVERWRITE"
     * @const
     */
    "CREATE_OVERWRITE": "CREATE_OVERWRITE",

    /**
     * value: "OPEN_OR_CREATE"
     * @const
     */
    "OPEN_OR_CREATE": "OPEN_OR_CREATE",

    /**
     * value: "BRANCH"
     * @const
     */
    "BRANCH": "BRANCH",

    /**
     * value: "BRANCH_OVERWRITE"
     * @const
     */
    "BRANCH_OVERWRITE": "BRANCH_OVERWRITE"
};


/**
 * Allowed values for the <code>type</code> property.
 * @enum {String}
 * @readonly
 */
Transaction['TypeEnum'] = {

    /**
     * value: "Transaction"
     * @const
     */
    "Transaction": "Transaction"
};



export default Transaction;

