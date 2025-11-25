import HeroSection from "../component/home/HeroSection";
import ServiceForEveryDog from "../component/home/ServiceForEveryDog";
import UsersSay from "../component/home/UsersSay";
import Faq from "../component/home/Faq";
import Mobile from "../component/home/Mobile";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServiceForEveryDog />
      <UsersSay />
      <Faq />
      <Mobile />
    </>
  );
}
