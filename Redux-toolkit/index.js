const store = require('./app/store');
const cakeActions = require('./app/features/cake/cakeSlice').cakeActions;
const iceCreamActions = require('./app/features/icecream/icecreamSlice').iceCreamActions

console.log('this is initial state', store.getState());
const unsubscribe = store.subscribe(() => {});

store.dispatch(cakeActions.order());
store.dispatch(cakeActions.order());
store.dispatch(cakeActions.order());

store.dispatch(cakeActions.restock(3));


store.dispatch(iceCreamActions.ordered())
store.dispatch(iceCreamActions.ordered())

store.dispatch(iceCreamActions.restocked(2))

unsubscribe();
