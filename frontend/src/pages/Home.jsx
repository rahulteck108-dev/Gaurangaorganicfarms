import React from 'react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import GirCowSection from '../components/GirCowSection';
import HeritageDairy from '../components/HeritageDairy';
import OurProcess from '../components/OurProcess';
import ProductHero from '../components/ProductHero';
import ShatDhaut from '../components/ShatDhaut';
import Shop from '../components/Shop';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <>
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <GirCowSection />
      <HeritageDairy />
      <OurProcess />
      <ProductHero />
      <ShatDhaut />
      <Shop />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
