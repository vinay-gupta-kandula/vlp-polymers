"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRAPI_URL } from "@/lib/utils";
import RequirementModal from "@/components/RequirementModal";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useTheme } from "@/components/ThemeContext";

// Comprehensive Catalog Data
interface Product {
  id: number;
  title: string;
  badge?: string;
  image: string;
  category: "Boxes" | "Sheets" | "Beans" | "Pharma";
  capacityLiters: number;
  description: string;
  footerTag: string;
  specs: {
    [key: string]: string;
  };
}

const ALL_CATALOG_PRODUCTS: Product[] = [
  {
    id: 1,
    title: "120 Liter Thermocol Box",
    badge: "Industrial Grade",
    image: "/assets/box_120.png",
    category: "Boxes",
    capacityLiters: 120,
    description: "High capacity, high density insulation box for heavy-duty storage and transit.",
    footerTag: "Industrial Spec",
    specs: {
      Capacity: "120 L",
      Material: "EPS",
      Density: "High Density",
      "Wall Thickness": "50 mm"
    }
  },
  {
    id: 2,
    title: "75 Liter Ice Box",
    badge: "Commercial Grade",
    image: "/assets/box_60.png",
    category: "Boxes",
    capacityLiters: 75,
    description: "Standard commercial ice box optimized for catering, cold chain logistics, and fishing.",
    footerTag: "Cold Chain Spec",
    specs: {
      Capacity: "75 L",
      Usage: "Cold Chain",
      Material: "EPS",
      "Retention Time": "48 Hours"
    }
  },
  {
    id: 3,
    title: "EPS Thermocol Sheets",
    badge: "Insulation Grade",
    image: "/assets/Sheets_bg.png",
    category: "Sheets",
    capacityLiters: 0,
    description: "Versatile Expanded Polystyrene sheets for thermal insulation, packaging padding, and crafts.",
    footerTag: "Custom Size",
    specs: {
      Density: "Customizable",
      Application: "Packaging",
      Thermal: "Excellent",
      Grade: "Premium"
    }
  },
  {
    id: 4,
    title: "Bean Bag Refill",
    badge: "High Resiliency",
    image: "/assets/beans.png",
    category: "Beans",
    capacityLiters: 0,
    description: "Premium quality expanded polystyrene beans with high resiliency for cushion and beanbag refills.",
    footerTag: "High Volume",
    specs: {
      Type: "Loose Fill",
      Grade: "Premium",
      BeanSize: "3 - 5 mm",
      Yield: "Max Volume"
    }
  },
  {
    id: 5,
    title: "Pharma Spec Box 20L",
    badge: "Pharma Grade",
    image: "/assets/box_60.png",
    category: "Pharma",
    capacityLiters: 20,
    description: "Specialized pharmaceutical insulated shippers for safe vaccine and drug logistics.",
    footerTag: "WHO Certified",
    specs: {
      Capacity: "20 L",
      "Temp Control": "High",
      Standard: "Pharma Spec",
      Security: "Sealed Lid"
    }
  },
  {
    id: 6,
    title: "Standard Box 60L",
    badge: "Retail Standard",
    image: "/assets/box_60.png",
    category: "Boxes",
    capacityLiters: 60,
    description: "Standard general-purpose insulated boxes for logistics, personal excursions, and catering.",
    footerTag: "Standard Use",
    specs: {
      Capacity: "60 L",
      "Temp Control": "Medium",
      Material: "EPS",
      Durability: "Reinforced"
    }
  },
  // Additional products to support interactive pagination (Pages 1, 2, 3)
  {
    id: 7,
    title: "20 Liter Mini Box",
    badge: "Compact Grade",
    image: "/assets/box_60.png",
    category: "Boxes",
    capacityLiters: 20,
    description: "Compact size lightweight shipper for quick commutes and small cold-storage demands.",
    footerTag: "Mini Spec",
    specs: {
      Capacity: "20 L",
      Material: "EPS",
      Weight: "Ultra Light",
      Portable: "Yes"
    }
  },
  {
    id: 8,
    title: "Heavy Duty EPS Block",
    badge: "Construction",
    image: "/assets/Sheets_bg.png",
    category: "Sheets",
    capacityLiters: 0,
    description: "Large blocks of Expanded Polystyrene for geo-foam structural fill and structural insulation.",
    footerTag: "Civil Grade",
    specs: {
      Density: "30 kg/m³",
      Strength: "Structural",
      Usage: "Civil Works",
      EcoSafe: "Yes"
    }
  },
  {
    id: 9,
    title: "High Density Beans",
    badge: "Bean Refill",
    image: "/assets/beans.png",
    category: "Beans",
    capacityLiters: 0,
    description: "High-density micro beans for medical support cushions and delicate void-fill wrapping.",
    footerTag: "Micro Spec",
    specs: {
      Type: "Micro Fill",
      Size: "1 - 2 mm",
      Density: "Dense Fit",
      Softness: "Ultra Soft"
    }
  },
  {
    id: 10,
    title: "Pharma Box 100L Large",
    badge: "Pharma Spec",
    image: "/assets/box_120.png",
    category: "Pharma",
    capacityLiters: 100,
    description: "Large vaccine and biological spec shipper for bulk international logistics distribution.",
    footerTag: "Cold Chain Large",
    specs: {
      Capacity: "100 L",
      TempControl: "Precision",
      Duration: "72 Hours",
      Material: "EPS + PU"
    }
  },
  {
    id: 11,
    title: "Pharma Box 40L Mid",
    badge: "Pharma Spec",
    image: "/assets/box_60.png",
    category: "Pharma",
    capacityLiters: 40,
    description: "Mid-sized vaccine and pharmaceutical biological carrier with reinforced insulation ribs.",
    footerTag: "WHO Certified",
    specs: {
      Capacity: "40 L",
      TempControl: "Precision",
      Standard: "Pharma Spec",
      Weight: "Lightweight"
    }
  },
  {
    id: 12,
    title: "Custom Cut EPS Contour",
    badge: "Custom Mold",
    image: "/assets/Sheets_bg.png",
    category: "Sheets",
    capacityLiters: 0,
    description: "Pre-formed, contoured sheets shaped to specific consumer product borders for robust padding.",
    footerTag: "Bespoke Cut",
    specs: {
      Density: "Variable",
      Application: "Electronics",
      "Impact Lock": "Max Guard",
      FormFactor: "Contour"
    }
  },
  {
    id: 13,
    title: "Pharma Box 10L Mini",
    badge: "Pharma Spec",
    image: "/assets/box_60.png",
    category: "Pharma",
    capacityLiters: 10,
    description: "Ultra-portable compact pharmaceutical insulated carrier with carry straps for quick deliveries.",
    footerTag: "Pharma Mini",
    specs: {
      Capacity: "10 L",
      TempControl: "Active Guard",
      WHOApproved: "Yes",
      WallThickness: "40 mm"
    }
  },
  {
    id: 14,
    title: "Standard Box 100L",
    badge: "Retail Bulk",
    image: "/assets/box_120.png",
    category: "Boxes",
    capacityLiters: 100,
    description: "Large capacity general shipping box ideal for bulk seafood shipment, logistics and produce.",
    footerTag: "Bulk Spec",
    specs: {
      Capacity: "100 L",
      Material: "EPS",
      Retention: "36 Hours",
      WallThickness: "45 mm"
    }
  }
];

function getProductDetails(product: Product, selectedCapacity: string) {
  // Determine unit
  let unit = "Box";
  if (product.category === "Sheets") unit = "Sheet";
  if (product.category === "Beans") unit = "Bag";

  // Determine capacities list
  let capacities = ["60L", "75L", "120L"];
  if (product.category === "Sheets") capacities = ["10mm", "25mm", "50mm"];
  if (product.category === "Beans") capacities = ["1 Kg", "3 Kg", "5 Kg"];
  if (product.category === "Pharma") capacities = ["10L", "20L", "40L"];

  // Use selected capacity or default
  const activeCap = selectedCapacity || (capacities.includes(product.capacityLiters + "L") ? product.capacityLiters + "L" : capacities[capacities.length - 1]);

  // Determine base price based on capacity
  let price = 300;
  if (product.category === "Boxes") {
    if (activeCap === "60L") price = 180;
    else if (activeCap === "75L") price = 220;
    else price = 300;
  } else if (product.category === "Sheets") {
    if (activeCap === "10mm") price = 40;
    else if (activeCap === "25mm") price = 60;
    else price = 80;
  } else if (product.category === "Beans") {
    if (activeCap === "1 Kg") price = 150;
    else if (activeCap === "3 Kg") price = 380;
    else price = 550;
  } else if (product.category === "Pharma") {
    if (activeCap === "10L") price = 320;
    else if (activeCap === "20L") price = 450;
    else price = 550;
  }

  // Determine weight based on active capacity
  let weight = "1.2 Kg";
  if (product.category === "Boxes") {
    if (activeCap === "60L") weight = "0.7 Kg";
    else if (activeCap === "75L") weight = "0.9 Kg";
    else weight = "1.2 Kg";
  } else if (product.category === "Sheets") {
    if (activeCap === "10mm") weight = "0.08 Kg";
    else if (activeCap === "25mm") weight = "0.15 Kg";
    else weight = "0.25 Kg";
  } else if (product.category === "Beans") {
    weight = activeCap;
  } else if (product.category === "Pharma") {
    if (activeCap === "10L") weight = "0.4 Kg";
    else if (activeCap === "20L") weight = "0.5 Kg";
    else weight = "1.0 Kg";
  }

  // Default specs mapping
  const specs = {
    Shape: product.specs?.Shape || product.specs?.shape || (product.category === "Sheets" ? "Flat Panel" : product.category === "Beans" ? "Spherical Beans" : "Rectangular"),
    Weight: weight,
    Feature: product.specs?.Feature || product.specs?.feature || product.specs?.Features || product.specs?.features || (product.category === "Boxes" ? "Rigid, Thermal Insulation Property, Recyclable, High Durability, Light Weight" : product.category === "Sheets" ? "Thermal Insulation Property, Sound Dampening, Easy to Cut, Lightweight" : product.category === "Beans" ? "High Resiliency, Ultra Cushioned, Recyclable, Long Lasting" : "Precision Temp Control, Sealed Lid, High Density Ribs"),
    Grade: product.specs?.Grade || product.specs?.grade || (product.category === "Pharma" ? "Pharma Grade EPS" : product.category === "Beans" ? "Premium EPS" : "Normal EPS"),
    Colour: product.specs?.Colour || product.specs?.colour || product.specs?.Color || product.specs?.color || "White",
    Usage: product.specs?.Usage || product.specs?.usage || (product.category === "Boxes" ? "Packaging" : product.category === "Sheets" ? "Construction & Insulation" : product.category === "Beans" ? "Bean Bag Cushioning" : "Vaccine & Drug Logistics")
  };

  return {
    price,
    unit,
    capacities,
    activeCapacity: activeCap,
    specs
  };
}

export default function ProductRangePage() {
  const { theme } = useTheme();
  const [products, setProducts] = useState<Product[]>(ALL_CATALOG_PRODUCTS);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "Boxes",
    "Sheets",
    "Beans",
    "Pharma"
  ]);
  const [selectedCapacities, setSelectedCapacities] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>("Popularity");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sliderOffset, setSliderOffset] = useState<number>(0);
  
  // Custom states for detailed product preview view
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [activeCapacityState, setActiveCapacityState] = useState<string>("");

  const selectProduct = (product: Product | null) => {
    setSelectedDetailProduct(product);
    if (product) {
      const details = getProductDetails(product, "");
      setActiveCapacityState(details.activeCapacity);
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.set("product", product.id.toString());
        window.history.pushState({}, "", url.toString());
      }
    } else {
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("product");
        window.history.pushState({}, "", url.toString());
      }
    }
  };

  // Synchronize product detail view with URL ?product=ID query parameter
  useEffect(() => {
    if (typeof window !== "undefined" && products.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const prodIdStr = params.get("product");
      if (prodIdStr) {
        const prodId = parseInt(prodIdStr, 10);
        const found = products.find((p) => p.id === prodId);
        if (found) {
          setSelectedDetailProduct(found);
          const details = getProductDetails(found, "");
          setActiveCapacityState(details.activeCapacity);
        } else {
          setSelectedDetailProduct(null);
        }
      } else {
        setSelectedDetailProduct(null);
      }
    }
  }, [products]);

  // Handle browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined" && products.length > 0) {
        const params = new URLSearchParams(window.location.search);
        const prodIdStr = params.get("product");
        if (prodIdStr) {
          const prodId = parseInt(prodIdStr, 10);
          const found = products.find((p) => p.id === prodId);
          if (found) {
            setSelectedDetailProduct(found);
            const details = getProductDetails(found, "");
            setActiveCapacityState(details.activeCapacity);
          } else {
            setSelectedDetailProduct(null);
          }
        } else {
          setSelectedDetailProduct(null);
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [products]);

  // Parse URL search parameters to pre-select category and set search query on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get("category");
      if (cat && ["Boxes", "Sheets", "Beans", "Pharma"].includes(cat)) {
        setSelectedCategories([cat]);
      }
      const search = params.get("search");
      if (search) {
        setSearchQuery(search);
      }
    }
  }, []);

  // Fetch products from Strapi
  useEffect(() => {
    interface StrapiProductItem {
      id: number;
      title: string;
      badge?: string | null;
      category: "Boxes" | "Sheets" | "Beans" | "Pharma";
      capacityLiters?: number | null;
      description?: string | null;
      footerTag?: string | null;
      imageUrl?: string | null;
      imageMedia?: {
        url?: string;
        data?: {
          attributes?: {
            url?: string;
          };
        } | null;
      } | null;
      specs?: {
        [key: string]: string;
      } | null;
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
        if (response.ok) {
          const json = await response.json();
          if (json && json.data && json.data.length > 0) {
            const mappedProducts = json.data.map((item: StrapiProductItem) => {
              const mediaUrl = item.imageMedia?.url || item.imageMedia?.data?.attributes?.url;
              const imageUrl = mediaUrl 
                ? (mediaUrl.startsWith("http") ? mediaUrl : `${STRAPI_URL}${mediaUrl}`)
                : (item.imageUrl || "/assets/box_60.png");

              return {
                id: item.id,
                title: item.title,
                badge: item.badge || undefined,
                image: imageUrl,
                category: item.category,
                capacityLiters: item.capacityLiters || 0,
                description: item.description || "",
                footerTag: item.footerTag || "",
                specs: item.specs || {}
              };
            });
            setProducts(mappedProducts);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch products from Strapi backend. Falling back to local catalog.", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Toggle Category Checkbox
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Toggle Capacity Checkbox
  const handleCapacityToggle = (capacityRange: string) => {
    setSelectedCapacities((prev) =>
      prev.includes(capacityRange)
        ? prev.filter((r) => r !== capacityRange)
        : [...prev, capacityRange]
    );
    setCurrentPage(1);
  };

  // Check if a product capacity falls in chosen filters
  const matchesCapacityFilter = useCallback((product: Product) => {
    if (selectedCapacities.length === 0) return true;
    return selectedCapacities.some((range) => {
      const cap = product.capacityLiters;
      if (range === "Up to 20L") return cap > 0 && cap <= 20;
      if (range === "21L - 60L") return cap >= 21 && cap <= 60;
      if (range === "61L - 100L") return cap >= 61 && cap <= 100;
      if (range === "100L+") return cap >= 100;
      return true;
    });
  }, [selectedCapacities]);

  // Filtered & Sorted Products
  const processedProducts = useMemo(() => {
    // 1. Search Query filter
    let items = products.filter((product) => {
      const query = searchQuery.toLowerCase().trim();
      if (!query) return true;
      return (
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });

    // 2. Category checkbox filter
    items = items.filter((product) => selectedCategories.includes(product.category));

    // 3. Capacity Liters checkbox filter
    items = items.filter(matchesCapacityFilter);

    // 4. Sorting logic
    if (sortOption === "Name") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Capacity: High to Low") {
      items.sort((a, b) => b.capacityLiters - a.capacityLiters);
    } else if (sortOption === "Capacity: Low to High") {
      items.sort((a, b) => a.capacityLiters - b.capacityLiters);
    } // Popularity maintains the base index

    return items;
  }, [products, searchQuery, selectedCategories, sortOption, matchesCapacityFilter]);

  // Popular Carousel Products (Top Horizontal Scroll)
  const popularSliderProducts = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);

  // Pagination Logic
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(processedProducts.length / itemsPerPage));
  const currentGridProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processedProducts.slice(start, start + itemsPerPage);
  }, [processedProducts, currentPage]);

  // Carousel slider actions
  const slideLeft = () => {
    setSliderOffset((prev) => Math.max(prev - 1, 0));
  };
  const slideRight = () => {
    // With 4 items total, capping offsets simply to show responsiveness
    setSliderOffset((prev) => Math.min(prev + 1, 1));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      {/* Main Catalog View Container */}
      <main className="flex-grow pt-24 relative overflow-hidden bg-background">
        <img
          src="/assets/product catalouge bg.png"
          alt="Vector Background"
          className={`absolute left-0 bottom-0 w-full h-auto max-h-[85vh] object-cover object-bottom pointer-events-none z-0 transition-opacity duration-300 ${
            theme === "dark" ? "opacity-[0.03]" : "opacity-100"
          }`}
        />

        {selectedDetailProduct ? (
          /* Render Detailed Product View matching the screenshot */
          <section className="container mx-auto px-4 md:px-8 py-12 relative z-10 animate-fadeIn">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-8 font-sans font-normal">
              <Link href="/" className="hover:text-brand-blue hover:underline transition-all">Home</Link>
              <span className="text-muted-foreground/45">/</span>
              <button 
                onClick={() => selectProduct(null)} 
                className="hover:text-brand-blue hover:underline transition-all"
              >
                Product Range
              </button>
              <span className="text-muted-foreground/45">/</span>
              <span className="text-foreground font-bold">{selectedDetailProduct.title}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Image and Gallery */}
              <div className="lg:col-span-6 flex flex-col gap-6">
                <div className="bg-card border border-border rounded-3xl p-8 flex items-center justify-center min-h-[420px] shadow-sm overflow-hidden group">
                  <img
                    src={selectedDetailProduct.image}
                    alt={selectedDetailProduct.title}
                    className="max-h-[360px] w-auto object-contain transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
                {/* Thumbnails row */}
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-2xl border-2 border-brand-blue bg-card flex items-center justify-center p-2 cursor-pointer shadow-xs overflow-hidden">
                    <img
                      src={selectedDetailProduct.image}
                      alt="Thumbnail 1"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-border bg-card flex flex-col items-center justify-center text-muted-foreground hover:border-brand-blue hover:text-brand-blue transition-all cursor-pointer shadow-xs">
                    <i className="fa-regular fa-image text-xl mb-1" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">More Views</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Title, pricing, capacity and specifications table */}
              <div className="lg:col-span-6 text-left flex flex-col">
                <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-dark tracking-tight leading-tight mb-2">
                  {selectedDetailProduct.title} / {
                    selectedDetailProduct.category === "Boxes" 
                      ? "Fish Box" 
                      : selectedDetailProduct.category === "Sheets" 
                        ? "Insulation Panel" 
                        : selectedDetailProduct.category === "Beans" 
                          ? "EPS Round Beans" 
                          : "Vaccine Shipper"
                  }
                </h1>
                
                {/* Pricing section */}
                <div className="text-3xl font-extrabold text-brand-blue mb-4">
                  ₹ {getProductDetails(selectedDetailProduct, activeCapacityState).price} / {
                    getProductDetails(selectedDetailProduct, activeCapacityState).unit
                  }
                </div>

                {/* Quality Badges */}
                <div className="flex flex-wrap gap-2.5 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 rounded-full border border-emerald-100 shadow-2xs">
                    <i className="fa-solid fa-circle-check text-[10px]" /> Quality Assured
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 rounded-full border border-indigo-100 shadow-2xs">
                    <i className="fa-solid fa-truck-fast text-[10px]" /> Fast Shipping
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1 text-[11px] font-bold text-sky-700 bg-sky-50 rounded-full border border-sky-100 shadow-2xs">
                    <i className="fa-solid fa-tags text-[10px]" /> B2B Bulk Pricing
                  </span>
                </div>

                {/* Select Capacity/Size Selector */}
                <div className="mb-8">
                  <span className="text-[10px] font-extrabold text-muted-foreground block tracking-wider uppercase mb-3">
                    SELECT {selectedDetailProduct.category === "Sheets" ? "THICKNESS" : selectedDetailProduct.category === "Beans" ? "PACK SIZE" : "CAPACITY"}
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {getProductDetails(selectedDetailProduct, "").capacities.map((cap) => (
                      <button
                        key={cap}
                        onClick={() => setActiveCapacityState(cap)}
                        className={`px-5 py-2.5 text-xs font-bold rounded-xl border transition-all duration-200 active:scale-98 shadow-2xs ${
                          activeCapacityState === cap
                            ? "border-brand-blue bg-brand-light text-brand-blue ring-2 ring-brand-blue/15"
                            : "border-border bg-card text-muted-foreground hover:border-brand-blue hover:text-brand-blue"
                        }`}
                      >
                        {cap}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specifications Card with overlapping Interest Button */}
                <div className="relative border border-border rounded-3xl bg-card shadow-md p-1 pb-24 overflow-hidden w-full max-w-[460px]">
                  <div className="flex flex-col">
                    {Object.entries(getProductDetails(selectedDetailProduct, activeCapacityState).specs).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`grid grid-cols-12 p-4 text-xs sm:text-sm font-sans border-b border-border last:border-0 items-center ${
                          idx % 2 === 1 ? "bg-secondary/40" : "bg-card"
                        }`}
                      >
                        <span className="col-span-4 font-bold text-foreground/85 uppercase tracking-wider text-[10px]">{key}</span>
                        <span className="col-span-8 font-normal text-brand-blue pl-4">{val}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute inset-x-0 bottom-6 flex justify-center pointer-events-none">
                    <button
                      onClick={() => setModalOpen(true)}
                      className="pointer-events-auto bg-brand-blue hover:bg-brand-hover text-white font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 flex items-center gap-2"
                    >
                      <i className="fa-solid fa-envelope" />
                      Yes, I&apos;m Interested!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Custom Blue Rounded Hero Banner matching the Figma Mockup and Screenshot */}
            <section className="container mx-auto px-4 md:px-8">
            <div 
              className="relative rounded-3xl py-6 px-8 md:py-8 md:px-12 overflow-hidden shadow-lg border border-border/10"
              style={{
                background: theme === "light" 
                  ? "linear-gradient(to right, #f1f5f9, #e2e8f0)" 
                  : theme === "dark" 
                    ? "linear-gradient(to right, #0f172a, #1e293b)" 
                    : "linear-gradient(to right, #00388d, #005cdb)"
              }}
            >
              {/* Elegant Background Circles matching the screenshot */}
              <div 
                className="absolute inset-0 opacity-95 transition-all duration-300" 
                style={{
                  background: theme === "classic" ? "linear-gradient(to right, #00388d, #005cdb)" : "transparent"
                }}
              />
              
              {/* Concentric Circles top right */}
              <div className="absolute -top-16 right-[22%] w-[280px] h-[280px] rounded-full border-[14px] border-foreground/5 pointer-events-none" />
              <div className="absolute -top-8 right-[25%] w-[180px] h-[180px] rounded-full border-[10px] border-foreground/5 pointer-events-none" />
              
              {/* Concentric Circles bottom center/right */}
              <div className="absolute -bottom-20 right-[35%] w-[240px] h-[240px] rounded-full border-[12px] border-foreground/5 pointer-events-none" />
              <div className="absolute -bottom-10 right-[38%] w-[140px] h-[140px] rounded-full border-[8px] border-foreground/5 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Title column */}
                <div className="md:col-span-7 text-left flex flex-col justify-center">
                  <h1 className="font-heading text-3xl sm:text-4xl md:text-[44px] font-extrabold tracking-tight leading-[1.15] mb-4 text-[var(--product-range-text-title)]">
                    Industrial Excellence <br className="hidden sm:inline" />
                    Redefined
                  </h1>
                  <p className="text-[var(--product-range-text-body)] text-sm sm:text-base leading-relaxed max-w-xl font-sans font-normal transition-colors duration-300">
                    Delivering premium grade Thermocol and Packaging solutions for industrial and commercial applications.
                  </p>
                </div>
                {/* Logo frame container column - using high-resolution VLP Solutions 2.png */}
                <div className="md:col-span-5 flex justify-center md:justify-end">
                  <img
                    src="/assets/VLP Solutions 2.png"
                    alt="VLP SWAN Logo Card"
                    className="max-h-36 sm:max-h-40 md:max-h-44 w-auto object-contain rounded-2xl shadow-md transition-transform duration-300 hover:scale-102"
                    style={{ filter: theme === "dark" ? "brightness(0.85) contrast(1.15)" : undefined }}
                  />
                </div>
              </div>
            </div>
        </section>

        {/* Two-Column Search Grid */}
        <section className="relative w-full py-12">
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 1. Left Sidebar Columns */}
            <div className="lg:col-span-3 flex flex-col gap-6 w-full">
              {/* Active Search Field */}
              <div className="relative w-full">
                <img
                  src="/assets/search_Icon.png"
                  alt="Search Icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 object-contain opacity-60 pointer-events-none"
                  style={{ filter: theme === "dark" ? "invert(1) brightness(0.8)" : "none" }}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-11 pr-4 py-3 text-sm rounded-xl border-2 border-border bg-card text-foreground placeholder-muted-foreground outline-none transition-all duration-300 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
                />
              </div>

              {/* Category checkbox component */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-xs flex flex-col gap-4 text-left">
                <h3 className="font-heading text-base font-bold text-brand-dark tracking-tight pb-3 border-b border-border">
                  Categories
                </h3>
                <div className="flex flex-col gap-3 font-sans font-normal text-muted-foreground text-sm">
                  {["Boxes", "Sheets", "Beans", "Pharma"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group hover:text-brand-blue select-none">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-4.5 h-4.5 rounded border-border bg-card text-brand-blue focus:ring-brand-blue/20 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>
                        {cat === "Boxes" && "Thermocol Boxes"}
                        {cat === "Sheets" && "Thermocol Sheets"}
                        {cat === "Beans" && "Thermocol Beans"}
                        {cat === "Pharma" && "Pharma Boxes"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Capacity filter checkboxes */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-xs flex flex-col gap-4 text-left">
                <h3 className="font-heading text-base font-bold text-brand-dark tracking-tight pb-3 border-b border-border">
                  Capacity (Liters)
                </h3>
                <div className="flex flex-col gap-3 font-sans font-normal text-muted-foreground text-sm">
                  {["Up to 20L", "21L - 60L", "61L - 100L", "100L+"].map((range) => (
                    <label key={range} className="flex items-center gap-3 cursor-pointer group hover:text-brand-blue select-none">
                      <input
                        type="checkbox"
                        checked={selectedCapacities.includes(range)}
                        onChange={() => handleCapacityToggle(range)}
                        className="w-4.5 h-4.5 rounded border-border bg-card text-brand-blue focus:ring-brand-blue/20 focus:ring-offset-0 cursor-pointer"
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Right Catalog Lists Column */}
            <div className="lg:col-span-9 flex flex-col gap-10 w-full text-left">
              {/* Popular Products Carousel Component */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading text-xl font-extrabold text-brand-dark tracking-tight">
                    Popular Products
                  </h2>
                  {/* Slider Scroll Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={slideLeft}
                      disabled={sliderOffset === 0}
                      className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground transition-all shadow-xs active:scale-95"
                      aria-label="Slide popular products left"
                    >
                      <img
                        src="/assets/left_Arrow.png"
                        alt="Previous"
                        className="w-2.5 h-2.5 object-contain opacity-75"
                        style={{ filter: theme === "dark" ? "invert(1)" : undefined }}
                      />
                    </button>
                    <button
                      onClick={slideRight}
                      disabled={sliderOffset === 1}
                      className="w-8 h-8 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground transition-all shadow-xs active:scale-95"
                      aria-label="Slide popular products right"
                    >
                      <img
                        src="/assets/right_arrow.png"
                        alt="Next"
                        className="w-2.5 h-2.5 object-contain opacity-75"
                        style={{ filter: theme === "dark" ? "invert(1)" : undefined }}
                      />
                    </button>
                  </div>
                </div>

                {/* Popular Horizontal Row Wrapper */}
                <div className="overflow-hidden w-full">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-12 bg-card border border-border rounded-xl shadow-xs">
                      <Loader2 className="w-6 h-6 text-brand-blue animate-spin" />
                    </div>
                  ) : (
                    <div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(-${sliderOffset * 10}px)` }}
                    >
                      {popularSliderProducts.map((prod) => (
                        <Card
                          key={`popular-${prod.id}`}
                          className="group bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between p-4 min-h-[350px]"
                        >
                          <div>
                            {/* Image Box */}
                            <div className="relative h-36 bg-muted/20 rounded-lg overflow-hidden border border-border flex items-center justify-center mb-4">
                              {prod.badge && (
                                <span className="absolute top-2 left-2 bg-brand-light text-brand-blue border border-brand-blue/15 text-[9px] font-bold px-2 py-0.5 rounded shadow-xs z-10 transition-colors duration-300">
                                  {prod.badge}
                                </span>
                              )}
                              <img
                                src={prod.image}
                                alt={prod.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                              />
                            </div>
                            {/* Title */}
                            <h4 className="font-heading text-sm font-extrabold text-brand-dark group-hover:text-brand-blue transition-colors leading-tight mb-2">
                              {prod.title}
                            </h4>
                            <p className="text-xs text-muted-foreground font-sans font-normal leading-relaxed transition-colors duration-300">
                              {prod.description}
                            </p>
                          </div>
                          {/* Button */}
                          <button
                            onClick={() => selectProduct(prod)}
                            className="w-full bg-brand-light hover:bg-brand-blue/20 text-brand-blue font-bold text-xs py-2.5 rounded-lg border border-brand-blue/10 transition-colors mt-4"
                          >
                            View Details
                          </button>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Grid lists showcase with interactive sorting */}
              <div className="border-t border-border pt-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="font-heading text-2xl font-extrabold text-brand-dark tracking-tight">
                      All Products
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1 font-sans font-normal">
                      Showing {Math.min(processedProducts.length, (currentPage - 1) * itemsPerPage + 1)}-
                      {Math.min(processedProducts.length, currentPage * itemsPerPage)} of{" "}
                      {processedProducts.length} results
                    </p>
                  </div>
                  {/* Active Sorting controls */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground font-sans">Sort by:</span>
                    <select
                      value={sortOption}
                      onChange={(e) => {
                        setSortOption(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="text-xs font-bold text-foreground bg-card border border-border rounded-lg px-3 py-2 outline-none focus:border-brand-blue cursor-pointer shadow-xs"
                    >
                      <option value="Popularity">Popularity</option>
                      <option value="Name">Name (A-Z)</option>
                      <option value="Capacity: High to Low">Capacity: High to Low</option>
                      <option value="Capacity: Low to High">Capacity: Low to High</option>
                    </select>
                  </div>
                </div>

                {/* Primary Paginated Products Grid */}
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-2xl shadow-xs">
                    <Loader2 className="w-8 h-8 text-brand-blue animate-spin mb-4" />
                    <p className="text-muted-foreground font-sans text-sm font-semibold">Loading catalog from server...</p>
                  </div>
                ) : currentGridProducts.length === 0 ? (
                  <div className="text-center py-16 bg-card border border-dashed border-border rounded-2xl">
                    <p className="text-muted-foreground text-sm font-sans font-normal">
                      No products match your selected search or filter criteria. Try adjusting the parameters.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentGridProducts.map((product) => (
                      <Card
                        key={`grid-${product.id}`}
                        className="group bg-card border border-border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      >
                        {/* Image Panel */}
                        <div className="relative h-44 bg-muted/20 flex items-center justify-center overflow-hidden border-b border-border">
                          {product.badge && (
                            <span className="absolute top-3 left-3 bg-brand-light text-brand-blue border border-brand-blue/15 text-[10px] font-bold px-2.5 py-0.5 rounded shadow-xs z-10">
                              {product.badge}
                            </span>
                          )}
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                          />
                        </div>

                        {/* Text Specs Area */}
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <h3 className="font-heading text-base font-extrabold text-brand-dark group-hover:text-brand-blue transition-colors leading-tight mb-3">
                              {product.title}
                            </h3>
                            {/* Key Specs Table rows */}
                            <div className="grid grid-cols-2 gap-2 text-xs font-sans border-t border-b border-border/70 py-3 mb-4">
                              {Object.entries(product.specs).slice(0, 2).map(([key, val]) => (
                                <div key={key} className="flex flex-col gap-0.5">
                                  <span className="font-bold text-muted-foreground block">{key}</span>
                                  <span className="font-extrabold text-foreground block truncate">{val}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Bidirectional CTAs */}
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            <button
                              onClick={() => selectProduct(product)}
                              className="border border-border hover:border-brand-blue text-muted-foreground hover:text-brand-blue bg-card font-bold text-xs py-2.5 rounded-lg transition-colors"
                            >
                              Details
                            </button>
                            <button
                              onClick={() => setModalOpen(true)}
                              className="bg-brand-blue hover:bg-brand-hover text-white font-bold text-xs py-2.5 rounded-lg shadow-xs hover:shadow-md transition-all duration-300"
                            >
                              Get Quote
                            </button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Paginated Navigation Control Panel */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground transition-all shadow-xs active:scale-95"
                      aria-label="Previous page"
                    >
                      <img
                        src="/assets/left_Arrow.png"
                        alt="Previous"
                        className="w-3 h-3 object-contain opacity-75"
                        style={{ filter: theme === "dark" ? "invert(1)" : undefined }}
                      />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-9 h-9 rounded-lg font-bold text-xs transition-colors shadow-xs ${
                          currentPage === page
                            ? "bg-brand-blue text-white"
                            : "bg-card border border-border text-muted-foreground hover:border-brand-blue hover:text-brand-blue"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-9 h-9 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:border-brand-blue hover:text-brand-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:text-muted-foreground transition-all shadow-xs active:scale-95"
                      aria-label="Next page"
                    >
                      <img
                        src="/assets/right_arrow.png"
                        alt="Next"
                        className="w-3 h-3 object-contain opacity-75"
                        style={{ filter: theme === "dark" ? "invert(1)" : undefined }}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
          </>
        )}
      </main>

      {/* Quote Requirements Form Modal */}
      <RequirementModal isOpen={modalOpen} onOpenChange={setModalOpen} />

      <Footer />
    </div>
  );
}
