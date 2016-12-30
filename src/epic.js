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
    .switchMap( () => Rx.Observable.interval(frame)
      .map( () => actions.incrementTime( store.getState().game.timer + 1 ))
    )

const openEpic = (action$, store) =>
  action$.ofType(actions.incrementTime.getType())
    .map( ({payload}) => payload)
    .filter( (payload) => payload === openTiming)
    .map( () => actions.open(true) )

// const judgeEpic = (action$, store) =>
//   action$.ofType(actions.open.getType(), actions.bang.getType())
//     .bufferTime(700)
//     .map( (items) => {
//       if(items.length === 0){
//         return {type: "SINK"}
//       }
//       if(items.length === 2){
//         return actions.judge(true)
//       }
//       return actions.judge(false)
//     })

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

const debugEpic = (action$, store) =>
  action$.ofType(actions.incrementTime.getType())
    // .do( m => console.log(m))
    .ignoreElements()

export const epics = combineEpics(
  startTimerEpic,
  openEpic,
  judgeEpic,
  debugEpic
)