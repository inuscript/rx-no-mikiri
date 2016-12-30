import { createAction } from 'redux-act'

export const ready = createAction("READY")
export const start = createAction("START")
export const stop = createAction("STOP")
export const reset = createAction("RESET")

export const incrementTime = createAction("INCREMENT_TIME")

export const doAttack = createAction("DO_ATTACK")
export const recordAttack = createAction("RECORD_ATTACK", (time) => time)
export const recordOpen = createAction("RECORD_OPEN", (time) => time)
export const judge = createAction("JUDGE", (isPlayerWin) => isPlayerWin)

export const sink = createAction("NULL_ACTION")
export const sandbox = createAction("SANDBOX", msg => ({ msg }) )
