import Hero from "@/components/pages/home/Hero";
import About from "@/components/pages/home/About";  
import Problem from "@/components/pages/home/Problem";
import Solution from "@/components/pages/home/Solution";
import Features from "@/components/pages/home/Features";
import HowItWorks from "@/components/pages/home/HowItWorks";
import Impact from "@/components/pages/home/Impact";
// import Testimonial from "@/components/pages/home/Testimonial";
import CTA from "@/components/pages/home/CTA";
export default function Home() {
  return (
   <>
   <Hero />
   <About />
   <Problem />
   <Solution />
   <Features />
   <HowItWorks />
   <Impact />
   {/* <Testimonial /> */}
   <CTA />
   </>

  );
}
