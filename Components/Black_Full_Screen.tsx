import React from "react";

interface Black_Full_ScreenType {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

function Black_Full_Screen({ children, id, className }: Black_Full_ScreenType) {
  return (
    <div
      id={id || ""}
      className={`fixed top-0 left-0 w-screen h-screen bg-black opacity-80 z-50 ${className}`}
      aria-hidden="true"
    >
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
    </div>
  );
}

export default Black_Full_Screen;
