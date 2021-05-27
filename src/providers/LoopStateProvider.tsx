import { createContext, useContext, useState } from "react"
import type { ReactNode } from 'react';
import { sounds } from "../utils/sounds";

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

    return (
        <LoopStateContext.Provider value={{ isLoopPlaying, setIsLoopPlaying, allInstrumentsStates, setAllInstrumentsStates, toggleSingleInstrumentStateByIndex }}>
            {children}
        </LoopStateContext.Provider>
    )
};




