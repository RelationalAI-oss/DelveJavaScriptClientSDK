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
import AbstractProblem from './AbstractProblem';
import IntegrityConstraintProblemAllOf from './IntegrityConstraintProblemAllOf';

/**
 * The IntegrityConstraintProblem model module.
 * @module model/IntegrityConstraintProblem
 * @version 1.1.8
 */
class IntegrityConstraintProblem {
    /**
     * Constructs a new <code>IntegrityConstraintProblem</code>.
     * @alias module:model/IntegrityConstraintProblem
     * @extends module:model/AbstractProblem
     * @implements module:model/AbstractProblem
     * @implements module:model/IntegrityConstraintProblemAllOf
     * @param type {String} 
     * @param exception {String} 
     */
    constructor(type, exception) { 
        AbstractProblem.initialize(this, type);IntegrityConstraintProblemAllOf.initialize(this, exception);
        IntegrityConstraintProblem.initialize(this, type, exception);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type, exception) { 
        obj['exception'] = exception || '';
    }

    /**
     * Constructs a <code>IntegrityConstraintProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IntegrityConstraintProblem} obj Optional instance to populate.
     * @return {module:model/IntegrityConstraintProblem} The populated <code>IntegrityConstraintProblem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IntegrityConstraintProblem();
            AbstractProblem.constructFromObject(data, obj);
            AbstractProblem.constructFromObject(data, obj);
            IntegrityConstraintProblemAllOf.constructFromObject(data, obj);

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
IntegrityConstraintProblem.prototype['exception'] = '';


// Implement AbstractProblem interface:
/**
 * @member {String} type
 * @default ''
 */
AbstractProblem.prototype['type'] = '';
// Implement IntegrityConstraintProblemAllOf interface:
/**
 * @member {String} exception
 * @default ''
 */
IntegrityConstraintProblemAllOf.prototype['exception'] = '';




export default IntegrityConstraintProblem;

