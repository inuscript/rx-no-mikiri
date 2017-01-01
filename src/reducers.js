import { combineReducers } from "redux"
import { createReducer } from 'redux-candy'
import * as actions from './actions'

const initialState = {
  started: false,
  level: 20,
  timer: 0,
  judge: null,
  open: 0,
  attack: 0
}
const game = createReducer(initialState)
// combineReducers({
//   started: createReducer({
//     [actions.start]: () => true,
//     [actions.stop]: () => false,
//     [actions.reset]: () => false
//   }, false),
//   level: createReducer({
//     [actions.changeLevel]: (state, payload) => payload
//   }, 20),
//   timer: createReducer({
//     [actions.incrementTime]: (state, payload) => state + 1,
//     [actions.reset]: () => 0
//   }, 0),
//   judge: createReducer({
//     [actions.judge]: (state, payload) => payload,
//     [actions.reset]: () => null
//   }, null),
//   open: createReducer({
//     [actions.recordOpen]: (state, payload) => payload,
//     [actions.reset]: () => 0
//   }, 0),
//   attack: createReducer({
//     [actions.recordAttack]: (state, payload) => payload,
//     [actions.reset]: () => 0
//   }, 0)
// })

// eslint-disable-next-line
const sandbox = createReducer({
  [actions.sandbox]: (state, payload) => {
    console.log(payload)
    return payload
  }
}, "")


export default game
// export default combineReducers({
//   game,
//   // openState,
//   // sandbox,
// })