import './Pad.css';
import React, { useEffect, useState } from 'react';
import { useLoopStateContext } from './../providers/LoopStateProvider';
import PlayPauseButton from './PlayPauseButton';

type PadProps = {
    sound: HTMLAudioElement,
    instrumentIndex: number,
}

const Pad: React.FunctionComponent<PadProps> = ({ sound, instrumentIndex }: PadProps) => {

    const loopStateContext = useLoopStateContext();
    
    const [padStyleColor, setPadStyleColor] = useState<string>('pad-not-active')
    
    const parseSoundNameFromSrc = (soundSrc: string): string => {
        return soundSrc.split('/')[5].split('.')[0].toUpperCase();
    }
    
    
    
    useEffect(() => {
        const newStyleColor: string = loopStateContext?.allInstrumentsStates[instrumentIndex] ? `pad-color-${Math.floor(Math.random()*5)}` : 'pad-not-active';
        setPadStyleColor(newStyleColor);
        // eslint-disable-next-line
    }, [loopStateContext?.allInstrumentsStates[instrumentIndex], instrumentIndex])

    return (
        <div className={`pad ${padStyleColor}`} >
            <div className="pad-content">
            <p>{parseSoundNameFromSrc(sound.src)}</p>
            <PlayPauseButton
            onClickCallback={() => { loopStateContext?.toggleSingleInstrumentStateByIndex(instrumentIndex)}}
            state={loopStateContext?.allInstrumentsStates[instrumentIndex]!}
            ></PlayPauseButton>
            </div>
        </div>
    )
}

export default Pad;