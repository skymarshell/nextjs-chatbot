"use client";
import Cookie from "@/lib/Cookie";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
//import { setLoading } from "./Loading";
import { useRouter } from "next/navigation";

let setUsernameFn: (username: string | null) => void = () => {};

export function setUsername(username: string | null) {
  setUsernameFn(username);
}

function Profile() {
  const [username, setUsername] = useState<string | null>(null);

  setUsernameFn = setUsername;

  useEffect(() => {
    async function initPage() {
      //setLoading(true);
      const user_info = await Cookie.getUserCookie();
      setUsername(user_info?.username ?? null);
      //setLoading(false);
    }
    initPage();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <CgProfile className="text-2xl" />
        <p>{username ?? ""}</p>
      </div>

      {username ? <Button_Logout /> : <Button_Login />}
    </div>
  );
}

function Button_Login() {
  return (
    <Link href="/login" className="px-4 py-1 btn btn-success">
      Log in
    </Link>
  );
}

function Button_Logout() {
  const router = useRouter();
  async function clickLogout() {
    const result = await Cookie.clearUserCookie();

    if (result) {
      setUsername(null);
      router.push("/");
    }
  }

  return (
    <button className="px-4 py-1 btn btn-error" onClick={clickLogout}>
      Log out
    </button>
  );
}

export default Profile;
