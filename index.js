const redux = require('redux')
const createStore = redux.createStore
const bindActionCreators = redux.bindActionCreators
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()


//string constants
const OderCake = 'OrderCake';
const RestockCake = 'RestockCake';

const OrderIce = 'OrderIce'
const RestockIce = 'RestockIce'

//initial states of ice
const initialCake = {
    numOfCake: 10,   
}

//initial state of ice
const initialIce = {
    numOfIce: 20
}

//action creators
const orderCake = (qty =1) => {
    return {
        type: OderCake,
        payload: qty,
    }
}

const restockCake = (qty = 1) => {
    return{
        type: RestockCake,
      payload: qty
    }
}



//ice action creators
const orderingIce = (qty = 1) => {
    return{
        type : OrderIce ,
        payload: qty
    }
}


const restockingIce = (qty =1) => {
    return{
        type: RestockIce,
        payload: qty
    }
}

//reducer function
//single reducer
const cakeReducer = (state =initialCake, action) => {
    switch(action.type){
        case OderCake:
            return{
                ...state ,
               numOfCake: (state.numOfCake - 1)
            }
           case RestockCake: 
           return {
            ...state,
            numOfCake: state.numOfCake + action.payload
           }
         
           default:
            return state
    }
}



const iceReducer = (state = initialIce, action) => {
    switch(action.type){
           case OrderIce:
            return{
                ...state,
                numOfIce:(state.numOfIce-1),
            }
            case RestockIce:
                return{
                    ...state,
                    numOfIce: state.numOfIce+action.payload
                }
           default:
            return state
    }
}

const rootReducers = combineReducers ({
    cake: cakeReducer,
    ice : iceReducer,
}) 


//the main store
const store = createStore(rootReducers,applyMiddleware(logger))
// console.log('this is the initial state',store.getState())
const unsubscribe = store.subscribe(() => console.log(' this is  the updated state', store.getState()))


//below are manual dispatching
//  store.dispatch(orderingCake())
//  store.dispatch(orderingCake())
//  store.dispatch(orderingCake())

// store.dispatch(restockCake(3))

const actions = bindActionCreators({orderCake,restockCake, orderingIce,restockingIce},store.dispatch)
//dispatchs for cake
actions.orderCake()
 actions.orderCake()
 actions.orderCake()


 actions.restockCake(3)

//dispatchs for ice

actions.orderingIce()
actions.orderingIce()
actions.restockingIce(2)
 unsubscribe()