import Hero from "../../../component/SitterHome/Hero";
import Middle from "../../../component/SitterHome/Middle";
import ServiceForEveryDog from "../../../component/home/ServiceForEveryDog";
import NewHero from "@/component/SitterHome/NewHero";

export default function sitterLanding() {
  return (
    <>
      <NewHero />
      {/* <Hero /> */}
      <Middle />
      <ServiceForEveryDog />
    </>
  );
}
