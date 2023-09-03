const redux = require('redux')
const createStore = redux.createStore
const produce = require('immer').produce

//string constant
const UpdateStreet = 'UpdateStreet'

//initial state
const initialState = {
    name: 'suleiman',
    address: {
        city: 'mombasa',
        code: 80100,
        street: 'new york',
        age: 20,
    }
}

//action creator
const updateCity = (age) => {
    return{
        type: UpdateStreet,
        payload: age,
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case UpdateStreet:
            // return{
            //     ...state,
            //      address: {
            //          ...state.address,
            //        age:action.payload
            //      },
            // }

            //using immer 
          return produce(state, (draft) => {  
            draft.address.age = action.payload
          })
            default :
            return state
    }
}

const store = createStore(reducer)
console.log('initial city',store.getState())
unsubscribe = store.subscribe(() => console.log('updated city',store.getState()))

store.dispatch(updateCity(25))
unsubscribe()