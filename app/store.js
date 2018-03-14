import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

const defaultState = {}

export const reducer = (state = defaultState, { payload }) => ({ ...state, ...payload })

export const setData = data => dispatch => dispatch({
  type: 'SET_DATA',
  lastUpdated: Date.now(),
  payload: data
})

export const initStore = (initialState = defaultState) => createStore(
  reducer,
  initialState,
  applyMiddleware(thunkMiddleware)
)
