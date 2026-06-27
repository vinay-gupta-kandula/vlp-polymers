import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import ProductRange from "@/components/ProductRange";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Sticky Header Navigation */}
      <Header />
      
      {/* Main Sections */}
      <main className="flex-grow">
        {/* Full-bleed Hero section */}
        <Hero />

        {/* Popular Products Showcase Grid */}
        <PopularProducts />

        {/* Deep blue Product Categories showcase */}
        <ProductRange />
      </main>

      {/* Global Multi-column Footer */}
      <Footer />
    </div>
  );
}
