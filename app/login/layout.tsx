"use client";
import React, { useState, useEffect } from "react";
import Validator from "@/lib/Validator";
import { useRouter } from "next/navigation";
import { setLoading } from "@/Components/Loading";

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();

  useEffect(() => {
    async function initPage() {
      setLoading(true);
      const loggedIn = await Validator.IsLoggedIn();
      if (loggedIn) {
        router.push("/chat");
      }
      setLoading(false);
    }
    initPage();
  }, [router]);

  return <>{children}</>;
}
export default Layout;
