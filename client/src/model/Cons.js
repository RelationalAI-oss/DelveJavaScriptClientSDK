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
import LinkedList from './LinkedList';
import SyntaxNode from './SyntaxNode';

/**
 * The Cons model module.
 * @module model/Cons
 * @version 1.1.7
 */
class Cons {
    /**
     * Constructs a new <code>Cons</code>.
     * @alias module:model/Cons
     * @extends module:model/LinkedList
     * @implements module:model/LinkedList
     * @param type {String} 
     */
    constructor(type) { 
        LinkedList.initialize(this, type);
        Cons.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['head'] = head;
        obj['tail'] = tail;
    }

    /**
     * Constructs a <code>Cons</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Cons} obj Optional instance to populate.
     * @return {module:model/Cons} The populated <code>Cons</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Cons();
            LinkedList.constructFromObject(data, obj);
            LinkedList.constructFromObject(data, obj);

            if (data.hasOwnProperty('head')) {
                obj['head'] = SyntaxNode.constructFromObject(data['head']);
            }
            if (data.hasOwnProperty('tail')) {
                obj['tail'] = LinkedList.constructFromObject(data['tail']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/SyntaxNode} head
 */
Cons.prototype['head'] = undefined;

/**
 * @member {module:model/LinkedList} tail
 */
Cons.prototype['tail'] = undefined;


// Implement LinkedList interface:
/**
 * @member {String} type
 * @default ''
 */
LinkedList.prototype['type'] = '';




export default Cons;

