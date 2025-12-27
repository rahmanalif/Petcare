import HeroSection from "@/component/home/HeroSection";
import ServiceForEveryDog from "@/component/home/ServiceForEveryDog";
import Faq from "@/component/home/Faq";
import Mobile from "@/component/home/Mobile";
import WhatUserSay from "@/component/home/WhatUserSay";
import NewHeroSection from "@/component/home/NewHeroSection";
import WuffoosPromise from "@/component/home/WuffoosPromise";

export default function WuffoosLanding() {
  return (
    <>
      <HeroSection />
      <WuffoosPromise />
      {/* <ServiceForEveryDog /> */}
      <WhatUserSay />
      <Faq />
      <Mobile />
    </>
  );
}
