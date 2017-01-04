import React from 'react';
import { Component, PropTypes, Children } from 'react'
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
  const { timer, started } = game
  return (
    <Flex>
      <button onClick={ _ => start() } disabled={!!started}>Start</button>
      <button onClick={ _ => reset() } >Reset</button>
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
const Flag = ( { game } ) => {
  const { open, started, judge } = game
  if(!started){
    if(judge === null){
      return <span> &nbsp; </span>
    }
    return !!judge ? <span>⭐🐙⭐</span> : <span>💀😇💀</span>
  }
  return !!open ? <span>❗❗❗</span> : <span>🍃🍃🍃 </span>
}

const Result = ({ game }) => {
  const { judge } = game
  if(judge === null){
    return <div></div>
  }
  return (judge) ? <div>You Win</div> : <div>You Lose</div>
}

const PlayController = ( { doAttack, game } ) => {
  const { started } = game
  return <button onClick={() => doAttack()} disabled={!started}>Attack</button>
}

const Level = ({game, changeLevel}) => {
  const { level } = game
  return <div>
    Level: <select value={level} onChange={(e) => changeLevel(e.target.value)}>
      <option value={30}>Easy (30ms)</option>
      <option value={20}>Normal (20ms)</option>
      <option value={10}>Hard (10ms)</option>
    </select>
  </div>
}

const Debug = ( {game} ) => {
  const {open, attack} = game
  return <div>{open} - {attack} = {attack - open}</div>
}

const AppContainer = styled.div`
  width: 50vw;
  box-sizing: border-box;
`

const Box = styled.div`
  width: 50vw;
  border: 1px solid #ccc;
  padding: 10px;
  background: ${props => (props.judge === false) ? "rgb(222, 78, 73)": "white"};
`

const Description = () => (
  <div>
    <h3>Rx no mikiri</h3>
    <div>Click Attack at the moment when "❗" comes out </div>
    <Flex>
      <div>Keyboard Shortcut</div>
      <div>[ S ]: Start</div>
      <div>[ A ]: Attack</div>
      <div>[ R ]: Reset</div>
    </Flex>
  </div>
)

class Takenoko extends Component {
  componentDidMount(){
    this.props.ready()
  }
  render(){
    const { props } = this
    return <AppContainer>
      <Description />
      <Box judge={props.game.judge} >
        <Level {...props} />
        <GameController {...props} />
        <PlayController {...props} />
        <Big><Flag {...props} /></Big>
        {/* <Enemy {...props} /> */}
        <Result {...props} />
        <Debug {...props} />
      </Box>
    </AppContainer>
  }
}

const Container = connect(state => ({ game: state }), actions)(Takenoko)

const App = () => (
  <Provider2 createStore={configureStore}>
    <Container />
  </Provider2>
)

class Provider2 extends Component{
  constructor(){
    super()
  }
  componentWillMount(){
    this.store = this.props.createStore()
  }
  render() {
    return (
      <Provider store={this.store}>
        {Children.only(this.props.children)}
      </Provider>
    )
  }
}

export default App;
