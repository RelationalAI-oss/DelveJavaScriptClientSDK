/**
 * Delve Client SDK
 * This is a Client SDK for Delve API
 *
 * The version of the OpenAPI document: 1.1.6
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';
import FileSyntax from './FileSyntax';

/**
 * The CSVFileSyntax model module.
 * @module model/CSVFileSyntax
 * @version 1.1.6
 */
class CSVFileSyntax {
    /**
     * Constructs a new <code>CSVFileSyntax</code>.
     * @alias module:model/CSVFileSyntax
     * @extends module:model/FileSyntax
     * @implements module:model/FileSyntax
     * @param type {String} 
     */
    constructor(type) { 
        FileSyntax.initialize(this, type);
        CSVFileSyntax.initialize(this, type);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, type) { 
        obj['data_row'] = dataRow || 0;
        obj['delim'] = delim || '';
        obj['escapechar'] = escapechar || '';
        obj['header_row'] = headerRow || 0;
        obj['ignorerepeated'] = ignorerepeated || false;
        obj['normalizenames'] = normalizenames || false;
        obj['quotechar'] = quotechar || '';
    }

    /**
     * Constructs a <code>CSVFileSyntax</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/CSVFileSyntax} obj Optional instance to populate.
     * @return {module:model/CSVFileSyntax} The populated <code>CSVFileSyntax</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new CSVFileSyntax();
            FileSyntax.constructFromObject(data, obj);
            FileSyntax.constructFromObject(data, obj);

            if (data.hasOwnProperty('data_row')) {
                obj['data_row'] = ApiClient.convertToType(data['data_row'], 'Number');
            }
            if (data.hasOwnProperty('delim')) {
                obj['delim'] = ApiClient.convertToType(data['delim'], 'String');
            }
            if (data.hasOwnProperty('escapechar')) {
                obj['escapechar'] = ApiClient.convertToType(data['escapechar'], 'String');
            }
            if (data.hasOwnProperty('header')) {
                obj['header'] = ApiClient.convertToType(data['header'], ['String']);
            }
            if (data.hasOwnProperty('header_row')) {
                obj['header_row'] = ApiClient.convertToType(data['header_row'], 'Number');
            }
            if (data.hasOwnProperty('ignorerepeated')) {
                obj['ignorerepeated'] = ApiClient.convertToType(data['ignorerepeated'], 'Boolean');
            }
            if (data.hasOwnProperty('missingstrings')) {
                obj['missingstrings'] = ApiClient.convertToType(data['missingstrings'], ['String']);
            }
            if (data.hasOwnProperty('normalizenames')) {
                obj['normalizenames'] = ApiClient.convertToType(data['normalizenames'], 'Boolean');
            }
            if (data.hasOwnProperty('quotechar')) {
                obj['quotechar'] = ApiClient.convertToType(data['quotechar'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {Number} data_row
 * @default 0
 */
CSVFileSyntax.prototype['data_row'] = 0;

/**
 * @member {String} delim
 * @default ''
 */
CSVFileSyntax.prototype['delim'] = '';

/**
 * @member {String} escapechar
 * @default ''
 */
CSVFileSyntax.prototype['escapechar'] = '';

/**
 * @member {Array.<String>} header
 */
CSVFileSyntax.prototype['header'] = undefined;

/**
 * @member {Number} header_row
 * @default 0
 */
CSVFileSyntax.prototype['header_row'] = 0;

/**
 * @member {Boolean} ignorerepeated
 * @default false
 */
CSVFileSyntax.prototype['ignorerepeated'] = false;

/**
 * @member {Array.<String>} missingstrings
 */
CSVFileSyntax.prototype['missingstrings'] = undefined;

/**
 * @member {Boolean} normalizenames
 * @default false
 */
CSVFileSyntax.prototype['normalizenames'] = false;

/**
 * @member {String} quotechar
 * @default ''
 */
CSVFileSyntax.prototype['quotechar'] = '';


// Implement FileSyntax interface:
/**
 * @member {String} type
 * @default ''
 */
FileSyntax.prototype['type'] = '';




export default CSVFileSyntax;

