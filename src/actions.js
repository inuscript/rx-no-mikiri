import * as reduxAction from 'redux-actions'

const identity = (item) => item
const createAction = function (type, key, updateFunction = identity) {
  if(!key){
    return reduxAction.createAction(type)
  }
  const payloadCreator = (...params) => {
    return {
      [key]: updateFunction(...params)
    }
  }
  return reduxAction.createAction(type, payloadCreator)
}
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


export const ready = createAction("READY")
export const start = createAction("START", "started", (a) => (b) => {
  console.log(a, b)
  return true
})
export const stop = createAction("STOP", "started", () => () => false)
export const reset = createAction("RESET")
export const changeLevel = createAction("changeLevel", "level")

export const incrementTime = createAction("INCREMENT_TIME", "timer",
  () => (state) => state + 1
)

export const doAttack = createAction("DO_ATTACK")
export const recordAttack = createAction("RECORD_ATTACK", "attack")
export const recordOpen = createAction("RECORD_OPEN", "open")
export const judge = createAction("JUDGE", "judge")

export const sink = createAction("NULL_ACTION")
// export const sandbox = createAction("SANDBOX", msg => ({ msg }) )
