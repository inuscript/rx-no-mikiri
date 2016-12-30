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
  judge: createReducer({
    [actions.judge]: (state, payload) => payload
  }, null),
  open: createReducer({
    [actions.open]: (state, payload) => {
      return payload
    }
  }, false)
})

// eslint-disable-next-line
const sandbox = createReducer({
  [actions.sandbox]: (state, payload) => {
    console.log(payload)
    return payload
  }
}, "")


export default combineReducers({
  game,
  // openState,
  // sandbox,
})