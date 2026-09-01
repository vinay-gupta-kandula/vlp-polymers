"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "./ThemeContext";
import { Sun, Moon, Palette, Check } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isProductRangePage = pathname === "/product-range";
  const isAboutUsPage = pathname === "/about-us";
  const isLeadershipPage = pathname === "/leadership";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { theme, setTheme } = useTheme();
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Click outside to close theme dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setThemeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/product-range?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "h-16 bg-[var(--header-bg)] shadow-sm border-b border-border/40 backdrop-blur-md"
          : "h-20 bg-[var(--header-bg)] border-b border-border/80 backdrop-blur-md"
      } flex items-center`}
    >
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between w-full h-full">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center select-none group">
          <img
            src="/assets/vlp_swan_logo.png"
            alt="VLP SWAN Logo"
            className="h-10 md:h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
            style={{ filter: "var(--logo-filter)" }}
          />
        </Link>

        {/* Central Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:block flex-1 max-w-xs mx-6">
          <div className="relative w-full">
            <img
              src="/assets/search_Icon.png"
              alt="Search Icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 object-contain opacity-75 pointer-events-none"
              style={{ filter: theme === "dark" ? "invert(1) brightness(0.8)" : "none" }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-2 border-border bg-secondary text-foreground placeholder-muted-foreground outline-none transition-all duration-300 focus:bg-card focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </form>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-stretch gap-7 h-full">
          <Link
            href="/"
            className={`text-sm font-semibold tracking-wide flex items-center border-b-[3px] pt-[3px] transition-all duration-200 ${
              pathname === "/"
                ? "text-brand-blue border-brand-blue"
                : "text-muted-foreground hover:text-brand-blue border-transparent hover:border-brand-blue"
            }`}
          >
            Home
          </Link>
          <Link
            href="/product-range"
            className={`text-sm font-semibold tracking-wide flex items-center border-b-[3px] pt-[3px] transition-all duration-200 ${
              isProductRangePage
                ? "text-brand-blue border-brand-blue"
                : "text-muted-foreground hover:text-brand-blue border-transparent hover:border-brand-blue"
            }`}
          >
            Product Range
          </Link>
          <Link
            href="/about-us"
            className={`text-sm font-semibold tracking-wide flex items-center border-b-[3px] pt-[3px] transition-all duration-200 ${
              isAboutUsPage
                ? "text-brand-blue border-brand-blue"
                : "text-muted-foreground hover:text-brand-blue border-transparent hover:border-brand-blue"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/about-us#contact"
            className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-brand-blue flex items-center border-b-[3px] border-transparent hover:border-brand-blue pt-[3px] transition-all duration-200"
          >
            Contact
          </Link>
          <Link
            href="/leadership"
            className={`text-sm font-semibold tracking-wide flex items-center border-b-[3px] pt-[3px] transition-all duration-200 ${
              isLeadershipPage
                ? "text-brand-blue border-brand-blue"
                : "text-muted-foreground hover:text-brand-blue border-transparent hover:border-brand-blue"
            }`}
          >
            Leadership
          </Link>
        </nav>

        {/* Get a Quote & Theme Selector Action - Desktop */}
        <div className="hidden md:flex items-center ml-4 relative" ref={dropdownRef}>
          {/* Theme Switcher Button */}
          <button
            type="button"
            onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-card text-foreground hover:bg-muted transition-colors mr-3"
            aria-label="Select theme"
          >
            {theme === "classic" && <Palette className="w-4.5 h-4.5 text-brand-blue" />}
            {theme === "light" && <Sun className="w-4.5 h-4.5 text-brand-blue" />}
            {theme === "dark" && <Moon className="w-4.5 h-4.5 text-brand-blue" />}
          </button>

          {/* Theme Dropdown Menu */}
          {themeDropdownOpen && (
            <div className="absolute right-32 top-11 w-40 bg-card border border-border rounded-xl shadow-xl p-1.5 z-50 animate-fadeIn duration-150 text-left">
              <button
                type="button"
                onClick={() => {
                  setTheme("classic");
                  setThemeDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg hover:bg-muted transition-colors ${
                  theme === "classic" ? "text-brand-blue bg-accent" : "text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Palette className="w-3.5 h-3.5" />
                  Classic
                </span>
                {theme === "classic" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme("light");
                  setThemeDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg hover:bg-muted transition-colors ${
                  theme === "light" ? "text-brand-blue bg-accent" : "text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5" />
                  Pure Light
                </span>
                {theme === "light" && <Check className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => {
                  setTheme("dark");
                  setThemeDropdownOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-lg hover:bg-muted transition-colors ${
                  theme === "dark" ? "text-brand-blue bg-accent" : "text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Moon className="w-3.5 h-3.5" />
                  Midnight Dark
                </span>
                {theme === "dark" && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          <Link
            href="/about-us#contact"
            className="bg-brand-blue hover:bg-brand-hover text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm"
          >
            Get a Quote
          </Link>
        </div>

        {/* Action Toggle - Mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fa-solid ${mobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl text-foreground`} />
        </button>
      </div>

      {/* Navigation Overlay - Mobile */}
      <div
        className={`fixed top-16 md:hidden left-0 w-full h-[calc(100vh-4rem)] bg-card z-40 flex flex-col p-8 gap-6 shadow-lg border-t border-border transition-transform duration-500 ease-out overflow-y-auto ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <form onSubmit={handleSearchSubmit} className="w-full mb-4">
          <div className="relative w-full">
            <img
              src="/assets/search_Icon.png"
              alt="Search Icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 object-contain opacity-75 pointer-events-none"
              style={{ filter: theme === "dark" ? "invert(1) brightness(0.8)" : "none" }}
            />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border-2 border-border bg-secondary text-sm text-foreground focus:bg-card focus:border-brand-blue outline-none"
            />
          </div>
        </form>
        <Link
          href="/"
          className={`text-base font-semibold tracking-wide py-2 border-b border-border ${
            pathname === "/" ? "text-brand-blue" : "text-muted-foreground hover:text-brand-blue"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/product-range"
          className={`text-base font-semibold tracking-wide py-2 border-b border-border ${
            isProductRangePage ? "text-brand-blue" : "text-muted-foreground hover:text-brand-blue"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Product Range
        </Link>
        <Link
          href="/about-us"
          className={`text-base font-semibold tracking-wide py-2 border-b border-border ${
            isAboutUsPage ? "text-brand-blue" : "text-muted-foreground hover:text-brand-blue"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          About Us
        </Link>

        <Link
          href="/about-us#contact"
          className="text-base font-semibold tracking-wide text-muted-foreground hover:text-brand-blue py-2 border-b border-border"
          onClick={() => setMobileMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/leadership"
          className={`text-base font-semibold tracking-wide py-2 border-b border-border ${
            isLeadershipPage ? "text-brand-blue" : "text-muted-foreground hover:text-brand-blue"
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          Leadership
        </Link>

        {/* Mobile Theme Selector */}
        <div className="border-t border-border pt-4 mt-2">
          <span className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Theme Selection</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setTheme("classic");
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-2 rounded-xl border text-xs font-bold transition-all ${
                theme === "classic"
                  ? "bg-accent border-brand-blue text-brand-blue"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              <Palette className="w-4 h-4 mb-1" />
              Classic
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("light");
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-2 rounded-xl border text-xs font-bold transition-all ${
                theme === "light"
                  ? "bg-accent border-brand-blue text-brand-blue"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              <Sun className="w-4 h-4 mb-1" />
              Pure Light
            </button>
            <button
              type="button"
              onClick={() => {
                setTheme("dark");
                setMobileMenuOpen(false);
              }}
              className={`flex flex-col items-center justify-center py-2 rounded-xl border text-xs font-bold transition-all ${
                theme === "dark"
                  ? "bg-accent border-brand-blue text-brand-blue"
                  : "bg-card border-border text-foreground hover:bg-muted"
              }`}
            >
              <Moon className="w-4 h-4 mb-1" />
              Midnight
            </button>
          </div>
        </div>
        
        <Link
          href="/about-us#contact"
          className="mt-4 bg-brand-blue hover:bg-brand-hover text-white text-center font-semibold py-3 rounded-full transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
