import React from 'react';
import { useLoopStateContext } from './../providers/LoopStateProvider';

type PadProps = {
    sound: HTMLAudioElement,
    instrumentIndex: number,
}

const Pad: React.FunctionComponent<PadProps> = ({ sound, instrumentIndex }: PadProps) => {

    const loopStateContext = useLoopStateContext();

    const parseSoundNameFromSrc = (soundSrc: string): string => {
        return soundSrc.split('/')[4].split('.')[0].toUpperCase();
    }

    return (
        <div className="pad">
            <div className="pad-content">
            <p>{parseSoundNameFromSrc(sound.src)}</p>
            <button
                onClick={() => { loopStateContext?.toggleSingleInstrumentStateByIndex(instrumentIndex) }}
            >
                {loopStateContext?.allInstrumentsStates[instrumentIndex] ? 'Pause' : 'Play' }
            </button>
            </div>
        </div>
    )
}

export default Pad;