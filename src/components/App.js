import React, { Component } from 'react';
import { Provider, connect } from 'react-redux'
import { configureStore } from '../store'
import * as actions from '../actions'
import DevTools from './DevTools' // eslint-disable-line
import styled from 'styled-components'

const Flex = styled.div`
  display:flex;
  justify-content: space-between;
`

const GameController = ( { start, reset, game }) => {
  const { timer } = game
  return (
    <Flex>
      <button onClick={ _ => start() }>Start</button>
      <button onClick={ _ => reset() }>Reset</button>
      <div>Timer: {timer}</div>
    </Flex>
  )
}
const Enemy = ( { game } ) => {
  const { judge } = game
  const msg = (judge === true) ? '< ギャー' : ''
  return <div>_◯_ {msg}</div>
}
const Big = styled.div`
  font-size: 2em;
`
const Flag = ( { game } ) => (
  <Big>
    {!!game.open ? <div>❗❗❗</div> : <div> &nbsp; </div>}
  </Big>
)

const Result = ({ game }) => {
  const { judge } = game
  if(judge === null){
    return <div></div>
  }
  return (judge) ? <div>あなたの勝ち</div> : <div>あなたの負け</div>
}

const PlayController = ( { doAttack } ) => {
  return <button onClick={() => doAttack()}>Attack</button>
}

const Debug = ( {game} ) => {
  const {open, attack} = game
  return <div>{open} - {attack} = {attack - open}</div>
}

const Box = styled.div`
  width: 50vw;
  border: 1px solid #ccc;
  padding: 10px;
  box-sizing: border-box;
  background: ${props => (props.judge === false) ? "rgb(222, 78, 73)": "white"};
`

class Takenoko extends Component {
  componentDidMount(){
    this.props.ready()
  }
  render(){
    const { props } = this
    return <Box judge={props.game.judge} >
      <Flex>
        <div>Keyboard Shortcut</div>
        <div>[ S ]: Start</div>
        <div>[ A ]: Attack</div>
        <div>[ R ]: Reset</div>
      </Flex>
      <GameController {...props} />
      <PlayController {...props} />
      <Flag {...props} />
      <Enemy {...props} />
      <Result {...props} />
      <Debug {...props} />
    </Box>
  }
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
        <Container/>
        {/* <DevTools /> */}
      </Provider>
    )
  }
}

export default App;
