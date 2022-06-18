export type ToneMessage = ((args: {[key: string]: any}) => void) | undefined;
export interface ContextProps {
  toneStarted: boolean;
}

interface Instrument {
  toneMessage: ToneMessage;
}

export interface TannerinProps extends Instrument {
}

export interface KeyboardProps extends Instrument {
}

export interface SequencerProps extends Instrument {
}
