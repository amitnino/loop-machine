import { useEffect, useRef } from "react";
import useInterval from "./useInterval";

type useLooperProps = {
    isLoopPlaying: boolean,
    playOrPauseInstruments: (play: boolean) => void,
    timeIntervalCallback: () => void,
    looperCallback?: ()=> void,
};

const useLooper = ({ isLoopPlaying, playOrPauseInstruments, timeIntervalCallback, looperCallback }: useLooperProps) => {

    const timeOutDelay: number = 8000;
    const savedPlayOrPauseInstruments = useRef(playOrPauseInstruments);
    const savedLooperCallback = useRef<()=> any | null >(looperCallback ? looperCallback : null);

    useEffect(() => {

        savedPlayOrPauseInstruments.current(isLoopPlaying);
        if (savedLooperCallback.current) {
            savedLooperCallback.current();
        };

    }, [isLoopPlaying]);

    useInterval({callback:timeIntervalCallback, delay: isLoopPlaying ? timeOutDelay : null});

};

export default useLooper;