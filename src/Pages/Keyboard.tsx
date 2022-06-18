import React, { useEffect } from "react";
import Button from "../Components/Button";
import { useKeyboardContext } from "../Context";
import onKeydown from "../sound-lib/keyboard/onkeydown";

const Keyboard = () => {
  const { toneMessage } = useKeyboardContext();

  useEffect(() => {
    const useOnKeydown = (e: KeyboardEvent) => onKeydown(e, toneMessage);
    document.addEventListener("keydown", useOnKeydown);

    return () => document.removeEventListener("keydown", useOnKeydown);
  }, [toneMessage]);

  return (
    <div>
      <div>I am keyboard!</div>
      <Button
        onClick={() => {
          toneMessage &&
            toneMessage({
              instrument: "keyboard",
              note: Math.floor(Math.random() * 400) + 60,
            });
        }}
      >Click me!</Button>
      Keyboard
    </div>
  );
};

export default Keyboard;
