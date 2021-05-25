import React from 'react';

type ButtonsProps = {
    playOrPauseLoop: (play: boolean)=>void,
    isLoopPlaying: boolean,
}

const Buttons: React.FunctionComponent<ButtonsProps> = ({
    playOrPauseLoop, isLoopPlaying
}) => {
    return (
        <div>
            <button
                onClick={() => {playOrPauseLoop(!isLoopPlaying)}}
            >
                {isLoopPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}

export default Buttons;