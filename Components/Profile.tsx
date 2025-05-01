import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";

function Profile() {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <CgProfile className="text-2xl" />
        <p>User Profile</p>
      </div>
      <button className="px-4 py-1 btn btn-success">
        <Link href="/login">Log in</Link>
      </button>
    </div>
  );
}

export default Profile;
