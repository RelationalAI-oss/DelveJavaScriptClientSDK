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


import ApiClient from "../ApiClient";
import Transaction from '../model/Transaction';
import TransactionResult from '../model/TransactionResult';

/**
* Default service.
* @module api/DefaultApi
* @version 1.0.0
*/
export default class DefaultApi {

    /**
    * Constructs a new DefaultApi. 
    * @alias module:api/DefaultApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the transactionPost operation.
     * @callback module:api/DefaultApi~transactionPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/TransactionResult} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Issues a transaction to be executed
     * @param {module:model/Transaction} transaction Optional description in *Markdown*
     * @param {module:api/DefaultApi~transactionPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/TransactionResult}
     */
    transactionPost(transaction, callback) {
      let postBody = transaction;
      // verify the required parameter 'transaction' is set
      if (transaction === undefined || transaction === null) {
        throw new Error("Missing the required parameter 'transaction' when calling transactionPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = TransactionResult;
      return this.apiClient.callApi(
        '/transaction', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
