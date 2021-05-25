import './App.css';
import Heading from './components/Heading';
import { sounds } from './modules/sounds';
import Pad from './components/Pad';
import Buttons from './components/Buttons';
import { useLoopStateContext } from './providers/LoopStateProvider';

function App() {

  const loopStateContext = useLoopStateContext();

  return (
    <div className="App">
      <audio src=""></audio>
      <Heading></Heading>
      <Buttons></Buttons>
      <p>Is loop playing: {loopStateContext?.isLoopPlaying.toString()}</p>
      <p>all Instruments state: {loopStateContext?.allInstrumentsStates.toString()}</p>
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
