var when = function() {
  var args = arguments;  // the functions to execute first
  return {
    then: function(done) {
      var counter = 0;
      for(var i = 0; i < args.length; i++) {
        // call each function with a function to call on done
        args[i](function() {
          counter++;
          if(counter === args.length) {  // all functions have notified they're done
            done();
          }
        });
      }
    }
  };
};

var myDataStore = {};

when(
  function(done) {
    console.log('in first');
    myDataStore.first = ['Bay Emmar', 'Jack Sparrow']
    console.log(myDataStore);
    done()
  },
  function(done) {
    console.log('in second');
    myDataStore.second = 'Second Item'
    console.log(myDataStore);
    console.log("************ I am waiting here *************");
    setTimeout(done, 5000);
  },
  function(done) {
    console.log('in third');
    myDataStore.third = [{'name': 'Drake Ramoray'}, {'name': 'Ragina Phalangie'}]
    console.log(myDataStore);
    done()
  }
).then(function() {
  console.log('this gets called in the end!');
  console.log(myDataStore);
});
