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