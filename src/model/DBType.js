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

/**
 * The DBType model module.
 * @module model/DBType
 * @version 1.0.0
 */
class DBType {
    /**
     * Constructs a new <code>DBType</code>.
     * @alias module:model/DBType
     * @param objtp {String} 
     */
    constructor(objtp) { 
        
        DBType.initialize(this, objtp);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, objtp) { 
        obj['objtp'] = objtp;
    }

    /**
     * Constructs a <code>DBType</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/DBType} obj Optional instance to populate.
     * @return {module:model/DBType} The populated <code>DBType</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new DBType();

            if (data.hasOwnProperty('objtp')) {
                obj['objtp'] = ApiClient.convertToType(data['objtp'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} objtp
 * @default ''
 */
DBType.prototype['objtp'] = '';






export default DBType;
