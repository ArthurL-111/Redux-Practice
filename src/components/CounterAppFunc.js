import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UseMySelector, UseMyDispatch } from '../util/myRedux';

export const CounterAppFunc = () => {
    const counter = UseMySelector((state) => state.counter);
    const dispatch = UseMyDispatch();
    return (
        <div>
            <h1>Hooks</h1>
            <div>{counter}</div>
            <button onClick={() => dispatch({type: 'counter/incremented'})}>increment</button>
            <button onClick={() => dispatch({type: 'counter/decremented'})}>decrement</button>
        </div>
    );
}