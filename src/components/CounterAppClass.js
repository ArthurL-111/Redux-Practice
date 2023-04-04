import React from "react";
import { Component } from "react";
import { connect } from "react-redux"
import { myConnect } from "../util/myRedux";

export class CounterAppClass extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Class</h1>
                <div>{this.props.counter}</div>
                <button onClick={this.props.increment}>increment</button>
                <button onClick={this.props.decrement}>decrement</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
})

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'counter/incremented' }),
    decrement: () => dispatch({ type: 'counter/decremented' }),
  }
}

export default myConnect(mapStateToProps, mapDispatchToProps)(CounterAppClass);