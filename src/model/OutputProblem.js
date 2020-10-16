/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.9
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
 * The OutputProblem model module.
 * @module model/OutputProblem
 * @version 1.0.9
 */
class OutputProblem {
    /**
     * Constructs a new <code>OutputProblem</code>.
     * @alias module:model/OutputProblem
     * @extends module:model/AbstractProblem
     * @implements module:model/AbstractProblem
     * @param type {String} 
     */
    constructor(type) { 
        AbstractProblem.initialize(this, type);
        OutputProblem.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['exception'] = exception || '';
        obj['name'] = name || '';
    }

    /**
     * Constructs a <code>OutputProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/OutputProblem} obj Optional instance to populate.
     * @return {module:model/OutputProblem} The populated <code>OutputProblem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new OutputProblem();
            AbstractProblem.constructFromObject(data, obj);
            AbstractProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('exception')) {
                obj['exception'] = ApiClient.convertToType(data['exception'], 'String');
            }
            if (data.hasOwnProperty('exception_stacktrace')) {
                obj['exception_stacktrace'] = ApiClient.convertToType(data['exception_stacktrace'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} exception
 * @default ''
 */
OutputProblem.prototype['exception'] = '';

/**
 * @member {String} exception_stacktrace
 */
OutputProblem.prototype['exception_stacktrace'] = undefined;

/**
 * @member {String} name
 * @default ''
 */
OutputProblem.prototype['name'] = '';


// Implement AbstractProblem interface:
/**
 * @member {String} type
 * @default ''
 */
AbstractProblem.prototype['type'] = '';




export default OutputProblem;

