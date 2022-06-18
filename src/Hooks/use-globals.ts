import { useEffect, useState } from "react";

const useGlobals = () => {
  const [toneStarted, setToneStarted] = useState(false);

  useEffect(() => {
    console.log();
  }, []);

  return { toneStarted, setToneStarted };
};

export default useGlobals;
