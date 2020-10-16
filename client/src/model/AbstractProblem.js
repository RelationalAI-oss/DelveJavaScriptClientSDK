/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.11
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The AbstractProblem model module.
 * @module model/AbstractProblem
 * @version 1.0.11
 */
class AbstractProblem {
    /**
     * Constructs a new <code>AbstractProblem</code>.
     * @alias module:model/AbstractProblem
     * @param type {String} 
     */
    constructor(type) { 
        
        AbstractProblem.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['type'] = type || '';
    }

    /**
     * Constructs a <code>AbstractProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AbstractProblem} obj Optional instance to populate.
     * @return {module:model/AbstractProblem} The populated <code>AbstractProblem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AbstractProblem();

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} type
 * @default ''
 */
AbstractProblem.prototype['type'] = '';






export default AbstractProblem;

