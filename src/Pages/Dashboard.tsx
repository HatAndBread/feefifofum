import React, { useEffect } from "react";
import { AppContext } from "../Context";
import { start } from "tone";
import useGlobals from "../Hooks/use-globals";
import Button from "../Components/Button";
import SoundDisplay from "../Components/SoundDisplay";

const Dashboard = () => {

  const { setToneStarted } = useGlobals();

  useEffect(() => {
    const startTone = async () => {
      document.removeEventListener("click", startTone);
      await start();
      setToneStarted(true);
    };
    document.addEventListener("click", startTone);

    return () => document.removeEventListener("click", startTone);
  }, []);

  const openPage = (pageName: string) => {
    //@ts-ignore
    window.API.openWindow(pageName);
  };

  return (
    <AppContext.Provider value={useGlobals()}>
      <div className="flex flex-col items-center justify-center w-screen h-screen">
        {" "}
        {["Tannerin", "Keyboard", "Sequencer"].map((o) => (
          <Button key={o} onClick={() => openPage(o)}>{o}</Button>
        ))}
        <SoundDisplay />
      </div>
    </AppContext.Provider>
  );
};

export default Dashboard;
