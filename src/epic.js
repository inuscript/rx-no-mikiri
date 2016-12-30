/* eslint-disable */
import Rx from "rxjs"
import { combineEpics } from "redux-observable"
import * as actions from './actions'

const frame = 10 // 1 / 100 s
const openTiming = 300 + Math.ceil(Math.random() * 150) // max: 15s

// 時計進める
const startTimerEpic = (action$, store) =>
  action$.ofType(actions.start.getType())
    .switchMap( () => Rx.Observable.interval(frame)
      .map( () => actions.incrementTime( store.getState().game.timer + 1 ))
    )

const openEpic = (action$, store) =>
  action$.ofType(actions.incrementTime.getType())
    .map( ({payload}) => payload)
    .filter( (payload) => payload === openTiming)
    .map( () => {
      return actions.open(true)
    })

const judgeEpic = (action$, store) =>
  action$.ofType(actions.open.getType(), actions.bang.getType())
    .bufferTime(700)
    .map( (items) => {
      if(items.length === 0){
        return {type: "SINK"}
      }
      if(items.length === 2){
        return actions.judge(true)
      }
      return actions.judge(false)
    })


export const epics = combineEpics(
  startTimerEpic,
  openEpic,
  judgeEpic
)