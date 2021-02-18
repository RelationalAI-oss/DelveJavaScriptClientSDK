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
import Action from './Action';
import ParseActionAllOf from './ParseActionAllOf';
import Source from './Source';

/**
 * The ParseAction model module.
 * @module model/ParseAction
 * @version 1.2.0
 */
class ParseAction {
    /**
     * Constructs a new <code>ParseAction</code>.
     * @alias module:model/ParseAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @implements module:model/ParseActionAllOf
     * @param type {String} 
     * @param nonterm {String} 
     * @param source {module:model/Source} 
     */
    constructor(type, nonterm, source) { 
        Action.initialize(this, type);ParseActionAllOf.initialize(this, nonterm, source);
        ParseAction.initialize(this, type, nonterm, source);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type, nonterm, source) { 
        obj['nonterm'] = nonterm || '';
        obj['source'] = source;
    }

    /**
     * Constructs a <code>ParseAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ParseAction} obj Optional instance to populate.
     * @return {module:model/ParseAction} The populated <code>ParseAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ParseAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);
            ParseActionAllOf.constructFromObject(data, obj);

            if (data.hasOwnProperty('nonterm')) {
                obj['nonterm'] = ApiClient.convertToType(data['nonterm'], 'String');
            }
            if (data.hasOwnProperty('source')) {
                obj['source'] = Source.constructFromObject(data['source']);
            }
        }
        return obj;
    }


}

/**
 * @member {String} nonterm
 * @default ''
 */
ParseAction.prototype['nonterm'] = '';

/**
 * @member {module:model/Source} source
 */
ParseAction.prototype['source'] = undefined;


// Implement Action interface:
/**
 * @member {String} type
 * @default ''
 */
Action.prototype['type'] = '';
// Implement ParseActionAllOf interface:
/**
 * @member {String} nonterm
 * @default ''
 */
ParseActionAllOf.prototype['nonterm'] = '';
/**
 * @member {module:model/Source} source
 */
ParseActionAllOf.prototype['source'] = undefined;




export default ParseAction;

