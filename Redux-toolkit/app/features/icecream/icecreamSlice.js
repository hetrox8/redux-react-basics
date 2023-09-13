const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfIcecream:20,
}

const iceCreamSlice = createSlice({
    name: 'icecream',
    initialState,
    reducers: {
        ordered: (state) =>{
            state.numOfIcecream --
        },
        restocked: (state,action) => {
            state.numOfIcecream += action.payload
        },
    },
})

 module.exports = iceCreamSlice.reducer
 module.exports.iceCreamActions = iceCreamSlice.actions
