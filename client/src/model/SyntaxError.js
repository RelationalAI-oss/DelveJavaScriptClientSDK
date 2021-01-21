/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.7
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import AbstractProblem from './AbstractProblem';
import LinkedList from './LinkedList';
import SyntaxNode from './SyntaxNode';

/**
 * The SyntaxError model module.
 * @module model/SyntaxError
 * @version 1.1.7
 */
class SyntaxError {
    /**
     * Constructs a new <code>SyntaxError</code>.
     * @alias module:model/SyntaxError
     * @extends module:model/AbstractProblem
     * @implements module:model/AbstractProblem
     * @param type {String} 
     */
    constructor(type) { 
        AbstractProblem.initialize(this, type);
        SyntaxError.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['node'] = node;
        obj['trace'] = trace;
    }

    /**
     * Constructs a <code>SyntaxError</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/SyntaxError} obj Optional instance to populate.
     * @return {module:model/SyntaxError} The populated <code>SyntaxError</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new SyntaxError();
            AbstractProblem.constructFromObject(data, obj);
            AbstractProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('next')) {
                obj['next'] = SyntaxNode.constructFromObject(data['next']);
            }
            if (data.hasOwnProperty('node')) {
                obj['node'] = SyntaxNode.constructFromObject(data['node']);
            }
            if (data.hasOwnProperty('trace')) {
                obj['trace'] = LinkedList.constructFromObject(data['trace']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/SyntaxNode} next
 */
SyntaxError.prototype['next'] = undefined;

/**
 * @member {module:model/SyntaxNode} node
 */
SyntaxError.prototype['node'] = undefined;

/**
 * @member {module:model/LinkedList} trace
 */
SyntaxError.prototype['trace'] = undefined;


// Implement AbstractProblem interface:
/**
 * @member {String} type
 * @default ''
 */
AbstractProblem.prototype['type'] = '';




export default SyntaxError;

