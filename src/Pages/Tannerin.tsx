import React from "react";
import Button from "../Components/Button";
import { useTannerinContext } from "../Context";

const Tannerin = () => {
  const { toneMessage } = useTannerinContext();
  return (
    <div>
      <Button
        onClick={() => {
          toneMessage && toneMessage({ instrument: "tannerin", note: Math.floor(Math.random() * 400) + 60 });
        }}
      >Click me!</Button>
      Tannerin
    </div>
  );
};

export default Tannerin;
