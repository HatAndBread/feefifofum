import Instrument from "./instrument";
import { Synth } from "tone";
export default class Keyboard extends Instrument {
  instrument: Synth;
  constructor(id: number) {
    super(id);
    this.instrument = new Synth().toDestination();
  }

  start() {}
  stop() {}

  play(playData: {note: number}) {
    this.instrument.triggerAttackRelease(playData.note, "8n");
  }
}
