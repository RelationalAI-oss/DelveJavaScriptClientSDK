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
 * The CollectProblemsActionAllOf model module.
 * @module model/CollectProblemsActionAllOf
 * @version 1.2.0
 */
class CollectProblemsActionAllOf {
    /**
     * Constructs a new <code>CollectProblemsActionAllOf</code>.
     * @alias module:model/CollectProblemsActionAllOf
     */
    constructor() { 
        
        CollectProblemsActionAllOf.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>CollectProblemsActionAllOf</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CollectProblemsActionAllOf} obj Optional instance to populate.
     * @return {module:model/CollectProblemsActionAllOf} The populated <code>CollectProblemsActionAllOf</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CollectProblemsActionAllOf();

            if (data.hasOwnProperty('dummy')) {
                obj['dummy'] = ApiClient.convertToType(data['dummy'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} dummy
 */
CollectProblemsActionAllOf.prototype['dummy'] = undefined;






export default CollectProblemsActionAllOf;
