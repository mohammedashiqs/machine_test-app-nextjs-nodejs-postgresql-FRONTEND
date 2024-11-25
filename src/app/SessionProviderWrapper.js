// src/app/SessionProviderWrapper.js
"use client"; // This line marks the component as a Client Component

import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}