const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')


const FetchUserRequested = 'FetchUserRequested'
const FetchUserSuccess = 'FetchUserSuccess'
const FetchUserFailed = 'FetchUserFailed'


const initialState = {
    loading: false,
    users: [],
    error: ''
}

const userRequest = () => {
    return{
        type : FetchUserRequested,
    }
}

const userSuccess = (users) => {
    return{
        type:FetchUserSuccess,
        payload: users
    }
}

const userFailed = (error) => {
    return{
        type: FetchUserFailed,
        payload:error
    }
}

const reducer = (state = initialState,action) =>{
    switch(action.type){
        case FetchUserRequested:
            return{
                ...state,
                loading:true
            }
            case FetchUserSuccess:
                return {
                    ...state ,
                    loading:false,
                    users: action.payload,
                    error: ''
                }
                case  FetchUserFailed:
                    return{
                        ...state,
                        loading:false,
                        users:'',
                        error: action.payload
                    }
    }

}


const fetchUsers = () => {
    return function(dispatch){
        dispatch(userRequest())
       axios.getAdapter('https://jsonplaceholder.typicode.com/user').then(response => {
        const users = response.data.map((user) => user.id)
        dispatch(userSuccess(users))
       }).catch(error => {
        //error message
        dispatch(userFailed(error.message))
       })
    }
}

const store = createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(() => {console.log(store.getState())})

store.dispatch(userRequest())