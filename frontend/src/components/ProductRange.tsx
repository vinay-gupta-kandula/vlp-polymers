"use client";

import React, { useState } from "react";
import Link from "next/link";
import RequirementModal from "./RequirementModal";
import { useTheme } from "./ThemeContext";

export default function ProductRange() {
  const [modalOpen, setModalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <section id="comprehensive-product-range" className="py-20 bg-[var(--product-range-bg)] relative overflow-hidden transition-colors duration-300">
      {/* Absolute decorative glow balls */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-300/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 w-full">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fadeInUp">
          <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-[var(--product-range-text-title)] tracking-tight transition-colors duration-300">
            Comprehensive Product Range
          </h2>
          <p className="text-[var(--product-range-text-body)] text-sm md:text-base mt-3 leading-relaxed font-sans font-normal transition-colors duration-300">
            We manufacture a wide variety of Expanded Polystyrene (EPS) products tailored to your specific industrial requirements.
          </p>
        </div>

        {/* Asymmetric Responsive Grid */}
        <div className="grid grid-cols-12 gap-6 mb-8">
          {/* Card 1: Thermocol Boxes (Wide Card) - Row 1 Left */}
          <Link
            href="/product-range?category=Boxes"
            className="col-span-12 lg:col-span-8 group relative overflow-hidden bg-[var(--product-range-card-bg)] border border-border/10 shadow-md rounded-2xl p-8 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[260px]"
          >
            {/* Soft gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/10 via-transparent to-transparent z-0" />

            {/* Image right-aligned, fading into card background */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:block z-0 overflow-hidden rounded-r-2xl">
              <img
                src="/assets/box_60.png"
                alt="Thermocol Boxes"
                className="w-full h-full object-contain object-right opacity-85 transition-transform duration-500 group-hover:scale-105"
                style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)" }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-start max-w-full md:max-w-[50%]">
              {/* Circular Icon with Overlay Image */}
              <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center p-1.5 shadow-sm mb-6 overflow-hidden transition-colors duration-300">
                <img
                  src="/assets/Overlay.png"
                  alt="Boxes Icon"
                  className="w-full h-full object-contain"
                  style={{ filter: theme === "dark" ? "invert(1) brightness(0.8)" : undefined }}
                />
              </div>

              <h3 className="font-heading text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-3">
                Thermocol Boxes
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal transition-colors duration-300">
                Available in various capacities (20L, 60L, 75L, 120L) for secure transportation of temperature-sensitive and fragile goods.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-1.5 text-sm font-semibold text-brand-blue mt-8 group-hover:text-brand-hover transition-colors">
              View Boxes &rarr;
            </div>
          </Link>

          {/* Card 2: EPS Sheets (Narrow Card) - Row 1 Right */}
          <Link
            href="/product-range?category=Sheets"
            className="col-span-12 lg:col-span-4 group relative overflow-hidden bg-[var(--product-range-card-bg)] border border-border/10 shadow-md rounded-2xl p-8 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[260px]"
          >
            {/* Sheets background right/bottom */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:block z-0 overflow-hidden rounded-r-2xl">
              <img
                src="/assets/Sheets_bg.png"
                alt="EPS Sheets"
                className="w-full h-full object-contain object-right opacity-85 transition-transform duration-500 group-hover:scale-105"
                style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)" }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-start max-w-full md:max-w-[50%]">
              {/* Circular Icon with Overlay Image */}
              <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center p-1.5 shadow-sm mb-6 overflow-hidden transition-colors duration-300">
                <img
                  src="/assets/Overlay (1).png"
                  alt="Sheets Icon"
                  className="w-full h-full object-contain"
                  style={{ filter: theme === "dark" ? "invert(1) brightness(0.8)" : undefined }}
                />
              </div>

              <h3 className="font-heading text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-3">
                EPS Sheets
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal transition-colors duration-300">
                Insulation and packaging sheets in custom thicknesses.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-1.5 text-sm font-semibold text-brand-blue mt-8 group-hover:text-brand-hover transition-colors">
              View Sheets &rarr;
            </div>
          </Link>

          {/* Card 3: Thermocol Beans (Narrow Card) - Row 2 Left */}
          <Link
            href="/product-range?category=Beans"
            className="col-span-12 lg:col-span-4 group relative overflow-hidden bg-[var(--product-range-card-bg)] border border-border/10 shadow-md rounded-2xl p-8 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[260px]"
          >
            {/* Beans background right/bottom */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:block z-0 overflow-hidden rounded-r-2xl">
              <img
                src="/assets/beans.png"
                alt="Thermocol Beans"
                className="w-full h-full object-contain object-right opacity-90 transition-transform duration-500 group-hover:scale-105"
                style={{ maskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)", WebkitMaskImage: "linear-gradient(to left, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 100%)" }}
              />
            </div>

            <div className="relative z-10 flex flex-col items-start max-w-full md:max-w-[50%]">
              {/* Circular Icon with Overlay Image */}
              <div className="w-10 h-10 rounded-lg bg-brand-light flex items-center justify-center p-1.5 shadow-sm mb-6 overflow-hidden transition-colors duration-300">
                <img
                  src="/assets/Overlay (2).png"
                  alt="Beans Icon"
                  className="w-full h-full object-contain"
                  style={{ filter: theme === "dark" ? "invert(1) brightness(0.8)" : undefined }}
                />
              </div>

              <h3 className="font-heading text-xl font-bold text-brand-dark group-hover:text-brand-blue transition-colors mb-3">
                Thermocol Beans
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal transition-colors duration-300">
                Loose fill beads for bean bags and protective void filling.
              </p>
            </div>

            <div className="relative z-10 flex items-center gap-1.5 text-sm font-semibold text-brand-blue mt-8 group-hover:text-brand-hover transition-colors">
              View Beans &rarr;
            </div>
          </Link>

          {/* Card 4: Custom Shape Banner (Wide Card) - Row 2 Right */}
          <div
            className="col-span-12 lg:col-span-8 bg-[var(--custom-card-bg)] border border-[var(--custom-card-border)] rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md hover:shadow-lg transition-all duration-300 min-h-[260px]"
          >
            <div className="text-left flex-1">
              <h3 className="font-heading text-2xl font-bold text-[var(--custom-card-text)] mb-4 transition-colors duration-300">
                Need a Custom Shape?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal max-w-xl transition-colors duration-300">
                We offer custom molding services for specialized industrial components and bespoke packaging requirements.
              </p>
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto bg-brand-blue hover:bg-brand-hover text-white font-bold text-sm px-7 py-4 rounded-full shadow-md whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact Engineering
            </button>
          </div>
        </div>
      </div>

      {/* Embedded Requirement Form Modal */}
      <RequirementModal isOpen={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
}

