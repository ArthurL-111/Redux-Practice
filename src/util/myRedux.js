import { useContext, useState, useEffect } from "react";
import { CounterContext } from "../redux/context";

export function myCreateStore (reducer, preloadedState) {
    const store = {
        state: null,
    }

    const listeners = [];

    if (preloadedState) {
        console.log('here')
        store.state = preloadedState;
    } else {
        store.state = reducer(undefined, {type: '@@INIT@@'})
    }

    const dispatch = (action) => {
        console.log('MyDispatch...')
        store.state = reducer(store.state, action);
        for (const listener of listeners) {
            listener();
        }
    }

    const getState = () => {
        return store.state;
    }    

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            const index = listeners.indexOf(listener);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }

    return {dispatch, getState, subscribe}
    
}

export function UseMySelector (selector) {
    const store = useContext(CounterContext);
    const [state, setState] = useState(selector(store.getState()));

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setState(selector(store.getState()))
        })

        return () => unsubscribe();
    }, [store, selector]);

    return state;
}

export function UseMyDispatch () {
    const store = useContext(CounterContext);

    return (action) => store.dispatch(action);
}