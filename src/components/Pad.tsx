import React from 'react';

type PadProps = {
    soundTitle: string | null,
    instrumentIndex: number,
    allInstrumentsStates: boolean[],
    toggleInstrument: (instrumentIndex: number) => void
}

const Pad: React.FunctionComponent<PadProps> = ({ soundTitle, instrumentIndex, allInstrumentsStates, toggleInstrument }: PadProps) => {

    return (
        <div className="pad">
            <p>{soundTitle && soundTitle}</p>
            <button
                onClick={() => { toggleInstrument(instrumentIndex) }}
            >
                {allInstrumentsStates[instrumentIndex] ? 'Pause' : 'Play' }
            </button>
        </div>
    )
}

export default Pad;