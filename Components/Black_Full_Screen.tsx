import React from "react";

function Black_Full_Screen({ children }: { children: React.ReactNode }) {
  return (
    <div id="Black_Full_Screen" className="fixed top-0 left-0 min-w-full min-h-full bg-black opacity-80">{children}</div>
  );
}

export default Black_Full_Screen;
