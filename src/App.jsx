// import Testimonials from "./sections/Testimonials";
// import Footer from "./sections/Footer";
// import Contact from "./sections/Contact";
// import TechStack from "./sections/TechStack";
// import Experience from "./sections/Experience";
// import Hero from "./sections/Hero";
// import ShowcaseSection from "./sections/ShowcaseSection";
// import LogoShowcase from "./sections/LogoShowcase";
// import FeatureCards from "./sections/FeatureCards";
// import Navbar from "./components/NavBar";

// const App = () => (
//   <>
//     <Navbar />
//     <Hero />
//     <ShowcaseSection />
//     <LogoShowcase />
//     <FeatureCards />
//     <Experience />
//     <TechStack />
//     <Testimonials />
//     <Contact />
//     <Footer />
//   </>
// );

// export default App;

// import RealisticTulip from "./components/Tulips/RealisticTulip";
// import TulipGarden from "./components/Tulips/TulipGarden";
// import BloomingTulipScene from "./components/Tulips/BloomingTulip";
// import InteractiveTulipScene from "./components/Tulips/InteractiveTulipScene";
import BloomingInteractiveTulip from "./components/BloomingInteractiveTulip";

function App() {
  return (
    <div className="w-screen h-screen">
      {/* Pick one scene at a time */}
      {/* <RealisticTulip /> */}
      {/* <TulipGarden /> */}
      {/* <BloomingTulipScene /> */}
      {/* <InteractiveTulipScene /> */}
 <BloomingInteractiveTulip/>
    </div>
  );
}

export default App;
