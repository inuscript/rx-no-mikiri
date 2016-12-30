import { createStore, applyMiddleware, compose } from "redux"
import { createEpicMiddleware } from "redux-observable"
import { epics } from './epic'
import DevTools from './components/DevTools'
import reducers from './reducers'

export const configureStore = () => {
  return createStore(
    reducers,
    compose(
      applyMiddleware(createEpicMiddleware(epics)),
      DevTools.instrument()
    )
  )
}

