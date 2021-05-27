import React from 'react';
import usePlayLoop from '../hooks/usePlayLoop';
import { useLoopStateContext } from './../providers/LoopStateProvider';
import PlayPauseButton from './PlayPauseButton';

type ButtonsProps = {}

const Buttons: React.FunctionComponent<ButtonsProps> = () => {

    const loopStateContext = useLoopStateContext();

    usePlayLoop({
        isLoopPlaying: loopStateContext!.isLoopPlaying,
        allInstrumentsStates: loopStateContext!.allInstrumentsStates,
    });

    return (
        <div>
            <PlayPauseButton key={1} onClickCallback={() => {
                
                loopStateContext?.setIsLoopPlaying(!loopStateContext?.isLoopPlaying);
                }} state={loopStateContext?.isLoopPlaying!} >Button</PlayPauseButton>
        </div>
    )
}

export default Buttons;