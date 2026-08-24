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
import CartDrawer from "@/components/CartDrawer";
import RedShoeTravel from "@/components/RedShoeTravel";
import { CartProvider } from "@/context/CartContext";
import styles from "./page.module.css";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <CartProvider>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />
      <Navbar />
      <RedShoeTravel isLoaded={isLoaded} />
      <main>
        <div id="home" className={styles.heroSlot}>
          <HeroSection isLoaded={isLoaded} />
        </div>
        <div id="products">
          <ProductSequence
            states={[
              <ProductSectionRed key="red" />,
              <ProductSectionYellow key="yellow" />,
              <ProductSectionLime key="lime" />,
              <ProductSectionBeige key="beige" />,
            ]}
          />
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
