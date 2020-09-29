/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.3
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Range from './Range';
import SyntaxNode from './SyntaxNode';

/**
 * The Token model module.
 * @module model/Token
 * @version 1.0.3
 */
class Token {
    /**
     * Constructs a new <code>Token</code>.
     * @alias module:model/Token
     * @extends module:model/SyntaxNode
     * @implements module:model/SyntaxNode
     * @param type {String} 
     */
    constructor(type) { 
        SyntaxNode.initialize(this, type);
        Token.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['range'] = range;
        obj['value'] = value;
    }

    /**
     * Constructs a <code>Token</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Token} obj Optional instance to populate.
     * @return {module:model/Token} The populated <code>Token</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Token();
            SyntaxNode.constructFromObject(data, obj);
            SyntaxNode.constructFromObject(data, obj);

            if (data.hasOwnProperty('range')) {
                obj['range'] = Range.constructFromObject(data['range']);
            }
            if (data.hasOwnProperty('value')) {
                obj['value'] = ApiClient.convertToType(data['value'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Range} range
 */
Token.prototype['range'] = undefined;

/**
 * @member {String} value
 * @default ''
 */
Token.prototype['value'] = '';


// Implement SyntaxNode interface:
/**
 * @member {String} type
 * @default ''
 */
SyntaxNode.prototype['type'] = '';




export default Token;

