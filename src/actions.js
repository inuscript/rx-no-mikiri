import { createAction } from 'redux-act'

export const start = createAction("START")
export const stop = createAction("STOP")
export const incrementTime = createAction("INCREMENT_TIME")

export const bang = createAction("BANG", (bang) => bang)
export const open = createAction("OPEN", (opened) => opened)
export const judge = createAction("JUDGE", (isPlayerWin) => isPlayerWin)

export const sink = createAction("NULL_ACTION")
export const sandbox = createAction("SANDBOX", msg => ({ msg }) )
