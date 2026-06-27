"use client";

import React from "react";

export default function Footer() {
  const handleLinkClick = (name: string) => {
    alert(`Navigating to: ${name}. This resource page is currently under construction.`);
  };

  return (
    <footer id="footer" className="bg-[var(--footer-bg)] border-t border-[var(--footer-border)] text-[var(--footer-text)] py-16 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
          {/* Logo and brief brand text column */}
          <div className="md:col-span-5 flex flex-col items-start gap-4">
            <a href="/#home" className="flex items-center select-none group bg-[var(--footer-logo-bg)] px-4 py-2.5 rounded-xl shadow-xs border border-border/10 transition-all hover:bg-brand-hover">
              <img
                src="/assets/vlp_swan_logo.png"
                alt="VLP SWAN Logo"
                className="h-9 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-102 filter invert brightness-0"
              />
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans font-normal mt-2 max-w-sm transition-colors duration-300">
              Industrial Excellence Redefined. Providing top-tier EPS solutions for global export.
            </p>
          </div>

          {/* Links menu columns */}
          <div className="md:col-span-7 grid grid-cols-2 gap-6 sm:gap-10">
            {/* Column 1 - Legal */}
            <div className="flex flex-col items-start gap-4">
              <h4 className="font-heading text-xs font-extrabold text-brand-blue tracking-widest uppercase transition-colors duration-300">
                Legal
              </h4>
              <nav className="flex flex-col gap-3 text-sm text-left font-sans font-normal text-muted-foreground transition-colors duration-300">
                <button onClick={() => handleLinkClick("Privacy Policy")} className="hover:text-brand-blue transition-colors text-left">Privacy Policy</button>
                <button onClick={() => handleLinkClick("Terms of Service")} className="hover:text-brand-blue transition-colors text-left">Terms of Service</button>
              </nav>
            </div>

            {/* Column 2 - Company */}
            <div className="flex flex-col items-start gap-4">
              <h4 className="font-heading text-xs font-extrabold text-brand-blue tracking-widest uppercase transition-colors duration-300">
                Company
              </h4>
              <nav className="flex flex-col gap-3 text-sm text-left font-sans font-normal text-muted-foreground transition-colors duration-300">
                <button onClick={() => handleLinkClick("Export Documentation")} className="hover:text-brand-blue transition-colors text-left">Export Documentation</button>
                <button onClick={() => handleLinkClick("Quality Standards")} className="hover:text-brand-blue transition-colors text-left">Quality Standards</button>
                <button onClick={() => handleLinkClick("Career")} className="hover:text-brand-blue transition-colors text-left">Career</button>
              </nav>
            </div>
          </div>
        </div>

        {/* Divider line */}
        <div className="border-t border-border/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300">
          <p className="text-xs text-muted-foreground font-sans font-normal text-center sm:text-left transition-colors duration-300">
            &copy; 2026 Venkateswara Lovaprasad Exports. All rights reserved.
          </p>
          <span className="text-xs font-bold text-muted-foreground font-sans transition-colors duration-300">
            GSTIN: 29XXXXXXXXXXXXX
          </span>
        </div>
      </div>
    </footer>
  );
}

