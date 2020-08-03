/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import Action from './Action';
import Source from './Source';

/**
 * The ParseAction model module.
 * @module model/ParseAction
 * @version 1.0.0
 */
class ParseAction {
    /**
     * Constructs a new <code>ParseAction</code>.
     * @alias module:model/ParseAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param objtp {String} 
     */
    constructor(objtp) { 
        Action.initialize(this, objtp);
        ParseAction.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
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
 * @member {String} objtp
 * @default ''
 */
Action.prototype['objtp'] = '';




export default ParseAction;

