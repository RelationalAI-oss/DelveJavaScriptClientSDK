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
import Range from './Range';
import SyntaxNode from './SyntaxNode';

/**
 * The Literal model module.
 * @module model/Literal
 * @version 1.0.4
 */
class Literal {
    /**
     * Constructs a new <code>Literal</code>.
     * @alias module:model/Literal
     * @extends module:model/SyntaxNode
     * @implements module:model/SyntaxNode
     * @param type {String} 
     */
    constructor(type) { 
        SyntaxNode.initialize(this, type);
        Literal.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['missing'] = missing;
        obj['range'] = range;
        obj['value'] = value;
    }

    /**
     * Constructs a <code>Literal</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Literal} obj Optional instance to populate.
     * @return {module:model/Literal} The populated <code>Literal</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Literal();
            SyntaxNode.constructFromObject(data, obj);
            SyntaxNode.constructFromObject(data, obj);

            if (data.hasOwnProperty('missing')) {
                obj['missing'] = ApiClient.convertToType(data['missing'], 'Boolean');
            }
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
 * @member {Boolean} missing
 * @default false
 */
Literal.prototype['missing'] = false;

/**
 * @member {module:model/Range} range
 */
Literal.prototype['range'] = undefined;

/**
 * @member {String} value
 * @default ''
 */
Literal.prototype['value'] = '';


// Implement SyntaxNode interface:
/**
 * @member {String} type
 * @default ''
 */
SyntaxNode.prototype['type'] = '';




export default Literal;

