/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.4
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The SyntaxNode model module.
 * @module model/SyntaxNode
 * @version 1.0.4
 */
class SyntaxNode {
    /**
     * Constructs a new <code>SyntaxNode</code>.
     * @alias module:model/SyntaxNode
     * @param type {String} 
     */
    constructor(type) { 
        
        SyntaxNode.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['type'] = type;
    }

    /**
     * Constructs a <code>SyntaxNode</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SyntaxNode} obj Optional instance to populate.
     * @return {module:model/SyntaxNode} The populated <code>SyntaxNode</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SyntaxNode();

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
SyntaxNode.prototype['type'] = '';






export default SyntaxNode;

