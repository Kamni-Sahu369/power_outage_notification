import React from "react";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import Footer from "./Footer";
import Header from "./Header/Header";
import Contact from "./Contact/Contactsection";
// import Register from "./Resister/Register"
// import Backendmap from "./Backendmap"

function App() {
  return (
    <div>
      <Header/>
      <HeroSection />
      <FeaturesSection/>
      {/* <Backendmap/> */}
       <Contact/>
        {/* <Footer/>   */}
      {/* <Register/> */}
    </div>
  );
}
export default App;

