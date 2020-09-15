# DelveClientSdk.Transaction

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**abort** | **Boolean** |  | [default to false]
**actions** | [**[LabeledAction]**](LabeledAction.md) |  | [optional] 
**dbname** | **String** |  | [default to &#39;&#39;]
**debugLevel** | **Number** |  | [default to 0]
**mode** | **String** |  | [default to &#39;OPEN&#39;]
**readonly** | **Boolean** |  | [default to false]
**sourceDbname** | **String** |  | [optional] 
**type** | **String** |  | [default to &#39;Transaction&#39;]



## Enum: ModeEnum


* `OPEN` (value: `"OPEN"`)

* `CREATE` (value: `"CREATE"`)

* `CREATE_OVERWRITE` (value: `"CREATE_OVERWRITE"`)

* `OPEN_OR_CREATE` (value: `"OPEN_OR_CREATE"`)

* `BRANCH` (value: `"BRANCH"`)

* `BRANCH_OVERWRITE` (value: `"BRANCH_OVERWRITE"`)





## Enum: TypeEnum


* `Transaction` (value: `"Transaction"`)




