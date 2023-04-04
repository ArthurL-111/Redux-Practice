import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMySelector, useMyDispatch } from '../util/myRedux';

export const CounterAppFunc = () => {
    const counter = useMySelector((state) => state.counter);
    const dispatch = useMyDispatch();
    return (
        <div>
            <h1>Hooks</h1>
            <div>{counter}</div>
            <button onClick={() => dispatch({type: 'counter/incremented'})}>increment</button>
            <button onClick={() => dispatch({type: 'counter/decremented'})}>decrement</button>
        </div>
    );
}