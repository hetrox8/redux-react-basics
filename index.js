const redux = require('redux')
const createStore = redux.createStore

const OderCake = 'OrderCake';
const RestockCake = 'RestockCake';

const initialCake = {
    numOfCake: 10,
}


const orderingCake = () => {
    return {
        type: OderCake,
        quantity: 1,
    }
}

//reducers

const reducer = (state = initialCake, action) => {
    switch(action.type){
        case OderCake:
            return{
                ...state ,
               numOfCake: (state.numOfCake +1)
            }
            default:
                return state
    }
}

const store = createStore(reducer)
console.log('this is the initial state',store.getState())
const unsubscribe = store.subscribe(() => console.log('updated state', store.getState()))

store.dispatch(orderingCake())
store.dispatch(orderingCake())
store.dispatch(orderingCake())


 unsubscribe()