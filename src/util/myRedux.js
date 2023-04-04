import React, { useContext, useState, useEffect } from "react";
import { CounterContext } from "../redux/context";
import store from "../redux/store";

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

export function useMySelector (selector) {
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

export function useMyDispatch () {
    const store = useContext(CounterContext);

    return (action) => store.dispatch(action);
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

export function myConnect (mapStateToProps, mapDispatchToProps) {

    function withConnect (WrappedComponent) {
        
        return class NewComponent extends React.Component {
            static contextType = CounterContext;

            constructor(props) {
                super(props);
                this.state = {
                    stateToProps: mapStateToProps(store.getState()),
                    dispatchToProps: mapDispatchToProps(store.dispatch)
                }
            }

            componentDidMount() {
                this.unsubscribe = store.subscribe(() => {
                    this.setState({
                        stateToProps: mapStateToProps(store.getState(), this.props)
                    });
                });
            }

            componentWillUnmount() {
                if (this.unsubscribe) {
                    this.unsubscribe();
                }
            }
            
            render() {
                return (
                    <WrappedComponent 
                        {...this.props}
                        {...this.state.stateToProps}
                        {...this.state.dispatchToProps}
                    />
                )
            }
        }
    }

    return withConnect;
}