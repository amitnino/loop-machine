import './App.css';
import Heading from './components/Heading';
import { sounds } from './modules/sounds';
import Pad from './components/Pad';
import Buttons from './components/Buttons';
import { useEffect, useState } from 'react';

function App() {
  // States
  /**
   * Maintains the state of the boolean controling wether the loop is playing.
   */
  const [isLoopPlaying, setIsLoopPlaying] = useState<boolean>(false);
  /**
   * Maintains the state of the boolean controling wether an instrument is to be played in the loop.
   * Instruments will be reffered by their index in the array.
   */
  const [allInstrumentsStates, setAllInstrumentsStates] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
  /**
   * The number of rounds/intervals the loop has been playing for.
   */
  const [roundNumber, setRoundNumber] = useState<number>(0);
  /**
   * A timeout instance state to use every time the loop needs to play or stop.
   */
  const [timeoutInstance, setTimeoutInstance] = useState<NodeJS.Timeout>(setTimeout(() => { }, 0))

  // Timeout definition
  /**
   * Executes every interval of 8 seconds
   */
  const intervalCallback = (): void => {
    console.log('Interval ended!');
    setRoundNumber(roundNumber + 1)
    playOrPauseInstruments(true);
    startInterval();
  }
  /**
   * The amount of miliseconds between each interval.
   */
  const intervalMiliseconds = 8000;
  /**
   * Starts the Intervals
   */
  const startInterval = (): void => {
    console.log('Started Interval!');
    setTimeoutInstance(setTimeout(intervalCallback, intervalMiliseconds));
  };
  useEffect(() => {}, [allInstrumentsStates]);
  // Functions
  /**
   * Starts the loop and begins a recursive cycle.
   * @param play - if set to true it starts to play, if false it will stop the Loop.
   */
  const playOrPauseLoop = (play: boolean): void => {
    console.log('Play Loop Func: ' + allInstrumentsStates);
    setIsLoopPlaying(play);
    playOrPauseInstruments(play);
    if (play) {
      startInterval();
    } else {
      console.log('Interval Stopped!');
      clearTimeout(timeoutInstance);
    };
  };
  const getCurrentActiveInstrumentsIndex = (): number[] => {
    return allInstrumentsStates.flatMap((instrument: boolean, index: number) => instrument ? index : []);
  };
  /**
   * Plays instruments that are set to true in allInstrumentsStates array.
   * @param play - if set to true it starts to play, if false it will pause all instruments.
   */
  const playOrPauseInstruments = (play: boolean): void => {
    // check which of the instruments is set to true.
    console.log('Play Instruments Func: ' + allInstrumentsStates);
    const activeInstrumentsIndex: number[] = getCurrentActiveInstrumentsIndex();
    // play / pause the audio of these instruments
    if (play) {
      for (let instrumentIndex of activeInstrumentsIndex) {
        sounds[instrumentIndex].currentTime = 0;
        sounds[instrumentIndex].play();
      };
    } else {
      for (let sound of sounds) {
        sound.pause();
      };
    };
  };
  /**
   * Toggles the state of a single instrument boolean state in allInstrumentsStates array.
   * @param instrumentIndex
  */
  const toggleSingleInstrumentStateByIndex = (instrumentIndex: number): void => {
    allInstrumentsStates[instrumentIndex] = !allInstrumentsStates[instrumentIndex];
    setAllInstrumentsStates(new Array(...allInstrumentsStates));
    // if the new instrument state is false, stop playing instrument immidietly
    if (!allInstrumentsStates[instrumentIndex]) {
      sounds[instrumentIndex].pause();
    };
    // if the new instrument state is true and loop is not playing, start playing loop.
    if (allInstrumentsStates[instrumentIndex] && !isLoopPlaying) {
      playOrPauseLoop(true);
    };
  };

  return (
    <div className="App">
      <audio src=""></audio>
      <Heading></Heading>
      <Buttons
        playOrPauseLoop={playOrPauseLoop}
        isLoopPlaying={isLoopPlaying}
      ></Buttons>
      <p>Round Number: {roundNumber}</p>
      <p>timer: {timeoutInstance.toString()}</p>
      <p>Sound(1) paused? {sounds[0].paused.toString()}</p>
      <p>Instrumets State Playing? {allInstrumentsStates.toString()}</p>
      <p>is Loop Playing? {isLoopPlaying.toString()}</p>
      <div className="pads-container">
        {
          sounds.map((sound: HTMLAudioElement, index: number) => {
            return (
              <Pad
                key={index}
                soundTitle={sound.prefix}
                instrumentIndex={index}
                allInstrumentsStates={allInstrumentsStates}
                toggleInstrument={toggleSingleInstrumentStateByIndex}
              >
              </Pad>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
