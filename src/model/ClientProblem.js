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
import AbstractProblem from './AbstractProblem';

/**
 * The ClientProblem model module.
 * @module model/ClientProblem
 * @version 1.0.0
 */
class ClientProblem {
    /**
     * Constructs a new <code>ClientProblem</code>.
     * @alias module:model/ClientProblem
     * @extends module:model/AbstractProblem
     * @implements module:model/AbstractProblem
     * @param objtp {String} 
     */
    constructor(objtp) { 
        AbstractProblem.initialize(this, objtp);
        ClientProblem.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
    }

    /**
     * Constructs a <code>ClientProblem</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ClientProblem} obj Optional instance to populate.
     * @return {module:model/ClientProblem} The populated <code>ClientProblem</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ClientProblem();
            AbstractProblem.constructFromObject(data, obj);
            AbstractProblem.constructFromObject(data, obj);

            if (data.hasOwnProperty('error_code')) {
                obj['error_code'] = ApiClient.convertToType(data['error_code'], 'String');
            }
            if (data.hasOwnProperty('is_error')) {
                obj['is_error'] = ApiClient.convertToType(data['is_error'], 'Boolean');
            }
            if (data.hasOwnProperty('is_exception')) {
                obj['is_exception'] = ApiClient.convertToType(data['is_exception'], 'Boolean');
            }
            if (data.hasOwnProperty('report')) {
                obj['report'] = ApiClient.convertToType(data['report'], 'String');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('path')) {
                obj['path'] = ApiClient.convertToType(data['path'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} error_code
 * @default ''
 */
ClientProblem.prototype['error_code'] = '';

/**
 * @member {Boolean} is_error
 * @default false
 */
ClientProblem.prototype['is_error'] = false;

/**
 * @member {Boolean} is_exception
 * @default false
 */
ClientProblem.prototype['is_exception'] = false;

/**
 * @member {String} report
 * @default ''
 */
ClientProblem.prototype['report'] = '';

/**
 * @member {String} message
 * @default ''
 */
ClientProblem.prototype['message'] = '';

/**
 * @member {String} path
 * @default ''
 */
ClientProblem.prototype['path'] = '';


// Implement AbstractProblem interface:
/**
 * @member {String} objtp
 * @default ''
 */
AbstractProblem.prototype['objtp'] = '';




export default ClientProblem;

