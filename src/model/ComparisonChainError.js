/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.5
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AnyType from './AnyType';
import FrontProblem from './FrontProblem';
import Range from './Range';

/**
 * The ComparisonChainError model module.
 * @module model/ComparisonChainError
 * @version 1.0.5
 */
class ComparisonChainError {
    /**
     * Constructs a new <code>ComparisonChainError</code>.
     * @alias module:model/ComparisonChainError
     * @extends module:model/FrontProblem
     * @implements module:model/FrontProblem
     * @param type {String} 
     */
    constructor(type) { 
        FrontProblem.initialize(this, type);
        ComparisonChainError.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['msg'] = msg;
        obj['range'] = range;
    }

    /**
     * Constructs a <code>ComparisonChainError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ComparisonChainError} obj Optional instance to populate.
     * @return {module:model/ComparisonChainError} The populated <code>ComparisonChainError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ComparisonChainError();
            FrontProblem.constructFromObject(data, obj);
            FrontProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('msg')) {
                obj['msg'] = ApiClient.convertToType(data['msg'], 'String');
            }
            if (data.hasOwnProperty('node')) {
                obj['node'] = ApiClient.convertToType(data['node'], AnyType);
            }
            if (data.hasOwnProperty('range')) {
                obj['range'] = Range.constructFromObject(data['range']);
            }
        }
        return obj;
    }


}

/**
 * @member {String} msg
 * @default ''
 */
ComparisonChainError.prototype['msg'] = '';

/**
 * @member {module:model/AnyType} node
 */
ComparisonChainError.prototype['node'] = undefined;

/**
 * @member {module:model/Range} range
 */
ComparisonChainError.prototype['range'] = undefined;


// Implement FrontProblem interface:
/**
 * @member {String} type
 * @default ''
 */
FrontProblem.prototype['type'] = '';




export default ComparisonChainError;

