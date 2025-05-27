"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { LiaAddressCardSolid } from "react-icons/lia";

interface FormData {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    const newErrors: Errors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone || !/^\+?[0-9\s()-]{7,}$/.test(formData.phone)) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#4E426F] p-6 flex items-center justify-center">
      <div className="flex flex-col md:flex-row w-full max-w-6xl">
        {/* Left Side - Contact Info */}
        <div className="text-white p-10 md:w-1/2 flex flex-col justify-center">
          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="mb-6 w-[70%]">
            Not sure what you need? The team at <strong>Shraj</strong> will be
            happy to listen to you and suggest event ideas you hadn’t considered
          </p>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="material-icons flex items-center gap-2">
                <LiaAddressCardSolid size={20} />
              </span>
              <div className="flex flex-col gap-2 w-[50%]">
                <p>
                  Unit No.209, Sheetal Business Center, Chinchpada, Vasai East,
                  Palghar, Maharashtra - 401028.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="material-icons flex items-center gap-2">
                <MdEmail size={20} />
              </span>
              <div className="flex flex-col gap-2">
                <span>sales1@shrajindustries.com</span>
                <span>info@shrajindustries.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <BsFillTelephoneFill size={20} />
              <div className="flex flex-col gap-2">
                <span>Support: +91 8956981462</span>
                <span>Support: +91 8956981465</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 md:w-1/2 space-y-10 rounded-lg"
        >
          <h3 className="text-xl font-semibold">
            We’d love to hear from you!
            <br />
            Let’s get in touch
          </h3>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">{errors.fullName}</p>
              )}
            </div>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-1/2 p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="olivia@untitledui.com"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            <div className="w-1/2 flex">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="flex-1 p-2 border border-gray-300 rounded-r-md"
              />
            </div>
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border border-gray-300 rounded-md"
          />

          <div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Type your message here"
              className="w-full p-2 border border-gray-300 rounded-md h-32"
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#3E1C7D] text-white px-6 py-2 rounded-md"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
