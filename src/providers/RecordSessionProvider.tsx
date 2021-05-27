import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';
import { useLoopStateContext } from './LoopStateProvider';

export type RecordSessionContextType = {
    roundCounter: number
};

const RecordSessionContext = createContext<RecordSessionContextType | null>(null);
export const useRecordSessionContext = () => useContext(RecordSessionContext);

export const RecordSessionProvider = ({ children }: { children: ReactNode }) => {
    
    const loopStateContext = useLoopStateContext();
    const [roundCounter, setRoundCounter] = useState(0);


    const startRecording = ()=>{
        loopStateContext?.setIsLoopPlaying(true);
    };

    return (
            <RecordSessionContext.Provider value={{roundCounter}}>
                {children}
            </RecordSessionContext.Provider>
    );
};
