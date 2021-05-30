import { createContext, MutableRefObject, useContext, useRef, useState } from "react"
import type { ReactNode } from 'react';
import { sounds } from "../utils/sounds";
import usePlayLoop from './../hooks/usePlayLoop';

export type LoopStateContextType = {
    isLoopPlaying: boolean,
    setIsLoopPlaying: (newState: boolean) => void,
    allInstrumentsStates: boolean[],
    setAllInstrumentsStates: (newState: boolean[]) => void,
    toggleSingleInstrumentStateByIndex: (instrumentIndex: number) => void,
    roundCounter: MutableRefObject<number>,
    startOrStopRecording: (newState: boolean) => void,
};

const LoopStateContext = createContext<LoopStateContextType | null>(null);
export const useLoopStateContext = () => useContext(LoopStateContext);

export const LoopStateProvider = ({ children }: { children: ReactNode }) => {
    const [allInstrumentsStates, setAllInstrumentsStates] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
    const [isLoopPlaying, setIsLoopPlaying] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const roundCounter = useRef(0);

    /**
     * Toggles the state of a single instrument boolean state in allInstrumentsStates array.
     * @param instrumentIndex;
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
            setIsLoopPlaying(true);
        };
        // if the new instrument state is false and all other instruments are false, stop playing loop.
        const activeInstruments: number[] = allInstrumentsStates.flatMap((instrument: boolean, index: number) => instrument ? index : []);
        if (!allInstrumentsStates[instrumentIndex] && !activeInstruments.length) {
            setIsLoopPlaying(false);
        };
    };

    const startOrStopRecording = (bool: boolean) => {
        if (!bool){
            roundCounter.current = 0
        }
        setIsRecording(bool);
        setIsLoopPlaying(bool);
    };

    usePlayLoop({
        isLoopPlaying,
        allInstrumentsStates: allInstrumentsStates,
        isRecording,
        roundCounter,
    });

    return (
        <LoopStateContext.Provider value={{startOrStopRecording, isLoopPlaying, setIsLoopPlaying, allInstrumentsStates, setAllInstrumentsStates, toggleSingleInstrumentStateByIndex, roundCounter }}>
            {children}
        </LoopStateContext.Provider>
    );
};