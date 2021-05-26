import './PlayPauseButton.css';
import React from 'react';
import { FaPlayCircle, FaPauseCircle} from 'react-icons/fa';

type PlayPauseButtonProps = {
    onClickCallback: ()=>void,
    state: boolean
};

const PlayPauseButton: React.FunctionComponent<PlayPauseButtonProps> = ({onClickCallback, state}) => {

    return (
        <div className="play-pause-btn" onClick={onClickCallback}>
            <p>{ state ? <FaPauseCircle /> : <FaPlayCircle /> }</p>
        </div>
    );
};

export default PlayPauseButton;
