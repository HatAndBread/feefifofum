import React, { useState, useEffect } from "react";
// import { AppContext } from "./Context";
import Dashboard from "./Pages/Dashboard";
import Tannerin from "./Pages/Tannerin";
// import useGlobals from "./Hooks/use-globals";

export const App = () => {
  const getPage = () => {
    switch (document.title.toLowerCase()) {
      case "dashboard": {
        return <Dashboard />;
      }
      case "tannerin": {
        return <Tannerin />;
      }
      default: {
        return <Dashboard />;
      }
    }
  };

  return (
    <div className="container">
      <div>{getPage()}</div>
    </div>
  );
};
