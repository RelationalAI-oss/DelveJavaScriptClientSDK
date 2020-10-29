# RaiCloudSdk.DefaultApi

All URIs are relative to *http://127.0.0.1:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**computeDelete**](DefaultApi.md#computeDelete) | **DELETE** /compute | Delete compute
[**computeGet**](DefaultApi.md#computeGet) | **GET** /compute | List computes
[**computePut**](DefaultApi.md#computePut) | **PUT** /compute | Create compute
[**databaseGet**](DefaultApi.md#databaseGet) | **GET** /database | List databases
[**databasePost**](DefaultApi.md#databasePost) | **POST** /database | Update database
[**userGet**](DefaultApi.md#userGet) | **GET** /user | List users
[**userPut**](DefaultApi.md#userPut) | **PUT** /user | Create user



## computeDelete

> DeleteComputeResponseProtocol computeDelete(deleteComputeRequestProtocol)

Delete compute

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
let deleteComputeRequestProtocol = new RaiCloudSdk.DeleteComputeRequestProtocol(); // DeleteComputeRequestProtocol | Compute to be deleted
apiInstance.computeDelete(deleteComputeRequestProtocol, (error, data, response) => {
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
 **deleteComputeRequestProtocol** | [**DeleteComputeRequestProtocol**](DeleteComputeRequestProtocol.md)| Compute to be deleted | 

### Return type

[**DeleteComputeResponseProtocol**](DeleteComputeResponseProtocol.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## computeGet

> ListComputesResponseProtocol computeGet(opts)

List computes

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
let opts = {
  'id': ["null"], // [String] | 
  'name': ["null"], // [String] | 
  'size': ["null"], // [String] | 
  'state': ["null"] // [String] | 
};
apiInstance.computeGet(opts, (error, data, response) => {
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
 **id** | [**[String]**](String.md)|  | [optional] 
 **name** | [**[String]**](String.md)|  | [optional] 
 **size** | [**[String]**](String.md)|  | [optional] 
 **state** | [**[String]**](String.md)|  | [optional] 

### Return type

[**ListComputesResponseProtocol**](ListComputesResponseProtocol.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## computePut

> CreateComputeResponseProtocol computePut(createComputeRequestProtocol)

Create compute

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
let createComputeRequestProtocol = new RaiCloudSdk.CreateComputeRequestProtocol(); // CreateComputeRequestProtocol | New compute
apiInstance.computePut(createComputeRequestProtocol, (error, data, response) => {
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
 **createComputeRequestProtocol** | [**CreateComputeRequestProtocol**](CreateComputeRequestProtocol.md)| New compute | 

### Return type

[**CreateComputeResponseProtocol**](CreateComputeResponseProtocol.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## databaseGet

> ListDatabasesResponseProtocol databaseGet()

List databases

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
apiInstance.databaseGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ListDatabasesResponseProtocol**](ListDatabasesResponseProtocol.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## databasePost

> databasePost(updateDatabaseRequestProtocol)

Update database

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
let updateDatabaseRequestProtocol = new RaiCloudSdk.UpdateDatabaseRequestProtocol(); // UpdateDatabaseRequestProtocol | Database fields to be updated
apiInstance.databasePost(updateDatabaseRequestProtocol, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **updateDatabaseRequestProtocol** | [**UpdateDatabaseRequestProtocol**](UpdateDatabaseRequestProtocol.md)| Database fields to be updated | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## userGet

> ListUsersResponseProtocol userGet()

List users

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
apiInstance.userGet((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**ListUsersResponseProtocol**](ListUsersResponseProtocol.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## userPut

> CreateUserResponseProtocol userPut(createUserRequestProtocol)

Create user

### Example

```javascript
import RaiCloudSdk from 'rai_cloud_sdk';

let apiInstance = new RaiCloudSdk.DefaultApi();
let createUserRequestProtocol = new RaiCloudSdk.CreateUserRequestProtocol(); // CreateUserRequestProtocol | New user
apiInstance.userPut(createUserRequestProtocol, (error, data, response) => {
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
 **createUserRequestProtocol** | [**CreateUserRequestProtocol**](CreateUserRequestProtocol.md)| New user | 

### Return type

[**CreateUserResponseProtocol**](CreateUserResponseProtocol.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

