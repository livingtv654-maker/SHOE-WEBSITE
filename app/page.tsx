"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductSequence from "@/components/ProductSequence";
import ProductSectionRed from "@/components/ProductSectionRed";
import ProductSectionYellow from "@/components/ProductSectionYellow";
import ProductSectionLime from "@/components/ProductSectionLime";
import ProductSectionBeige from "@/components/ProductSectionBeige";
import LoadingScreen from "@/components/LoadingScreen";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <Navbar />
      <main>
        <div className={styles.heroSlot}>
          <HeroSection isLoaded={isLoaded} />
        </div>
        <ProductSequence
          states={[
            <ProductSectionRed key="red" />,
            <ProductSectionYellow key="yellow" />,
            <ProductSectionLime key="lime" />,
            <ProductSectionBeige key="beige" />,
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
