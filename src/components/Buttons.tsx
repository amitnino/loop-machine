import React from 'react';
import { useLoopStateContext } from './../providers/LoopStateProvider';

type ButtonsProps = {}

const Buttons: React.FunctionComponent<ButtonsProps> = () => {

    const loopStateContext = useLoopStateContext();

    return (
        <div>
            <button
                onClick={() => {loopStateContext?.playOrPauseLoop(!loopStateContext?.isLoopPlaying)}}
            >
                {loopStateContext?.isLoopPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}

export default Buttons;