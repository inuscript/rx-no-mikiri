import { combineReducers } from "redux"
import { createReducer } from 'redux-act'
import * as actions from './actions'

const game = combineReducers({
  gameState: createReducer({
    [actions.start]: (state, payload, meta) => true,
    [actions.stop]: (state, payload, meta) => false,
    [actions.reset]: () => false
  }, false),
  timer: createReducer({
    [actions.incrementTime]: (state, payload) => state + 1,
    [actions.reset]: () => 0
  }, 0),
  judge: createReducer({
    [actions.judge]: (state, payload) => payload,
    [actions.reset]: () => null
  }, null),
  open: createReducer({
    [actions.recordOpen]: (state, payload) => payload,
    [actions.reset]: () => 0
  }, 0),
  attack: createReducer({
    [actions.recordAttack]: (state, payload) => payload,
    [actions.reset]: () => 0
  }, 0)
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