import React from "react";
import Profile from "./Profile";

function Header_Nav() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto flex items-center justify-between py-4 text-black">
        <nav aria-label="Main navigation">
          <Left_Nav />
        </nav>
        <div>
          <Right_Nav />
        </div>
      </div>
    </header>
  );
}

function Left_Nav() {
  return (
    <ul className="flex space-x-4">
      <li className="bg-black px-5 py-3 rounded-2xl">
        <p className="text-white text-2xl">Chat AI</p>
      </li>
    </ul>
  );
}

function Right_Nav() {
  return (
    <>
      <ul className="flex space-x-4">
        <li>
          <Profile />
        </li>
      </ul>
    </>
  );
}

export default Header_Nav;
