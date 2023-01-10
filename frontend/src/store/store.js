import { combineReducers, legacy_createStore as createStore } from 'redux'

import { toyReducer } from './toy.reducer.js'

// const { createStore, combineReducers } = Redux
const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()

const rootReducer = combineReducers({
    toyModule: toyReducer,
})

export const store = createStore(rootReducer, middleware)

// For debug 
store.subscribe(() => {
    // console.log('storeState:\n', store.getState())
})

