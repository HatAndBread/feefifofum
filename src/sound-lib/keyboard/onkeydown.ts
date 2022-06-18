import { ToneMessage } from "../../types/ContextProps";
const onKeydown = (e: KeyboardEvent, toneMessage: ToneMessage) => {
  console.log(e);
  toneMessage &&
    toneMessage({
      instrument: "keyboard",
      note: Math.floor(Math.random() * 400) + 60,
    });
};

export default onKeydown;
