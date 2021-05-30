import './App.css';
import Heading from './components/Heading';
import { sounds } from './utils/sounds';
import Pad from './components/Pad';
import Buttons from './components/Buttons';
import { useLoopStateContext } from './providers/LoopStateProvider';
import { useEffect } from 'react';

function App() {

  const loopStateContext = useLoopStateContext();

  useEffect(() => {
    
  }, [loopStateContext?.roundCounter.current])

  return (
    <div className="App">
      <Heading>CRAZY LOOPS</Heading>
      <h1>Round Counter: {loopStateContext?.roundCounter.current}</h1>
      <Buttons></Buttons>
      <div className="pads-container">
        {
          sounds.map((sound: HTMLAudioElement, index: number) => {
            return (
              <Pad key={index} sound={sound} instrumentIndex={index} ></Pad>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
