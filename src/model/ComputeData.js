/**
 * RAI Cloud SDK
 * This is a Client SDK for RAI Cloud
 *
 * The version of the OpenAPI document: 1.1.0
 * Contact: support@relational.ai
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The ComputeData model module.
 * @module model/ComputeData
 * @version 1.1.0
 */
class ComputeData {
    /**
     * Constructs a new <code>ComputeData</code>.
     * @alias module:model/ComputeData
     */
    constructor() { 
        
        ComputeData.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ComputeData</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ComputeData} obj Optional instance to populate.
     * @return {module:model/ComputeData} The populated <code>ComputeData</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ComputeData();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('get_etag')) {
                obj['get_etag'] = ApiClient.convertToType(data['get_etag'], 'String');
            }
            if (data.hasOwnProperty('accountName')) {
                obj['accountName'] = ApiClient.convertToType(data['accountName'], 'String');
            }
            if (data.hasOwnProperty('computeId')) {
                obj['computeId'] = ApiClient.convertToType(data['computeId'], 'String');
            }
            if (data.hasOwnProperty('createdBy')) {
                obj['createdBy'] = ApiClient.convertToType(data['createdBy'], 'String');
            }
            if (data.hasOwnProperty('computeName')) {
                obj['computeName'] = ApiClient.convertToType(data['computeName'], 'String');
            }
            if (data.hasOwnProperty('computeSize')) {
                obj['computeSize'] = ApiClient.convertToType(data['computeSize'], 'String');
            }
            if (data.hasOwnProperty('computeRegion')) {
                obj['computeRegion'] = ApiClient.convertToType(data['computeRegion'], 'String');
            }
            if (data.hasOwnProperty('infrastructure')) {
                obj['infrastructure'] = ApiClient.convertToType(data['infrastructure'], 'String');
            }
            if (data.hasOwnProperty('computeState')) {
                obj['computeState'] = ApiClient.convertToType(data['computeState'], 'String');
            }
            if (data.hasOwnProperty('requestedOn')) {
                obj['requestedOn'] = ApiClient.convertToType(data['requestedOn'], 'String');
            }
            if (data.hasOwnProperty('createdOn')) {
                obj['createdOn'] = ApiClient.convertToType(data['createdOn'], 'String');
            }
            if (data.hasOwnProperty('deletedOn')) {
                obj['deletedOn'] = ApiClient.convertToType(data['deletedOn'], 'String');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
        }
        return obj;
    }


}

/**
 * @member {String} id
 */
ComputeData.prototype['id'] = undefined;

/**
 * @member {String} get_etag
 */
ComputeData.prototype['get_etag'] = undefined;

/**
 * @member {String} accountName
 */
ComputeData.prototype['accountName'] = undefined;

/**
 * @member {String} computeId
 */
ComputeData.prototype['computeId'] = undefined;

/**
 * @member {String} createdBy
 */
ComputeData.prototype['createdBy'] = undefined;

/**
 * @member {String} computeName
 */
ComputeData.prototype['computeName'] = undefined;

/**
 * @member {String} computeSize
 */
ComputeData.prototype['computeSize'] = undefined;

/**
 * @member {String} computeRegion
 */
ComputeData.prototype['computeRegion'] = undefined;

/**
 * @member {String} infrastructure
 */
ComputeData.prototype['infrastructure'] = undefined;

/**
 * @member {String} computeState
 */
ComputeData.prototype['computeState'] = undefined;

/**
 * @member {String} requestedOn
 */
ComputeData.prototype['requestedOn'] = undefined;

/**
 * @member {String} createdOn
 */
ComputeData.prototype['createdOn'] = undefined;

/**
 * @member {String} deletedOn
 */
ComputeData.prototype['deletedOn'] = undefined;

/**
 * @member {String} message
 */
ComputeData.prototype['message'] = undefined;






export default ComputeData;

