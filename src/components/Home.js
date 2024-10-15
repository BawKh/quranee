import "./Home.css";
import image from "../images/moshaph.png";
import Chapters from "./Chapters";
import HeroSection from "./HeroSection";
import Reciters from "./Reciters";
function Home() {
  console.log(image);
  return (
    <>
      <HeroSection />
      <Chapters />
      <Reciters />
    </>
  );
}

export default Home;
