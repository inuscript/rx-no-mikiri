import React from 'react'
import { connect, Provider as BaseProvider } from 'react-redux'

import { Component, PropTypes, Children } from 'react'

export class Provider extends Component{
  constructor(){
    super()
  }
  componentWillMount(){
    if(typeof this.props.createStore === "function" && !this.store){
      this.store = this.props.createStore()
    }
  }
  render() {
    return (
      <BaseProvider store={this.store}>
        {Children.only(this.props.children)}
      </BaseProvider>
    )
  }
}
