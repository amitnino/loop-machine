import { createContext, useContext, useState } from "react"
import type { ReactNode } from 'react';
import { sounds } from "../utils/sounds";
import useLooper from "../hooks/useLooper";

export type LoopStateContextType = {
    isLoopPlaying: boolean,
    setIsLoopPlaying: (newState: boolean) => void,
    allInstrumentsStates: boolean[],
    setAllInstrumentsStates: (newState: boolean[]) => void,
    toggleSingleInstrumentStateByIndex: (instrumentIndex: number) => void
};

const LoopStateContext = createContext<LoopStateContextType | null>(null);
export const useLoopStateContext = () => useContext(LoopStateContext);

export const LoopStateProvider = ({ children }: { children: ReactNode }) => {
     
    const [allInstrumentsStates, setAllInstrumentsStates] = useState<boolean[]>([false, false, false, false, false, false, false, false, false]);
    const [isLoopPlaying, setIsLoopPlaying] = useState<boolean>(false);
       
    /**
     * @returns An array of the active instrument's indexes.
     */
    const getCurrentActiveInstrumentsIndex = (): number[] => {
        return allInstrumentsStates.flatMap((instrument: boolean, index: number) => instrument ? index : []);
    };
    /**
     * @param play - if set to true it starts to play, if false it will pause all instruments.
     */
    const playOrPauseInstruments = (play: boolean): void => {
        // check which of the instruments is set to true.
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
        const activeInstruments: number[] = getCurrentActiveInstrumentsIndex();
        if (!allInstrumentsStates[instrumentIndex] && !activeInstruments.length){
            setIsLoopPlaying(false);
        };
    };


    const timeIntervalCallback = () => {};
    useLooper({isLoopPlaying, playOrPauseInstruments, timeIntervalCallback});

    
    return (
        <LoopStateContext.Provider value={{ isLoopPlaying, setIsLoopPlaying, allInstrumentsStates, setAllInstrumentsStates, toggleSingleInstrumentStateByIndex }}>
            {children}
        </LoopStateContext.Provider>
    )
};




