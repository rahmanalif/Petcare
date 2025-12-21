"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import BoardingProfile from "./Profile/BoardingProfile";
import DaycareProfile from "./Profile/DaycareProfile";
import WalkingProfile from "./Profile/WalkingProfile";

export default function Profile() {
  const searchParams = useSearchParams();
  const serviceType = searchParams.get("service") || "boarding";
  const sitterName = searchParams.get("name") || "Seam Rahman";

  // Route to the appropriate profile component based on service type
  if (serviceType === "Doggy Day Care") {
    return <DaycareProfile sitterName={sitterName} />;
  } else if (serviceType === "Dog Walking") {
    return <WalkingProfile sitterName={sitterName} />;
  } else {
    // Default to boarding profile
    return <BoardingProfile sitterName={sitterName} />;
  }
}
