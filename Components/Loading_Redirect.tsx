"use client";
import React, { useState } from "react";
import { BlinkBlur } from "react-loading-indicators";
import Black_Full_Screen from "./Black_Full_Screen";

let setLoadingRedirectingFn: (loading: boolean) => void = () => {};

export function setLoadingRedirecting(isLoading: boolean) {
  setLoadingRedirectingFn(isLoading);
}

function Loading_Redirect() {
  const [loading, setLoading] = useState(false);

  setLoadingRedirectingFn = setLoading;

  return (
    loading && (
      <Black_Full_Screen
        id="Loading_Redirect"
      >
        <BlinkBlur
          color="#ccebcc"
          size="large"
          text="Redirecting..."
          textColor="#e1d7d7"
        />
      </Black_Full_Screen>
    )
  );
}

export default Loading_Redirect;
