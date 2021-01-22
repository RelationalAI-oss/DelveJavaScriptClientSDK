# delve_client_sdk

DelveClientSdk - JavaScript client for delve_client_sdk
This is a Client SDK for Delve API
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.1.8
- Package version: 1.1.8
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen
For more information, please visit [https://www.relational.ai/support](https://www.relational.ai/support)

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install delve_client_sdk --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your delve_client_sdk from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

You can install the library via `git`:

```shell
    npm install RelationalAI-oss/DelveJavaScriptClientSDK --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var DelveClientSdk = require('delve_client_sdk');


var api = new DelveClientSdk.DefaultApi()
var transaction = new DelveClientSdk.Transaction(); // {Transaction} Optional description in *Markdown*
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.transactionPost(transaction, callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://127.0.0.1:8010*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*DelveClientSdk.DefaultApi* | [**transactionPost**](docs/DefaultApi.md#transactionPost) | **POST** /transaction | Issues a transaction to be executed


## Documentation for Models

 - [DelveClientSdk.AbstractProblem](docs/AbstractProblem.md)
 - [DelveClientSdk.Action](docs/Action.md)
 - [DelveClientSdk.ActionResult](docs/ActionResult.md)
 - [DelveClientSdk.Appl](docs/Appl.md)
 - [DelveClientSdk.Area](docs/Area.md)
 - [DelveClientSdk.ArityMismatchError](docs/ArityMismatchError.md)
 - [DelveClientSdk.CSVFileSchema](docs/CSVFileSchema.md)
 - [DelveClientSdk.CSVFileSyntax](docs/CSVFileSyntax.md)
 - [DelveClientSdk.CardinalityAction](docs/CardinalityAction.md)
 - [DelveClientSdk.CardinalityActionResult](docs/CardinalityActionResult.md)
 - [DelveClientSdk.ClientProblem](docs/ClientProblem.md)
 - [DelveClientSdk.CollectProblemsAction](docs/CollectProblemsAction.md)
 - [DelveClientSdk.CollectProblemsActionResult](docs/CollectProblemsActionResult.md)
 - [DelveClientSdk.ComparisonChainError](docs/ComparisonChainError.md)
 - [DelveClientSdk.Cons](docs/Cons.md)
 - [DelveClientSdk.ExceptionProblem](docs/ExceptionProblem.md)
 - [DelveClientSdk.FileSchema](docs/FileSchema.md)
 - [DelveClientSdk.FileSyntax](docs/FileSyntax.md)
 - [DelveClientSdk.FrontProblem](docs/FrontProblem.md)
 - [DelveClientSdk.ICViolation](docs/ICViolation.md)
 - [DelveClientSdk.ImportAction](docs/ImportAction.md)
 - [DelveClientSdk.ImportActionResult](docs/ImportActionResult.md)
 - [DelveClientSdk.InfraError](docs/InfraError.md)
 - [DelveClientSdk.InstallAction](docs/InstallAction.md)
 - [DelveClientSdk.InstallActionResult](docs/InstallActionResult.md)
 - [DelveClientSdk.IntegrityConstraintProblem](docs/IntegrityConstraintProblem.md)
 - [DelveClientSdk.IntegrityConstraintViolation](docs/IntegrityConstraintViolation.md)
 - [DelveClientSdk.JSONFileSchema](docs/JSONFileSchema.md)
 - [DelveClientSdk.JSONFileSyntax](docs/JSONFileSyntax.md)
 - [DelveClientSdk.LabeledAction](docs/LabeledAction.md)
 - [DelveClientSdk.LabeledActionResult](docs/LabeledActionResult.md)
 - [DelveClientSdk.LinkedList](docs/LinkedList.md)
 - [DelveClientSdk.ListEdbAction](docs/ListEdbAction.md)
 - [DelveClientSdk.ListEdbActionResult](docs/ListEdbActionResult.md)
 - [DelveClientSdk.ListSourceAction](docs/ListSourceAction.md)
 - [DelveClientSdk.ListSourceActionResult](docs/ListSourceActionResult.md)
 - [DelveClientSdk.Literal](docs/Literal.md)
 - [DelveClientSdk.LoadData](docs/LoadData.md)
 - [DelveClientSdk.LoadDataAction](docs/LoadDataAction.md)
 - [DelveClientSdk.LoadDataActionResult](docs/LoadDataActionResult.md)
 - [DelveClientSdk.ModifyWorkspaceAction](docs/ModifyWorkspaceAction.md)
 - [DelveClientSdk.ModifyWorkspaceActionResult](docs/ModifyWorkspaceActionResult.md)
 - [DelveClientSdk.Nil](docs/Nil.md)
 - [DelveClientSdk.OutputProblem](docs/OutputProblem.md)
 - [DelveClientSdk.PairAnyValueAnyValue](docs/PairAnyValueAnyValue.md)
 - [DelveClientSdk.ParseAction](docs/ParseAction.md)
 - [DelveClientSdk.ParseActionResult](docs/ParseActionResult.md)
 - [DelveClientSdk.PersistProblem](docs/PersistProblem.md)
 - [DelveClientSdk.Point](docs/Point.md)
 - [DelveClientSdk.QueryAction](docs/QueryAction.md)
 - [DelveClientSdk.QueryActionResult](docs/QueryActionResult.md)
 - [DelveClientSdk.Range](docs/Range.md)
 - [DelveClientSdk.RelKey](docs/RelKey.md)
 - [DelveClientSdk.Relation](docs/Relation.md)
 - [DelveClientSdk.SetOptionsAction](docs/SetOptionsAction.md)
 - [DelveClientSdk.SetOptionsActionResult](docs/SetOptionsActionResult.md)
 - [DelveClientSdk.Source](docs/Source.md)
 - [DelveClientSdk.SyntaxError](docs/SyntaxError.md)
 - [DelveClientSdk.SyntaxNode](docs/SyntaxNode.md)
 - [DelveClientSdk.Token](docs/Token.md)
 - [DelveClientSdk.Transaction](docs/Transaction.md)
 - [DelveClientSdk.TransactionResult](docs/TransactionResult.md)
 - [DelveClientSdk.UndefinedError](docs/UndefinedError.md)
 - [DelveClientSdk.UpdateAction](docs/UpdateAction.md)
 - [DelveClientSdk.UpdateActionResult](docs/UpdateActionResult.md)
 - [DelveClientSdk.WorkspaceLoadProblem](docs/WorkspaceLoadProblem.md)


## Documentation for Authorization

All endpoints do not require authorization.
