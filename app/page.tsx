import dynamic from "next/dynamic";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsMarquee from "./components/StatsMarquee";
import NextGenHeader from "./components/NextGenHeader";
import Features from "./components/Features";
import BeforeAfter from "./components/BeforeAfter";
import Steps from "./components/Steps";
import Results from "./components/Results";
import Insights from "./components/Insights";
import Footer from "./components/Footer";

const CustomCursor = dynamic(() => import("./components/CustomCursor"), { ssr: false });

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <StatsMarquee />
      <NextGenHeader />
      <Features />
      <BeforeAfter />
      <Steps />
      <Results />
      <Insights />
      <Footer />
    </>
  );
}
