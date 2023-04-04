import './App.css';
import CounterAppClass from './components/CounterAppClass';
import { CounterAppFunc } from './components/CounterAppFunc';


function App() {
  return (
      <div className="App">
        <CounterAppClass />
        <CounterAppFunc />
      </div>
  );
}

export default App;
