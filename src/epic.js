import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

// 時計進める
const startTimerEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.interval(100) )
    .map( () => actions.incrementTime( store.getState().game.timer + 1 ))

export const epics = combineEpics(
  startTimerEpic,
)