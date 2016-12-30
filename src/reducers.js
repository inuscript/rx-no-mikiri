import { combineReducers } from "redux"
import { createReducer } from 'redux-act'
import * as actions from './actions'

const game = combineReducers({
  gameState: createReducer({
    [actions.start]: (state, payload, meta) => true,
    [actions.stop]: (state, payload, meta) => false,
  }, false),
  timer: createReducer({
    [actions.incrementTime]: (state, payload) => state + 1
  }, 0),
})

const sandbox = (state, {type, payload }) =>{
  console.log(type, payload)
  return {}
}

export default combineReducers({
  game,
  sandbox
})