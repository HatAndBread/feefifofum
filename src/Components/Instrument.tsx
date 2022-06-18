import React from "react";
import { TannerinContext, KeyboardContext, SequencerContext } from "../Context";

const Instrument = ({ children }: { children: React.ReactNode }) => {
  //@ts-ignore;
  const api = window.API;
  const instrument = document.title.toLowerCase();

  const toneMessage = api.toneMessage as unknown as (args: {
    [key: string]: any;
  }) => void;

  const value = {
    toneMessage,
  };

  switch (instrument) {
    case "tannerin":
      return (
        <TannerinContext.Provider value={value}>
          {children}
        </TannerinContext.Provider>
      );
    case "keyboard":
      return (
        <KeyboardContext.Provider value={value}>
          {children}
        </KeyboardContext.Provider>
      );
    case "sequencer":
      return (
        <SequencerContext.Provider value={value}>
          {children}
        </SequencerContext.Provider>
      );
    default:
      throw new Error(`No context for instrument: ${instrument}`);
  }
};

export default Instrument;
