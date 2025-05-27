import React from 'react'
import HeroSection from '@/components/pages/home/hero-section'
import AboutSection from '@/components/pages/home/about-section'
import ProblemSection from '@/components/pages/home/problem-section'
import SolutionSection from '@/components/pages/home/solution-section'
import FeaturesSection from '@/components/pages/home/features-section'
import HowItWorksSection from '@/components/pages/home/how-it-works-section'
import ImpactSection from '@/components/pages/home/impact-section'
import CTASection from '@/components/pages/home/cta-section'
import Navbar from '@/components/shared/nav-bar/nav-bar'

const Page = () => {
  return (
    <>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <ProblemSection />
    <SolutionSection />
    <FeaturesSection />
    <HowItWorksSection />
    <ImpactSection />
    <CTASection />
    </>
  )
}

export default Page