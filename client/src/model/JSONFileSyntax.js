/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.5
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import FileSyntax from './FileSyntax';

/**
 * The JSONFileSyntax model module.
 * @module model/JSONFileSyntax
 * @version 1.1.5
 */
class JSONFileSyntax {
    /**
     * Constructs a new <code>JSONFileSyntax</code>.
     * @alias module:model/JSONFileSyntax
     * @extends module:model/FileSyntax
     * @implements module:model/FileSyntax
     * @param type {String} 
     */
    constructor(type) { 
        FileSyntax.initialize(this, type);
        JSONFileSyntax.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
    }

    /**
     * Constructs a <code>JSONFileSyntax</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/JSONFileSyntax} obj Optional instance to populate.
     * @return {module:model/JSONFileSyntax} The populated <code>JSONFileSyntax</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new JSONFileSyntax();
            FileSyntax.constructFromObject(data, obj);
            FileSyntax.constructFromObject(data, obj);

        }
        return obj;
    }


}


// Implement FileSyntax interface:
/**
 * @member {String} type
 * @default ''
 */
FileSyntax.prototype['type'] = '';




export default JSONFileSyntax;

