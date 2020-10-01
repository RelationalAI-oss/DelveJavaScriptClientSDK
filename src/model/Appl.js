/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.5
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
 * The Appl model module.
 * @module model/Appl
 * @version 1.0.5
 */
class Appl {
    /**
     * Constructs a new <code>Appl</code>.
     * @alias module:model/Appl
     * @extends module:model/SyntaxNode
     * @implements module:model/SyntaxNode
     * @param type {String} 
     */
    constructor(type) { 
        SyntaxNode.initialize(this, type);
        Appl.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['error'] = error;
        obj['missing'] = missing;
        obj['range'] = range;
        obj['symbol'] = symbol;
    }

    /**
     * Constructs a <code>Appl</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Appl} obj Optional instance to populate.
     * @return {module:model/Appl} The populated <code>Appl</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Appl();
            SyntaxNode.constructFromObject(data, obj);
            SyntaxNode.constructFromObject(data, obj);

            if (data.hasOwnProperty('arguments')) {
                obj['arguments'] = ApiClient.convertToType(data['arguments'], [SyntaxNode]);
            }
            if (data.hasOwnProperty('error')) {
                obj['error'] = ApiClient.convertToType(data['error'], 'Boolean');
            }
            if (data.hasOwnProperty('missing')) {
                obj['missing'] = ApiClient.convertToType(data['missing'], 'Boolean');
            }
            if (data.hasOwnProperty('range')) {
                obj['range'] = Range.constructFromObject(data['range']);
            }
            if (data.hasOwnProperty('symbol')) {
                obj['symbol'] = ApiClient.convertToType(data['symbol'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Array.<module:model/SyntaxNode>} arguments
 */
Appl.prototype['arguments'] = undefined;

/**
 * @member {Boolean} error
 * @default false
 */
Appl.prototype['error'] = false;

/**
 * @member {Boolean} missing
 * @default false
 */
Appl.prototype['missing'] = false;

/**
 * @member {module:model/Range} range
 */
Appl.prototype['range'] = undefined;

/**
 * @member {String} symbol
 * @default ''
 */
Appl.prototype['symbol'] = '';


// Implement SyntaxNode interface:
/**
 * @member {String} type
 * @default ''
 */
SyntaxNode.prototype['type'] = '';




export default Appl;

