import { addInstrument, playInstrument, removeInstrument } from './manage-instruments';

//@ts-ignore
const messageTypes = window.MESSAGE_TYPES as unknown as string[];

type params = {detail: {[key: string]: any}}

const methods: { [key: string]: (data: any) => void } = {
  "tone-message": (data: params) => {
    playInstrument(data.detail);
  },
  "new-instrument": (data: params ) => {
    addInstrument(data.detail.sender, data.detail.instrument);
  },
  "window-closed": (data: params) => {
    removeInstrument(data.detail.sender);
  }
};

const useTone = () => {
  messageTypes.forEach((type) =>
    document.addEventListener(type, methods[type])
  );
};

export default useTone;
