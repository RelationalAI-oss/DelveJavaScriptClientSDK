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
import RelDict from './RelDict';

/**
 * The ImportAction model module.
 * @module model/ImportAction
 * @version 1.0.0
 */
class ImportAction {
    /**
     * Constructs a new <code>ImportAction</code>.
     * @alias module:model/ImportAction
     * @extends module:model/Action
     * @implements module:model/Action
     * @param objtp {String} 
     */
    constructor(objtp) { 
        Action.initialize(this, objtp);
        ImportAction.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
    }

    /**
     * Constructs a <code>ImportAction</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ImportAction} obj Optional instance to populate.
     * @return {module:model/ImportAction} The populated <code>ImportAction</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ImportAction();
            Action.constructFromObject(data, obj);
            Action.constructFromObject(data, obj);

            if (data.hasOwnProperty('inputs')) {
                obj['inputs'] = RelDict.constructFromObject(data['inputs']);
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/RelDict} inputs
 */
ImportAction.prototype['inputs'] = undefined;


// Implement Action interface:
/**
 * @member {String} objtp
 * @default ''
 */
Action.prototype['objtp'] = '';




export default ImportAction;
