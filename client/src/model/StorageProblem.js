/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.1
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AbstractProblem from './AbstractProblem';

/**
 * The StorageProblem model module.
 * @module model/StorageProblem
 * @version 1.1.1
 */
class StorageProblem {
    /**
     * Constructs a new <code>StorageProblem</code>.
     * @alias module:model/StorageProblem
     * @extends module:model/AbstractProblem
     * @implements module:model/AbstractProblem
     * @param type {String} 
     */
    constructor(type) { 
        AbstractProblem.initialize(this, type);
        StorageProblem.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['exception'] = exception || '';
    }

    /**
     * Constructs a <code>StorageProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/StorageProblem} obj Optional instance to populate.
     * @return {module:model/StorageProblem} The populated <code>StorageProblem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new StorageProblem();
            AbstractProblem.constructFromObject(data, obj);
            AbstractProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('exception')) {
                obj['exception'] = ApiClient.convertToType(data['exception'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} exception
 * @default ''
 */
StorageProblem.prototype['exception'] = '';


// Implement AbstractProblem interface:
/**
 * @member {String} type
 * @default ''
 */
AbstractProblem.prototype['type'] = '';




export default StorageProblem;

