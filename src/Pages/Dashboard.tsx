import React from "react";

const Dashboard = () => {

  const openPage = (pageName: string) => {
    //@ts-ignore
    window.API.openWindow(pageName);
  };

  return (
    <div className="Dashboard">
      {" "}
      {["Tannerin", "Keyboard"].map((o) => <button key={o} onClick={() => openPage(o)}>{o}</button>)}
    </div>
  );
};

export default Dashboard;

