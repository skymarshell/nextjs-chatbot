"use client";
import React, { useState, useEffect } from "react";
import Validator from "@/lib/Validator";
import { useRouter } from "next/navigation";
//import { setLoading } from "@/Components/Loading";
// import DisplayAlert from "@/Components/DisplayAlert";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function initPage() {
      //setLoading(true);
      const loggedIn = await Validator.IsLoggedIn();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) {
        // DisplayAlert({
        //   text: "โปรดเข้าสู่ระบบ",
        //   showConfirmButton: false,
        //   icon: "warning",
        //   timer: 3000,
        // });
        router.push("/login");
      }
      //setLoading(false);
    }
    initPage();
  }, [router]);

  return isLoggedIn ? <>{children}</> : null;
}
export default Layout;
