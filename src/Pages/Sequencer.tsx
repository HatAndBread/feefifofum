import React from "react";
import Button from "../Components/Button";
import { useSequencerContext } from "../Context";

const Sequencer = () => {
  const { toneMessage } = useSequencerContext();

  return (
    <div>
      <div>I am Sequencer!</div>
      <Button
        onClick={() => {
          toneMessage &&
            toneMessage({
              instrument: "sequencer",
              note: Math.floor(Math.random() * 400) + 60,
            });
        }}
      >Click me!</Button>
    </div>
  );
};

export default Sequencer;
