import './App.css';
import Heading from './components/Heading';
import { sounds } from './utils/sounds';
import Pad from './components/Pad';
import Buttons from './components/Buttons';

function App() {

  return (
    <div className="App">
      <Heading>CRAZY LOOPS</Heading>
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
