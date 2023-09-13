const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCake:10
}

const cakeSlice = createSlice({
    name:'cake',
    initialState:initialState,
    reducers: {
        order: (state,) => {
            state.numOfCake --
        },
        restock: (state,action) =>{
            state.numOfCake += action.payload
        },
    },
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions

