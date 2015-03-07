/* @flow */

var Reflux = require('reflux');

var data = {};

// Creating an Action
var statusUpdate = Reflux.createAction();
statusUpdate(data); // Invokes the action statusUpdate
statusUpdate.triggerAsync(data); // same effect as above
statusUpdate.trigger(data);
statusUpdate.sync = true;

Reflux.createAction({
  children: ["progressed","completed","failed"]
});

Reflux.createAction({
  asyncResult: true,
  children: ["progressed"]
});

// Creating Actions
var Actions1 = Reflux.createActions([
  "statusUpdate",
  "statusEdited",
  "statusAdded"
]);

// Actions object now contains the actions
// with the names given in the array above
// that may be invoked as usual
(Actions1.statusUpdate: RefluxAction)();

// this creates 'load', 'load.completed' and 'load.failed'
var Actions2 = Reflux.createActions({
  "load": {children: ["completed","failed"]}
});

var someAsyncOperation = () => Promise.cast('value'); // dummy promise
var asyncResultAction: RefluxAction = Actions2.load;

// when 'load' is triggered, call async operation and trigger related actions
asyncResultAction.listen( function() {
  // By default, the listener is bound to the action
  // so we can access child actions using 'this'
  someAsyncOperation(arguments)
        .then(asyncResultAction.completed)
        .catch(asyncResultAction.failed);
});

asyncResultAction.listen( function(arguments) {
    asyncResultAction.promise( someAsyncOperation(arguments) );
});

asyncResultAction.listenAndPromise( someAsyncOperation );

statusUpdate.preEmit = function () { console.log(arguments); };
statusUpdate.shouldEmit = function(value) {
    return value > 0;
};

var action = Reflux.createAction({
  preEmit: function(){},
  shouldEmit: function(){}
});

// Creates a DataStore
var statusStore = Reflux.createStore({

  // Initial setup
  init: function() {
    // Register statusUpdate action
    this.listenTo(statusUpdate, this.output);
  },

  // Callback
  output: function(flag) {
    var status = flag ? 'ONLINE' : 'OFFLINE';
    // Pass on to listeners
    this.trigger(status);
  }

});

statusStore.listen(function(status) {
    console.log('status: ', status);
});
