"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { STRAPI_URL } from "@/lib/utils";
import { User, Phone, Mail, MapPin, Loader2 } from "lucide-react";

interface StrapiLeader {
  id: number;
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  address?: string;
  order?: number;
  imageUrl?: string;
  imageMedia?: {
    url?: string;
    data?: {
      attributes?: {
        url?: string;
      };
    } | null;
  } | null;
}

interface Leader {
  id: number;
  name: string;
  designation: string;
  phone?: string;
  email?: string;
  address?: string;
  image?: string;
}

export default function LeadershipPage() {
  const defaultLeaders: Leader[] = [
    {
      id: 1,
      name: "Prasad",
      designation: "CEO",
      phone: "+91-8047636510",
      email: "info@vlpswan.com",
      address: "Venkateswara Lovaprasad Exports, Totagunta, Annavaram, East Godavari, Andhra Pradesh, India",
      image: "/assets/ceo_prasad.png"
    }
  ];

  const [leaders, setLeaders] = useState<Leader[]>(defaultLeaders);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const response = await fetch(`${STRAPI_URL}/api/leaderships?populate=*&sort=order:asc`);
        if (response.ok) {
          const json = await response.json();
          if (json && json.data && json.data.length > 0) {
            const mappedLeaders = json.data.map((item: StrapiLeader) => {
              const mediaUrl = item.imageMedia?.url || item.imageMedia?.data?.attributes?.url;
              const imageUrl = mediaUrl 
                ? (mediaUrl.startsWith("http") ? mediaUrl : `${STRAPI_URL}${mediaUrl}`)
                : (item.imageUrl || "/assets/ceo_prasad.png");

              return {
                id: item.id,
                name: item.name,
                designation: item.designation,
                phone: item.phone,
                email: item.email,
                address: item.address,
                image: imageUrl
              };
            });
            setLeaders(mappedLeaders);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch leadership data from Strapi. Using fallback mockup leadership.", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-left">
          
          {/* Page Heading */}
          <h1 className="font-heading font-extrabold text-brand-blue text-2xl md:text-3xl tracking-tight mb-10 transition-colors duration-300">
            Leadership Information
          </h1>

          {loading ? (
            <div className="flex items-center gap-2 text-muted-foreground py-10">
              <Loader2 className="w-5 h-5 animate-spin text-brand-blue" />
              <span className="font-sans text-sm">Loading team details...</span>
            </div>
          ) : (
            <div className="flex flex-col gap-12 max-w-4xl mx-auto mt-12 px-4 md:px-0">
              {leaders.map((leader) => (
                <div 
                  key={leader.id}
                  className="relative flex flex-col md:flex-row items-center w-full my-6"
                >
                  {/* Left Column: Avatar overlapping the border */}
                  <div className="md:absolute md:-left-16 z-10 w-32 h-32 md:w-36 md:h-36 rounded-full border-[3px] border-neutral-900 bg-background shadow-lg overflow-hidden flex items-center justify-center mb-6 md:mb-0 shrink-0">
                    {leader.image ? (
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-muted-foreground/45" />
                    )}
                  </div>
                  
                  {/* Right Column: Content Card */}
                  <div className="w-full bg-[#f3f4f6] dark:bg-card border-2 border-neutral-900 dark:border-border rounded-[32px] p-6 md:p-8 md:pl-28 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start lg:items-center shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Name & Title */}
                    <div className="flex flex-col text-left lg:col-span-3">
                      <h2 className="font-heading font-extrabold text-3xl md:text-[34px] text-foreground tracking-wide uppercase leading-none mb-1">
                        {leader.name}
                      </h2>
                      <p className="font-sans text-base md:text-lg text-brand-blue font-extrabold transition-colors duration-300">
                        {leader.designation}
                      </p>
                    </div>

                    {/* Contact Details Column */}
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-6 lg:gap-4 items-start font-sans lg:col-span-4 text-left">
                      {/* Phone */}
                      {leader.phone && (
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-extrabold text-muted-foreground/90 uppercase tracking-wider mb-0.5">Phone</span>
                            <a
                              href={`tel:${leader.phone}`}
                              className="text-brand-blue dark:text-foreground font-bold hover:underline text-xs md:text-[13px] whitespace-nowrap"
                            >
                              {leader.phone}
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Email */}
                      {leader.email && (
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-extrabold text-muted-foreground/90 uppercase tracking-wider mb-0.5">Email</span>
                            <a
                              href={`mailto:${leader.email}`}
                              className="text-brand-blue dark:text-foreground font-bold hover:underline text-xs md:text-[13px] whitespace-nowrap"
                            >
                              {leader.email}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Divider Line */}
                    <div className="hidden lg:block lg:col-span-1 h-12 w-[1px] bg-neutral-300 dark:bg-neutral-800 justify-self-center" />

                    {/* Address Column */}
                    {leader.address && (
                      <div className="flex items-start gap-2.5 text-left lg:col-span-4 w-full">
                        <div className="w-8 h-8 rounded-full bg-brand-light dark:bg-muted flex items-center justify-center text-brand-blue shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="block text-sm font-extrabold text-muted-foreground/90 uppercase tracking-wider mb-0.5">Office Address</span>
                          <p className="text-foreground/80 font-sans text-xs md:text-[12px] leading-normal font-medium mt-0.5">
                            {leader.address}
                          </p>
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
