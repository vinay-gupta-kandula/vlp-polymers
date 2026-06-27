"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Zod Validation Schema
const schema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?[0-9\s-]{10,15}$/, "Invalid phone number (minimum 10 digits)"),
  productType: z.string().min(1, "Please select a valid product category"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  details: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface RequirementModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultProductType?: string;
}

export default function RequirementModal({ isOpen, onOpenChange, defaultProductType }: RequirementModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      productType: "120l-box",
      quantity: 100,
      details: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Clear states and pre-select product when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setSubmitError("");
      if (defaultProductType) {
        reset({
          fullName: "",
          companyName: "",
          email: "",
          phone: "",
          productType: defaultProductType,
          quantity: 100,
          details: "",
        });
      }
    }
  }, [isOpen, defaultProductType, reset]);

  const onSubmitForm = async (data: FormData) => {
    setSubmitError("");
    try {
      const messageBody = `Company Name: ${data.companyName}\nPhone Number: ${data.phone}\nEst. Quantity: ${data.quantity}\nDetailed Specifications: ${data.details || "None"}`;

      const payload = {
        name: data.fullName,
        email: data.email,
        productInterest: data.productType,
        message: messageBody
      };

      const response = await fetch("http://localhost:1337/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          data: payload
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit your requirement. Please verify the backend is running.");
      }

      setIsSubmitted(true);
      reset();
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitError(error.message || "Failed to submit. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-24 right-6 left-auto bottom-auto translate-x-0 translate-y-0 h-auto max-h-[calc(100vh-7.5rem)] w-full sm:max-w-[460px] rounded-2xl bg-card border border-border shadow-2xl p-0 flex flex-col overflow-hidden duration-300 data-open:animate-in data-open:slide-in-from-right data-open:zoom-in-95 data-closed:animate-out data-closed:slide-out-to-right data-closed:zoom-out-95 text-foreground">
        {/* Banner header inside modal */}
        <div className="bg-gradient-to-r from-brand-blue to-brand-hover p-6 text-white shrink-0">
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <i className="fa-solid fa-paper-plane text-lg text-brand-light" />
              Submit Product Requirement
            </DialogTitle>
            <p className="text-slate-100 text-xs mt-1 font-medium font-sans">
              Provide your details below to receive a custom engineering quote.
            </p>
          </DialogHeader>
        </div>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center p-8 text-center gap-4 py-16 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-2">
              <i className="fa-solid fa-circle-check text-4xl" />
            </div>
            <h3 className="font-heading text-lg font-bold text-foreground">
              Inquiry Submitted!
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed max-w-xs">
              Thank you for your submission. We will reach out to you soon!
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false);
                onOpenChange(false);
              }}
              className="mt-4 bg-brand-blue hover:bg-brand-hover text-white text-xs font-bold px-6 py-2.5 rounded-lg shadow-sm"
            >
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitForm)} className="p-6 space-y-4 overflow-y-auto flex-grow">
            <div className="grid grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="fullName" className="text-xs font-semibold text-foreground/85">Full Name</label>
                <Input
                  id="fullName"
                  placeholder="John Doe"
                  className={`text-xs h-10 border ${errors.fullName ? "border-red-500 focus-visible:ring-red-200" : "border-border"}`}
                  {...register("fullName")}
                />
                {errors.fullName && <span className="text-[10px] font-bold text-red-500">{errors.fullName.message}</span>}
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="companyName" className="text-xs font-semibold text-foreground/85">Company Name</label>
                <Input
                  id="companyName"
                  placeholder="Acme Logistics Ltd"
                  className={`text-xs h-10 border ${errors.companyName ? "border-red-500 focus-visible:ring-red-200" : "border-border"}`}
                  {...register("companyName")}
                />
                {errors.companyName && <span className="text-[10px] font-bold text-red-500">{errors.companyName.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-semibold text-foreground/85">Business Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  className={`text-xs h-10 border ${errors.email ? "border-red-500 focus-visible:ring-red-200" : "border-border"}`}
                  {...register("email")}
                />
                {errors.email && <span className="text-[10px] font-bold text-red-500">{errors.email.message}</span>}
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-semibold text-foreground/85">Phone Number</label>
                <Input
                  id="phone"
                  placeholder="+91 9876543210"
                  className={`text-xs h-10 border ${errors.phone ? "border-red-500 focus-visible:ring-red-200" : "border-border"}`}
                  {...register("phone")}
                />
                {errors.phone && <span className="text-[10px] font-bold text-red-500">{errors.phone.message}</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Product Range */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="productType" className="text-xs font-semibold text-foreground/85">Product Range</label>
                <select
                  id="productType"
                  className="w-full h-10 px-3 py-2 text-xs rounded-md border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                  {...register("productType")}
                >
                  <option value="120l-box">120 Liter Thermocol Box</option>
                  <option value="60l-box">60 Liter Thermocol Box</option>
                  <option value="round-beans">Thermocol Round Beans</option>
                  <option value="eps-sheets">Custom EPS Sheets</option>
                  <option value="custom-molded">Custom Molded Shape</option>
                </select>
                {errors.productType && <span className="text-[10px] font-bold text-red-500">{errors.productType.message}</span>}
              </div>

              {/* Quantity */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="quantity" className="text-xs font-semibold text-foreground/85">Est. Quantity</label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="500"
                  className={`text-xs h-10 border ${errors.quantity ? "border-red-500 focus-visible:ring-red-200" : "border-border"}`}
                  {...register("quantity", { valueAsNumber: true })}
                />
                {errors.quantity && <span className="text-[10px] font-bold text-red-500">{errors.quantity.message}</span>}
              </div>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="details" className="text-xs font-semibold text-foreground/85">Detailed Specifications</label>
              <textarea
                id="details"
                rows={3}
                placeholder="E.g., custom wall thickness, custom density specs, shipping schedules..."
                className="w-full text-xs p-3 rounded-md border border-border bg-card text-foreground placeholder-muted-foreground outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                {...register("details")}
              />
            </div>

            {submitError && (
              <p className="text-xs font-bold text-red-500 text-center">{submitError}</p>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="text-xs h-10 font-bold border-border bg-card text-foreground hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="text-xs h-10 font-bold bg-brand-blue hover:bg-brand-hover text-white px-5 shadow-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-spinner animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
