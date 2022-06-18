import React from "react";
import Dashboard from "./Pages/Dashboard";
import Tannerin from "./Pages/Tannerin";
import Keyboard from "./Pages/Keyboard";
import Sequencer from "./Pages/Sequencer"
import Instrument from "./Components/Instrument";
import useTone from "./sound-lib/use-tone";

const page = document.title.toLowerCase();

if (page === "dashboard") useTone();
export const App = () => {

  const getPage = () => {
    switch (page) {
      case "dashboard": {
        return <Dashboard />;
      }
      case "tannerin": {
        return <Instrument><Tannerin /></Instrument>;
      }
      case "keyboard": {
        return <Instrument><Keyboard /></Instrument>;
      }
      case "sequencer": {
        return <Instrument><Sequencer /></Instrument>;
      }
      default: {
        throw new Error(`React component not implemented for ${page}`);
      }
    }
  };

  return (
    <div className="text-white">
      <div>{getPage()}</div>
    </div>
  );
};
