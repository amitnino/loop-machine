import { useEffect, useRef } from "react";
import { sounds } from "../utils/sounds";
import useInterval from "./useInterval";


type usePlayLoopProps = {
    isLoopPlaying: boolean,
    allInstrumentsStates: boolean[],
    callback?: ()=>void,
};

const usePlayLoop = ({isLoopPlaying, allInstrumentsStates, callback}: usePlayLoopProps) => {
    
    const timeIntervalCallback = ( ) => {
        if(callback){
            callback();
        };
        savedPlayOrPauseInstruments.current(isLoopPlaying);
    }
    const savedTimeIntervalCallback = useRef<()=>void | null>(timeIntervalCallback);
    /**
     * @param play - if set to true it starts to play, if false it will pause all instruments.
     */
    const playOrPauseInstruments = (play: boolean): void => {
        // check which of the instruments is set to true.
        const activeInstrumentsIndex: number[] = allInstrumentsStates.flatMap((instrument: boolean, index: number) => instrument ? index : []);
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
    const savedPlayOrPauseInstruments = useRef<(play: boolean) => void>(playOrPauseInstruments);

    useEffect(() => {
        savedPlayOrPauseInstruments.current = playOrPauseInstruments;
        savedTimeIntervalCallback.current = timeIntervalCallback;
    }, [playOrPauseInstruments, timeIntervalCallback, callback])

    useEffect(() => {
        savedPlayOrPauseInstruments.current(isLoopPlaying);
    }, [isLoopPlaying]);

    const timeOutDelay: number = 8000;
    useInterval({callback:savedTimeIntervalCallback.current, delay: isLoopPlaying ? timeOutDelay : null});
};

export default usePlayLoop;