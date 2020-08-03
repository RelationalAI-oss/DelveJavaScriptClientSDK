# DelveClientSdk.DefaultApi

All URIs are relative to *http://127.0.0.1:8010*

Method | HTTP request | Description
------------- | ------------- | -------------
[**transactionPost**](DefaultApi.md#transactionPost) | **POST** /transaction | Issues a transaction to be executed



## transactionPost

> TransactionResult transactionPost(transaction)

Issues a transaction to be executed

### Example

```javascript
import DelveClientSdk from 'delve_client_sdk';

let apiInstance = new DelveClientSdk.DefaultApi();
let transaction = new DelveClientSdk.Transaction(); // Transaction | Optional description in *Markdown*
apiInstance.transactionPost(transaction, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **transaction** | [**Transaction**](Transaction.md)| Optional description in *Markdown* | 

### Return type

[**TransactionResult**](TransactionResult.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

