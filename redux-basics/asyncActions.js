const redux = require('redux');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require('redux-thunk').default;
const axios = require('axios');

const FETCH_USER_REQUESTED = 'FETCH_USER_REQUESTED';
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
const FETCH_USER_FAILED = 'FETCH_USER_FAILED';

const initialState = {
  loading: false,
  users: [],
  error: ''
};

const userRequest = () => ({
  type: FETCH_USER_REQUESTED
});

const userSuccess = (users) => ({
  type: FETCH_USER_SUCCESS,
  payload: users
});

const userFailed = (error) => ({
  type: FETCH_USER_FAILED,
  payload: error
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: ''
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function(dispatch) {
    dispatch(userRequest());
    axios.get('https://jsonplaceholder.typicode.com/photos').then((response) => {
        const photos = response.data.map((photo) => photo.id); // Corrected 'users.id' to 'user.id'
        dispatch(userSuccess(photos));
      })
      .catch((error) => {
        dispatch(userFailed(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(fetchUsers()); // Dispatch the 'fetchUsers' action to fetch user data
