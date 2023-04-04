import React from 'react';
import { CounterContext } from '../redux/context';

// class MyProvider extends React.Component {
//     render() {
//         const {store, children} = this.props;
//         return (
//             <CounterContext.Provider value={store}>
//                 {children}
//             </CounterContext.Provider>
//         )
//     }
// }

export function MyProvider ({store, children}) {
    return (
        <CounterContext.Provider value={store}>
            {children}
        </CounterContext.Provider>
    )
}