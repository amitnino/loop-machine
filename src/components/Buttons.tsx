import React from 'react';
import { useLoopStateContext } from './../providers/LoopStateProvider';
import PlayPauseButton from './PlayPauseButton';

type ButtonsProps = {}

const Buttons: React.FunctionComponent<ButtonsProps> = () => {

    const loopStateContext = useLoopStateContext();

    return (
        <div>
            <PlayPauseButton key={1} onClickCallback={() => {loopStateContext?.playOrPauseLoop(!loopStateContext?.isLoopPlaying)}} state={loopStateContext?.isLoopPlaying!} >Button</PlayPauseButton>
        </div>
    )
}

export default Buttons;