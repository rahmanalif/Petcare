import HeroSection from "@/component/home/HeroSection";
import ServiceForEveryDog from "@/component/home/ServiceForEveryDog";
import Faq from "@/component/home/Faq";
import Mobile from "@/component/home/Mobile";
import WhatUserSay from "@/component/home/WhatUserSay";

export default function WuffoosLanding() {
  return (
    <>
      <HeroSection />
      <ServiceForEveryDog />
      <WhatUserSay />
      <Faq />
      <Mobile />
    </>
  );
}
