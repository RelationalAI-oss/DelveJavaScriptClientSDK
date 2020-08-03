# DelveClientSdk.Transaction

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**dbname** | **String** |  | [optional] [default to &#39;&#39;]
**mode** | **String** |  | [default to &#39;OPEN&#39;]
**readonly** | **Boolean** |  | [optional] [default to false]
**actions** | [**[LabeledAction]**](LabeledAction.md) |  | [optional] 
**abort** | **Boolean** |  | [optional] [default to false]
**objtp** | **String** |  | [default to &#39;Transaction&#39;]



## Enum: ModeEnum


* `OPEN` (value: `"OPEN"`)

* `CREATE` (value: `"CREATE"`)

* `CREATE_OVERWRITE` (value: `"CREATE_OVERWRITE"`)

* `OPEN_OR_CREATE` (value: `"OPEN_OR_CREATE"`)





## Enum: ObjtpEnum


* `Transaction` (value: `"Transaction"`)




