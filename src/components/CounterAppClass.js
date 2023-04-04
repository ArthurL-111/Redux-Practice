import React from "react";
import { Component } from "react";
import { connect } from "react-redux"

export class CounterAppClass extends Component {
    render() {
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

export default connect(mapStateToProps, mapDispatchToProps)(CounterAppClass);