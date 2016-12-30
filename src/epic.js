/* eslint-disable */
import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

// 100ms = 1s
const frame = 10 // 1 / 10 
const openTiming = 300 + Math.ceil(Math.random() * 150) // 3s ~ 18s

// 時計進める
const startTimerEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () =>
      Rx.Observable.interval(frame)
        .takeUntil(action$.ofType(actions.stop.getType()))
        .map( () => actions.incrementTime( store.getState().game.timer + 1 ))
    )

const openEpic = (action$, store) =>
  action$.ofType(actions.incrementTime.getType())
    .map( ({payload}) => payload)
    .filter( (payload) => payload === openTiming)
    .mapTo( actions.open(true) )

const keyEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.fromEvent(document, 'keydown')
      .filter( ({key}) => key === "a")
    ).mapTo( actions.bang(true) )

const judgeEpic = (action$, store) =>
  action$.ofType(actions.open.getType(), actions.bang.getType())
    .bufferTime(500)
    .filter( items => items.length > 0 )
    .map( (items) => (items.length === 2)
      ? actions.judge(true)
      : actions.judge(false)
    )
    .mergeMap( (judge) => [ actions.stop(), judge ])



export const epics = combineEpics(
  startTimerEpic,
  openEpic,
  judgeEpic,
  keyEpic
)