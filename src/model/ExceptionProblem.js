/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.8
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
 * The ExceptionProblem model module.
 * @module model/ExceptionProblem
 * @version 1.0.8
 */
class ExceptionProblem {
    /**
     * Constructs a new <code>ExceptionProblem</code>.
     * @alias module:model/ExceptionProblem
     * @extends module:model/AbstractProblem
     * @implements module:model/AbstractProblem
     * @param type {String} 
     */
    constructor(type) { 
        AbstractProblem.initialize(this, type);
        ExceptionProblem.initialize(this, type);
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
     * Constructs a <code>ExceptionProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ExceptionProblem} obj Optional instance to populate.
     * @return {module:model/ExceptionProblem} The populated <code>ExceptionProblem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ExceptionProblem();
            AbstractProblem.constructFromObject(data, obj);
            AbstractProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('exception')) {
                obj['exception'] = ApiClient.convertToType(data['exception'], 'String');
            }
            if (data.hasOwnProperty('exception_stacktrace')) {
                obj['exception_stacktrace'] = ApiClient.convertToType(data['exception_stacktrace'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} exception
 * @default ''
 */
ExceptionProblem.prototype['exception'] = '';

/**
 * @member {String} exception_stacktrace
 */
ExceptionProblem.prototype['exception_stacktrace'] = undefined;


// Implement AbstractProblem interface:
/**
 * @member {String} type
 * @default ''
 */
AbstractProblem.prototype['type'] = '';




export default ExceptionProblem;

