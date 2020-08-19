# DelveClientSdk.Transaction

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**abort** | **Boolean** |  | [optional] [default to false]
**actions** | [**[LabeledAction]**](LabeledAction.md) |  | [optional] 
**dbname** | **String** |  | [optional] [default to &#39;&#39;]
**mode** | **String** |  | [default to &#39;OPEN&#39;]
**readonly** | **Boolean** |  | [optional] [default to false]
**sourceDbname** | **String** |  | [optional] [default to &#39;&#39;]
**type** | **String** |  | [default to &#39;Transaction&#39;]



## Enum: ModeEnum


* `OPEN` (value: `"OPEN"`)

* `CREATE` (value: `"CREATE"`)

* `CREATE_OVERWRITE` (value: `"CREATE_OVERWRITE"`)

* `OPEN_OR_CREATE` (value: `"OPEN_OR_CREATE"`)

* `BRANCH` (value: `"BRANCH"`)





## Enum: TypeEnum


* `Transaction` (value: `"Transaction"`)




