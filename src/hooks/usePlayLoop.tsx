import { MutableRefObject, useCallback, useEffect, useRef } from "react";
import { sounds } from "../utils/sounds";
import useInterval from "./useInterval";

type usePlayLoopProps = {
    isLoopPlaying: boolean,
    allInstrumentsStates: boolean[],
    isRecording: boolean,
    roundCounter: MutableRefObject<number>,
};

const usePlayLoop = ({isLoopPlaying, allInstrumentsStates, isRecording, roundCounter}: usePlayLoopProps) => {
    
    const timeIntervalCallback = useCallback(( ) => {
        if(isRecording && isLoopPlaying){
            roundCounter.current += 1;
        };
        savedPlayOrPauseInstruments.current(isLoopPlaying);
    }, [isRecording, isLoopPlaying, roundCounter]);

    /**
     * @param play - if set to true it starts to play, if false it will pause all instruments.
     */
    const playOrPauseInstruments = useCallback((play: boolean): void => {
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
    }, [allInstrumentsStates]);
    const savedPlayOrPauseInstruments = useRef<(play: boolean) => void>(playOrPauseInstruments);

    useEffect(()=>{
        savedPlayOrPauseInstruments.current = playOrPauseInstruments;
    }, [allInstrumentsStates, playOrPauseInstruments])

    useEffect(() => {
        savedPlayOrPauseInstruments.current(isLoopPlaying);
    }, [isLoopPlaying]);

    const timeOutDelay: number = 8000;
    useInterval({callback:timeIntervalCallback, delay: isLoopPlaying ? timeOutDelay : null});
};

export default usePlayLoop;