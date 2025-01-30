import {applyMiddleware, createStore, combineReducers} from 'redux'
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { songReducer } from './reducers/songReducer'
import { userReducer } from './reducers/userReducer'


const initialState = {}

const reducer = combineReducers({
    mainSong: songReducer,
    account: userReducer,
})

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
)

export default store;