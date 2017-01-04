import { createAction } from 'redux-candy'
import { resetState } from './reducers'
export const ready = createAction("READY")
export const start = createAction("START", "started", () => true)
export const stop = createAction("STOP", "started", () => false)
export const reset = createAction("RESET", () => {
  return resetState
})
export const changeLevel = createAction("changeLevel", "level")
export const incrementTime = createAction('INCREMENT_TIME', 'timer', (_, time) => {
  return time
})

export const doAttack = createAction("DO_ATTACK")
export const recordAttack = createAction("RECORD_ATTACK", "attack")
export const recordOpen = createAction("RECORD_OPEN", "open")
export const judge = createAction("JUDGE", "judge")

export const sink = createAction("NULL_ACTION")
// export const sandbox = createAction("SANDBOX", msg => ({ msg }) )
