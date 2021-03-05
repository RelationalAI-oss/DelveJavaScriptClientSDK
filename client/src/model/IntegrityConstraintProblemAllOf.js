/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.2.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The IntegrityConstraintProblemAllOf model module.
 * @module model/IntegrityConstraintProblemAllOf
 * @version 1.2.0
 */
class IntegrityConstraintProblemAllOf {
    /**
     * Constructs a new <code>IntegrityConstraintProblemAllOf</code>.
     * @alias module:model/IntegrityConstraintProblemAllOf
     * @param exception {String} 
     */
    constructor(exception) { 
        
        IntegrityConstraintProblemAllOf.initialize(this, exception);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, exception) { 
        obj['exception'] = exception || '';
    }

    /**
     * Constructs a <code>IntegrityConstraintProblemAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/IntegrityConstraintProblemAllOf} obj Optional instance to populate.
     * @return {module:model/IntegrityConstraintProblemAllOf} The populated <code>IntegrityConstraintProblemAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new IntegrityConstraintProblemAllOf();

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
IntegrityConstraintProblemAllOf.prototype['exception'] = '';






export default IntegrityConstraintProblemAllOf;

