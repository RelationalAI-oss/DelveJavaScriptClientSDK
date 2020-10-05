/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import FrontProblem from './FrontProblem';
import Range from './Range';

/**
 * The UndefinedError model module.
 * @module model/UndefinedError
 * @version 1.0.7
 */
class UndefinedError {
    /**
     * Constructs a new <code>UndefinedError</code>.
     * @alias module:model/UndefinedError
     * @extends module:model/FrontProblem
     * @implements module:model/FrontProblem
     * @param type {String} 
     */
    constructor(type) { 
        FrontProblem.initialize(this, type);
        UndefinedError.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['range'] = range;
        obj['var'] = _var || '';
    }

    /**
     * Constructs a <code>UndefinedError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UndefinedError} obj Optional instance to populate.
     * @return {module:model/UndefinedError} The populated <code>UndefinedError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UndefinedError();
            FrontProblem.constructFromObject(data, obj);
            FrontProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('range')) {
                obj['range'] = Range.constructFromObject(data['range']);
            }
            if (data.hasOwnProperty('var')) {
                obj['var'] = ApiClient.convertToType(data['var'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Range} range
 */
UndefinedError.prototype['range'] = undefined;

/**
 * @member {String} var
 * @default ''
 */
UndefinedError.prototype['var'] = '';


// Implement FrontProblem interface:
/**
 * @member {String} type
 * @default ''
 */
FrontProblem.prototype['type'] = '';




export default UndefinedError;

