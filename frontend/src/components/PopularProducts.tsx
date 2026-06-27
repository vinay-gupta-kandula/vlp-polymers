"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { useTheme } from "./ThemeContext";

export default function PopularProducts() {
  const router = useRouter();
  const { theme } = useTheme();
  
  const products = [
    {
      id: 1,
      badge: "High Capacity",
      image: "/assets/box_120.png",
      title: "120 Liter Thermocol Box",
      description: "Heavy-duty EPS container for bulk transit.",
      footerTag: "Export Ready",
    },
    {
      id: 6,
      badge: "Standard Size",
      image: "/assets/box_60.png",
      title: "60 Liter Thermocol Box",
      description: "Versatile mid-size packaging solution.",
      footerTag: "Pharma Grade",
    },
    {
      id: 4,
      badge: "Loose Fill",
      image: "/assets/beans.png",
      title: "Thermocol Round Bean",
      description: "Premium EPS beads for void filling & crafts.",
      footerTag: "High Yield",
    },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/product-range?product=${id}`);
  };

  return (
    <section id="popular-products" className="py-20 bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        {/* Section Title Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 animate-fadeInUp">
          <div>
            <h2 className="font-heading text-3xl font-extrabold text-brand-dark tracking-tight transition-colors duration-300">
              Popular Products
            </h2>
            <p className="text-muted-foreground text-sm mt-2 font-sans font-normal transition-colors duration-300">
              Our most requested industrial packaging solutions.
            </p>
          </div>
        </div>

        {/* Products Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              onClick={() => handleCardClick(product.id)}
              className="group flex flex-col justify-between overflow-hidden bg-card border border-border shadow-sm rounded-2xl cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-300 min-h-[420px]"
            >
              {/* Card Image Area */}
              <div className="relative h-52 overflow-hidden border-b border-border bg-muted/20">
                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="inline-flex items-center bg-brand-light text-brand-blue border border-brand-blue/20 text-[10px] font-bold tracking-wider px-3 py-1 rounded-md shadow-xs transition-colors duration-300">
                    {product.badge}
                  </span>
                </div>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Card Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-lg font-bold text-brand-dark group-hover:text-brand-blue transition-colors leading-tight mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-sans font-normal leading-relaxed transition-colors duration-300">
                    {product.description}
                  </p>
                </div>

                {/* Footer specs */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border w-full transition-colors duration-300">
                  <span className="text-xs font-bold text-brand-blue tracking-wide transition-colors duration-300">
                    {product.footerTag}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-brand-blue/20 bg-brand-light flex items-center justify-center group-hover:bg-brand-blue group-hover:border-brand-blue transition-all duration-300 shadow-xs">
                    <img
                      src="/assets/arrow.png"
                      alt="Arrow"
                      className="w-3.5 h-3.5 object-contain transition-all duration-300 filter group-hover:brightness-0 group-hover:invert"
                      style={{ filter: theme === "dark" ? "invert(1) brightness(0.8) group-hover:brightness-0 group-hover:invert" : undefined }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Explore Catalog Card */}
          <Card className="flex flex-col items-center justify-center text-center p-8 bg-secondary/40 border-2 border-dashed border-border shadow-xs rounded-2xl hover:shadow-md hover:border-brand-blue/40 transition-all duration-300 min-h-[420px]">
            <div className="flex flex-col items-center max-w-[220px]">
              <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center text-brand-blue border border-border shadow-xs mb-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-brand-blue"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path
                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-heading text-lg font-bold text-brand-dark mb-2">
                View All Products
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal mb-6">
                Browse our complete range of EPS packaging.
              </p>
              <Link
                href="/product-range"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-blue tracking-wide uppercase hover:text-brand-hover transition-colors"
              >
                View All
                <i className="fa-solid fa-arrow-right text-[10px]" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

