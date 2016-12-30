import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { configureStore } from '../store'
import * as actions from '../actions'
import DevTools from './DevTools' // eslint-disable-line
import styled from 'styled-components'

const Box = styled.div`
  width: 50vw;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
`
const Flex = styled.div`
  display:flex;
  justify-content: space-between;
`

const GameController = ( { start, game }) => {
  const { timer } = game
  return (
    <Flex>
      <button onClick={ _ => start() }>Start</button>
      <div>Timer: {timer}</div>
    </Flex>
  )
}
const Enemy = () => {
  return <div>_◯_</div>
}
const Open = ( {openState} ) => (
  !!openState ? <div>❗❗❗</div> : <div> _ </div>
)
const Result = ({ game }) => {
  const { judge } = game
  if(judge === null){
    return <div></div>
  }
  return (judge) ? <div>Win</div> : <div>Lose</div>
}

const PlayController = ( { bang } ) => {
  return <button onClick={() => bang(true)} >A</button>
}

const Takenoko = ( props ) => {
  return <div>
    <GameController {...props} />
    <PlayController {...props} />
    <Open {...props} />
    <Enemy {...props} />
    <Result {...props} />
  </div>
}

const Container = connect(state => state, actions)(Takenoko)

class App extends Component {
  constructor(){
    super()
    this.store = configureStore()
  }
  render() {
    return (
      <Provider store={this.store}>
        <Box>
          <Container/>
          {/* <DevTools /> */}
        </Box>
      </Provider>
    )
  }
}

export default App;
