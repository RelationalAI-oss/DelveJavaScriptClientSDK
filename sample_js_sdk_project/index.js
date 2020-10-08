var RaiDbSdk = require('rai_db_sdk');


var api = new RaiDbSdk.DefaultApi()

function createDatabase(dbname, overwrite, callback) {

  var transaction = new RaiDbSdk.Transaction(); // {Transaction} Optional description in *Markdown*
  transaction.mode = overwrite ? RaiDbSdk.Transaction.ModeEnum.CREATE_OVERWRITE : RaiDbSdk.Transaction.ModeEnum.CREATE;
  transaction.dbname = dbname;
  transaction.actions = [];

  // transaction.
  return api.transactionPost(transaction, callback);
}

function runAction(dbname, action, isReadOnly, mode, callback, name) {
  var transaction = new RaiDbSdk.Transaction(); // {Transaction} Optional description in *Markdown*
  transaction.mode = mode;
  transaction.dbname = dbname;
  transaction.readonly = isReadOnly || true;

  var labeledAction = new RaiDbSdk.LabeledAction();
  labeledAction.name = name || 'single';
  labeledAction.action = action;

  transaction.actions = [];
  transaction.actions.push(labeledAction);

  // transaction.
  return api.transactionPost(transaction, function(error, data, response) {
    callback(error, data.actions[0].result, response);
  });
}

function query(dbname, queryString, callback, outputs, inputs, persist, path, name, isReadOnly) {
  var action = new RaiDbSdk.QueryAction();

  action.source = new RaiDbSdk.Source();
  action.source.name = name || "query";
  action.source.path = path || "";
  action.source.value = queryString;

  action.inputs = inputs || [];
  action.outputs = outputs || [];
  action.persist = persist || [];
  action.type = 'QueryAction';

  return runAction(dbname, action, isReadOnly, RaiDbSdk.Transaction.ModeEnum.OPEN, callback);
}

function callback_gen(apiname){
  return function(error, data, response) {
    if (error || (data.problems && data.problems.length > 0)) {
      if(error) {
        console.error(apiname + ' API call error: ' + error);
      } else {
        console.error(apiname + ' API call error: ' + data);
      }
    } else {
      console.log(apiname + ' API called successfully. Returned data: ' + data);
    }
  }
};

function makeDbName(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// dbname = makeDbName(10)
// createDatabase(dbname, false, function(error, data, response) {
//   callback_gen("create_database")(error, data, response);
//   queryString = "def result = 1";
//   outputs = ["result"];
//   query(dbname, queryString, callback_gen("q1"), outputs);
// });

var dbname = "tictactoe_db";

moves = [
  [1,3,"o"],
  [1,2,"x"],
  [1,1,"o"],
  [2,3,"x"],
  [2,2,"o"],
  [3,3,"x"],
  [3,1,"o"],
  [3,2,"x"],
]

var res = []
idx = 0
while(res.length < 1 && idx < moves.length){

  var queryString = `
  ic game_already_has_a_winner{
      not(win(test_board1, "x") or win(test_board1, "o"))
  }

  ic cats_game {
      exists(x y: test_board1(x, y, "-"))
  }
  `;
  query(dbname, queryString, callback_gen("q1"));

  ++idx;
}

var outputs = ["result"];
