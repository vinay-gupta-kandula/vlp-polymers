"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/components/ThemeContext";
import { 
  Award, 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Star,
  ChevronRight,
  Loader2,
  CheckCircle2,
  Snowflake,
  HeartPulse,
  Building2,
  ShoppingBag
} from "lucide-react";

interface StrapiReview {
  id: number;
  name: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  responseText?: string;
  comments?: string;
}

export default function AboutUsPage() {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productInterest: "Thermacol Box",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("http://localhost:1337/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: formData
        })
      });
      if (!response.ok) {
        throw new Error("Failed to submit inquiry. Please make sure the backend is running.");
      }
      setSubmitted(true);
      setFormData({ name: "", email: "", productInterest: "Thermacol Box", message: "" });
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitError(error.message || "Could not connect to the backend server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock data representing reviews shown in the mockup
  const reviewsData = [
    {
      id: 1,
      author: "Y S",
      location: "Nidadavole, Andhra Pradesh",
      rating: 5,
      dateProduct: "01-December-25 | Product Name : White Thermacol Box",
      comment: "Response 👍"
    },
    {
      id: 2,
      author: "Quality Minds",
      location: "Vizianagaram, Andhra Pradesh",
      rating: 3,
      dateProduct: "30-July-25 | Product Name : Thermacol Box",
      comment: "Quality 👍 Response 👍 Delivery 👍"
    }
  ];

  const [reviews, setReviews] = React.useState(reviewsData);

  React.useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:1337/api/reviews");
        if (response.ok) {
          const json = await response.json();
          if (json && json.data && json.data.length > 0) {
            const mappedReviews = json.data.map((item: StrapiReview) => ({
              id: item.id,
              author: item.name,
              location: item.location,
              rating: item.rating,
              dateProduct: `${item.date} | Product Name : ${item.productName}`,
              comment: item.responseText || item.comments
            }));
            setReviews(mappedReviews);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch reviews from Strapi backend. Falling back to mockup reviews.", error);
      }
    };
    fetchReviews();
  }, []);

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? Number((reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1))
    : 0;

  // Render yellow stars based on rating (supporting half stars dynamically)
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 shrink-0" />
        );
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(
          <div key={i} className="relative inline-block w-3.5 h-3.5 shrink-0">
            <Star className="w-3.5 h-3.5 text-muted-foreground/25 fill-muted-foreground/25 absolute top-0 left-0" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-3.5 h-3.5 text-muted-foreground/25 fill-muted-foreground/25 shrink-0" />
        );
      }
    }
    return <div className="flex gap-0.5 my-1.5 shrink-0">{stars}</div>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      {/* Main Container */}
      <main className="flex-grow pt-20">
        
        {/* About Us Blue Header Banner */}
        <section className="bg-brand-blue py-5 md:py-6 text-white text-center">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">About Us</h1>
          </div>
        </section>

        {/* Form and Content Section */}
        <section className="py-12 md:py-16 bg-background">
          <div className="container mx-auto px-4 md:px-8 max-w-6xl">
            <div className="flex flex-col gap-16 md:gap-20">
              
              {/* Row 1: Summary */}
              <div className="flex flex-col items-center gap-8 pb-12 border-b border-border">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight text-center">
                  Summary
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full max-w-5xl text-left">
                  {/* Left side: summary.png image */}
                  <div className="md:col-span-6 flex justify-center">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-border/80 w-full max-w-[480px]">
                      <img 
                        src="/assets/summary.png" 
                        alt="Venkateswara Lovaprasad Exports Summary" 
                        className="w-full h-auto object-contain transition-transform duration-300 hover:scale-102"
                        style={{ 
                          filter: theme === "dark" ? "brightness(0.85) contrast(1.15)" : undefined 
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Right side: summary content */}
                  <div className="md:col-span-6 font-sans text-muted-foreground text-sm md:text-base leading-relaxed space-y-6">
                    <p>
                      Year of establishment <strong className="text-brand-dark">2011</strong>, <strong className="text-brand-dark">Venkateswara Lovaprasad Exports</strong> is a well-known manufacturer of <strong className="text-brand-dark">Thermacol Sheets, Thermocol Box, Beanbag Balls and Bean Bag</strong>. Our products are enormously used by patrons due to their attractive design, top quality, long-lasting nature and various colors. Moreover, our right business policy makes us a renowned organization of the market.
                    </p>
                    <p>
                      We work under the extreme support of our mentor <strong className="text-brand-dark">Prasad</strong>. Under his great support, we have achieved our business aims in efficient way. Our mentor has years of practice and affluent proficiency of this area.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 2: About Us (Business Info & Operations Cards) */}
              <div className="flex flex-col items-center gap-6 pb-12 border-b border-border text-center">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight">
                  About Us
                </h2>
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Card 1: Business Info */}
                  <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 text-left transition-all hover:shadow-xs">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-blue">
                        <Award className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="font-heading font-extrabold text-base md:text-lg text-brand-blue tracking-tight">
                        Business Information
                      </h3>
                    </div>
                    <ul className="space-y-4 font-sans text-xs md:text-sm text-muted-foreground font-medium">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>11-25 Employees</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>Partnership Firm | GST Registered Since Jul&apos;17</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>Manufacturer & Factory Operations</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <div>
                          <div>Annual Turnover: ₹1.5-₹5 Cr</div>
                          <div className="text-[11px] text-muted-foreground/75 font-normal mt-1">GST No: 37***********1ZC</div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  {/* Card 2: Services & Operations */}
                  <div className="bg-card border-2 border-border rounded-2xl p-6 md:p-8 text-left transition-all hover:shadow-xs">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center text-brand-blue">
                        <ShieldCheck className="w-5.5 h-5.5" />
                      </div>
                      <h3 className="font-heading font-extrabold text-base md:text-lg text-brand-blue tracking-tight">
                        Services & Operations
                      </h3>
                    </div>
                    <ul className="space-y-4 font-sans text-xs md:text-sm text-muted-foreground font-medium">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>Payment Modes: Cash, Credit Card, Cheque, DD</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>Flexible Shipment Modes Available</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>Manufacturing & Supply Services</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-blue mt-2 shrink-0" />
                        <span>Client-Friendly Business Operations</span>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>

              {/* Row 3: Why Us? */}
              <div className="flex flex-col items-center gap-6 pb-12 border-b border-border text-center">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight">
                  Why Us?
                </h2>
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
                  
                  {/* Card 1: Quality */}
                  <div className="bg-card border border-border rounded-xl p-6 text-center shadow-xs flex flex-col items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src="/assets/unmatched_quality.png" alt="Quality" className="w-8 h-8 object-contain" />
                    </div>
                    <h4 className="font-heading font-extrabold text-sm text-brand-dark">Unmatched Quality</h4>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                      Rigorous quality control processes ensure every export meets international standards.
                    </p>
                  </div>

                  {/* Card 2: Credibility */}
                  <div className="bg-card border border-border rounded-xl p-6 text-center shadow-xs flex flex-col items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src="/assets/trust.png" alt="Trust" className="w-8 h-8 object-contain" />
                    </div>
                    <h4 className="font-heading font-extrabold text-sm text-brand-dark">Proven Credibility</h4>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                      Built on transparency and trust, fostering long-term business relationships globally.
                    </p>
                  </div>

                  {/* Card 3: Reach */}
                  <div className="bg-card border border-border rounded-xl p-6 text-center shadow-xs flex flex-col items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <img src="/assets/global_reach.png" alt="Global Reach" className="w-8 h-8 object-contain" />
                    </div>
                    <h4 className="font-heading font-extrabold text-sm text-brand-dark">Global Reach</h4>
                    <p className="font-sans text-xs leading-relaxed text-muted-foreground">
                      Efficient logistics network spanning across continents for timely deliveries.
                    </p>
                  </div>

                </div>
              </div>

              {/* Row 4: Product Display */}
              <div className="flex flex-col items-center gap-6 pb-12 border-b border-border text-center">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight">
                  Product Display
                </h2>
                <div className="w-full max-w-4xl relative">
                  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none items-stretch justify-center">
                    
                    {/* Product Image 1 */}
                    <div className="min-w-[200px] max-w-[240px] flex-1 border border-border rounded-xl p-3 bg-muted/20 flex flex-col items-center justify-center relative group">
                      <div className="w-full aspect-[4/3] bg-card rounded-lg overflow-hidden relative">
                        <img 
                          src="/assets/box_120.png" 
                          alt="Thermacol Box" 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="font-heading font-extrabold text-[11px] text-muted-foreground mt-3">Thermacol Box</span>
                    </div>

                    {/* Product Image 2 */}
                    <div className="min-w-[200px] max-w-[240px] flex-1 border border-border rounded-xl p-3 bg-muted/20 flex flex-col items-center justify-center relative group">
                      <div className="w-full aspect-[4/3] bg-card rounded-lg overflow-hidden relative">
                        <img 
                          src="/assets/Sheets_bg.png" 
                          alt="Thermacol Sheets" 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="font-heading font-extrabold text-[11px] text-muted-foreground mt-3">Thermacol Sheets</span>
                    </div>

                    {/* Product Image 3 */}
                    <div className="min-w-[200px] max-w-[240px] flex-1 border border-border rounded-xl p-3 bg-muted/20 flex flex-col items-center justify-center relative group">
                      <div className="w-full aspect-[4/3] bg-card rounded-lg overflow-hidden relative">
                        <img 
                          src="/assets/beans.png" 
                          alt="Thermacol Beans" 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <span className="font-heading font-extrabold text-[11px] text-muted-foreground mt-3">Thermacol Loose Beans</span>
                      
                      {/* Carousel next arrow at the right boundary of the container */}
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden sm:flex">
                        <button 
                          className="w-7 h-7 rounded-full bg-card flex items-center justify-center text-muted-foreground shadow-md hover:text-brand-blue border border-border transition-colors active:scale-95"
                          aria-label="Next product"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* Row 5: Our Customers */}
              <div className="flex flex-col items-center gap-6 pb-12 border-b border-border text-center">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight text-center">
                  Our Customers
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto font-sans font-medium mb-4">
                  We supply premium thermal packaging, insulation panels, and raw EPS solutions to leading companies across multiple critical sectors.
                </p>
                <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
                  {/* Sector 1 */}
                  <div className="bg-card border border-border rounded-2xl p-6 text-left transition-all hover:shadow-sm hover:border-brand-blue/35">
                    <div className="w-10 h-10 rounded-xl bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue mb-4">
                      <Snowflake className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-extrabold text-sm text-brand-dark mb-2">
                      Fisheries & Seafood Exporters
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Rely on our high-durability cold-storage boxes to preserve fresh fish and marine catch during international transit.
                    </p>
                  </div>

                  {/* Sector 2 */}
                  <div className="bg-card border border-border rounded-2xl p-6 text-left transition-all hover:shadow-sm hover:border-brand-blue/35">
                    <div className="w-10 h-10 rounded-xl bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue mb-4">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-extrabold text-sm text-brand-dark mb-2">
                      Pharma Cold Chain
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Utilize specialized temperature-controlled boxes for distributing vaccine lots and bio-specimens safely.
                    </p>
                  </div>

                  {/* Sector 3 */}
                  <div className="bg-card border border-border rounded-2xl p-6 text-left transition-all hover:shadow-sm hover:border-brand-blue/35">
                    <div className="w-10 h-10 rounded-xl bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue mb-4">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-extrabold text-sm text-brand-dark mb-2">
                      Building Contractors
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Apply expanded polystyrene sheets (EPS Panels) for foundation geo-foam fill, floor insulation, and sound walls.
                    </p>
                  </div>

                  {/* Sector 4 */}
                  <div className="bg-card border border-border rounded-2xl p-6 text-left transition-all hover:shadow-sm hover:border-brand-blue/35">
                    <div className="w-10 h-10 rounded-xl bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue mb-4">
                      <ShoppingBag className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-extrabold text-sm text-brand-dark mb-2">
                      Retailers & Manufacturers
                    </h3>
                    <p className="font-sans text-xs text-muted-foreground leading-relaxed">
                      Purchase loose-fill virgin EPS beans and customized contoured block packaging for consumer goods logistics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Row 6: Testimonials */}
              <div className="flex flex-col items-center gap-6 pb-12 border-b border-border text-center">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight text-center">
                  Testimonials
                </h2>
                <div className="w-full max-w-4xl px-4 md:px-0">
                  
                  {/* Rating Header bar */}
                  <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-extrabold text-foreground leading-none">
                        {totalReviews > 0 ? `${averageRating.toFixed(1)}/5` : "0.0/5"}
                      </span>
                      <div className="text-left">
                        {renderStars(totalReviews > 0 ? averageRating : 0)}
                        <span className="text-[10px] sm:text-xs font-bold text-muted-foreground tracking-wide font-sans block">
                          Based on {totalReviews} {totalReviews === 1 ? "testimonial" : "testimonials"}
                        </span>
                      </div>
                    </div>
                    <button className="text-brand-blue text-xs sm:text-sm font-extrabold hover:underline">
                      Show more testimonials
                    </button>
                  </div>

                  {/* Reviews Cards List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {reviews.map((review) => (
                      <div 
                        key={review.id}
                        className="bg-card border border-border rounded-2xl p-5 md:p-6 text-left"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-heading font-extrabold text-sm text-brand-dark">{review.author}</h4>
                            <span className="text-[10px] text-muted-foreground font-semibold font-sans block mt-0.5">{review.location}</span>
                          </div>
                          {renderStars(review.rating)}
                        </div>
                        <div className="text-[10px] text-muted-foreground/80 font-semibold font-sans mt-3">
                          {review.dateProduct}
                        </div>
                        <div className="text-xs sm:text-sm text-foreground font-semibold mt-4 bg-muted/40 p-2.5 rounded-lg border border-border inline-block">
                          {review.comment}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Row 6: Get in Touch with Us */}
              <div id="contact" className="flex flex-col items-center gap-6 w-full text-center">
                <h2 className="text-brand-blue font-heading font-extrabold text-lg md:text-xl tracking-tight">
                  Get in Touch with Us
                </h2>
                <div className="w-full max-w-4xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    
                    {/* Left Column: Contact Information Cards */}
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-left flex flex-col">
                      <h3 className="font-heading font-extrabold text-base md:text-lg text-brand-blue tracking-tight mb-6">
                        Contact Information
                      </h3>
                      
                      <div className="space-y-6">
                        
                        {/* Address */}
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                            <MapPin className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-heading font-extrabold text-xs text-brand-dark uppercase tracking-wider">
                              Venkateswara Lovaprasad Exports
                            </h4>
                            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                              Tatipaka, Annavaram, East Godavari, Andhra Pradesh, India
                            </p>
                          </div>
                        </div>

                        {/* CEO */}
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                            <User className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-heading font-extrabold text-xs text-brand-dark uppercase tracking-wider">
                              Prasad
                            </h4>
                            <p className="font-sans text-xs md:text-sm text-muted-foreground leading-relaxed mt-1">
                              CEO
                            </p>
                          </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                            <Phone className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <h4 className="font-heading font-extrabold text-xs text-brand-dark uppercase tracking-wider">
                              Phone
                            </h4>
                            <a 
                              href="tel:+918047636510" 
                              className="font-sans text-xs md:text-sm text-brand-blue hover:underline font-bold block mt-1"
                            >
                              +91-8047636510
                            </a>
                          </div>
                        </div>

                        {/* Send Email link */}
                        <div className="flex gap-4 items-center pt-2">
                          <div className="w-8 h-8 rounded-lg bg-brand-light flex items-center justify-center text-brand-blue shrink-0">
                            <Mail className="w-4.5 h-4.5" />
                          </div>
                          <a 
                            href="mailto:info@vlpswan.com"
                            className="text-xs md:text-sm font-extrabold text-brand-blue hover:underline flex items-center gap-1.5"
                          >
                            Send Email
                            <ChevronRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                      </div>
                    </div>

                    {/* Right Column: Submit Requirement Form */}
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 text-left shadow-xs flex flex-col justify-between">
                      <h3 className="font-heading font-extrabold text-base md:text-lg text-brand-dark tracking-tight mb-6">
                        Submit Requirement
                      </h3>

                      {submitted ? (
                        <div className="flex-grow flex flex-col items-center justify-center py-10 text-center">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-7 h-7" />
                          </div>
                          <h4 className="font-heading font-bold text-foreground text-sm md:text-base">Inquiry Submitted!</h4>
                          <p className="text-xs text-muted-foreground max-w-xs mt-2">
                            Thank you for your requirement request. We will review it and get in touch with you shortly.
                          </p>
                          <button 
                            onClick={() => setSubmitted(false)}
                            className="text-brand-blue text-xs font-bold hover:underline mt-6"
                          >
                            Submit another inquiry
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                          
                          {/* Name Input */}
                          <div>
                            <label htmlFor="name" className="block text-[11px] font-extrabold text-muted-foreground uppercase tracking-wide mb-1.5">
                              Name
                            </label>
                            <input 
                              type="text" 
                              name="name"
                              id="name"
                              required
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Enter your name"
                              className="w-full px-4 py-2.5 text-xs md:text-sm rounded-lg border-2 border-border outline-none bg-muted/20 text-foreground focus:border-brand-blue focus:bg-card transition-all"
                            />
                          </div>

                          {/* Email Input */}
                          <div>
                            <label htmlFor="email" className="block text-[11px] font-extrabold text-muted-foreground uppercase tracking-wide mb-1.5">
                              Email
                            </label>
                            <input 
                              type="email" 
                              name="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Enter your email"
                              className="w-full px-4 py-2.5 text-xs md:text-sm rounded-lg border-2 border-border outline-none bg-muted/20 text-foreground focus:border-brand-blue focus:bg-card transition-all"
                            />
                          </div>

                          {/* Product Line Dropdown */}
                          <div>
                            <label htmlFor="productInterest" className="block text-[11px] font-extrabold text-muted-foreground uppercase tracking-wide mb-1.5">
                              Product Line Interest
                            </label>
                            <select 
                              name="productInterest"
                              id="productInterest"
                              value={formData.productInterest}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 text-xs md:text-sm rounded-lg border-2 border-border outline-none bg-muted/20 text-foreground focus:border-brand-blue focus:bg-card transition-all cursor-pointer"
                            >
                              <option value="Thermacol Box" className="bg-card text-foreground">Thermacol Box</option>
                              <option value="Thermacol Sheets" className="bg-card text-foreground">Thermacol Sheets</option>
                              <option value="Beanbag Balls" className="bg-card text-foreground">Beanbag Balls</option>
                              <option value="Other" className="bg-card text-foreground">Other Category</option>
                            </select>
                          </div>

                          {/* Message Textarea */}
                          <div>
                            <label htmlFor="message" className="block text-[11px] font-extrabold text-muted-foreground uppercase tracking-wide mb-1.5">
                              Message
                            </label>
                            <textarea 
                              name="message"
                              id="message"
                              rows={3}
                              required
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Write your requirement message here"
                              className="w-full px-4 py-2.5 text-xs md:text-sm rounded-lg border-2 border-border outline-none bg-muted/20 text-foreground focus:border-brand-blue focus:bg-card transition-all resize-none"
                            />
                          </div>

                          {/* Submit error alert */}
                          {submitError && (
                            <p className="text-red-500 font-sans text-xs text-left">
                              {submitError}
                            </p>
                          )}

                          {/* Submit Button */}
                          <button 
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-brand-blue hover:bg-brand-hover text-white text-xs md:text-sm font-bold py-3 rounded-lg shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              "Submit Inquiry"
                            )}
                          </button>

                        </form>
                      )}

                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
