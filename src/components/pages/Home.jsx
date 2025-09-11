import React from "react";
import "../../App.css";
import Cards from "../Cards";
import HeroSection from "../HeroSection";
import Footer from "../Footer";
import SidebarGallery from "../SidebarGallery";
import Chatbot from "./Chatbot";

function Home() {
  return (
    <>
      <HeroSection />
      <SidebarGallery />
      <Cards />
      <Footer />
    </>
  );
}

export default Home;
