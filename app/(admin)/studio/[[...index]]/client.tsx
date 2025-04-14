"use client";

import React from "react";
import dynamic from "next/dynamic";
import config from "@/sanity.config";

const NextStudio = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-screen items-center justify-center" />
    ),
  }
);

export default function StudioClient() {
  return <NextStudio config={config} />;
}
