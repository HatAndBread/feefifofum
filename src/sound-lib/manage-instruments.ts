import Instrument from "./classes/instrument";
import Tannerin from "./classes/tannerin";
import Keyboard from "./classes/keyboard";
import Sequencer from "./classes/sequencer";

let instruments: Instrument[] = [];

const instrument = (instrument: string, sender: number) => {
  switch (instrument.toLowerCase()) {
    case "tannerin": {
      return new Tannerin(sender);
    }
    case "keyboard": {
      return new Keyboard(sender);
    }
    case "sequencer": {
      return new Sequencer(sender);
    }
    default:
      throw new Error(`Instrument ${instrument} not implemented`);
  }
};

const mutateState = (cb: () => Instrument[]) => {
  const previousState = instruments.map((i) => i);
  instruments = cb();
  console.log("Old state");
  console.log(previousState);
  console.log("New state");
  console.log(instruments);
};
export const removeInstrument = (sender: number) =>
  mutateState(() => instruments.filter((i) => i.id !== sender));
export const addInstrument = (sender: number, type: string) =>
  mutateState(() => [...instruments, instrument(type, sender)]);

const getInstrument = (id: number) => instruments.find((i) => i.id === id);

export const playInstrument = (playData: { [key: string]: any }) => {
  console.log(playData);
  const instrument = getInstrument(playData.sender);
  instrument?.play(playData);
};
