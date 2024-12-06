"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-black px-6 py-16 ">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1 ">
            <div className="font-russo  text-gray-200">
              <h2 className="text-4xl leading-none ">
                REALITY
                <br></br>DESIGNERS
              </h2>
            </div>
            <p className="font-kodemono text-gray-400 my-4 text-sm">
              Lets design a new reality.
            </p>

            <a
              href="mailto:hey@reality-designers.com"
              className="hover:text-gray-200 font-kodemono text-sm  transition-colors"
            >
              hey@reality-designers.com
            </a>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-russo text-gray-200 text-sm mb-4 uppercase tracking-wider">
                Explore
              </h3>
              <ul className="space-y-3 font-kodemono text-gray-400">
                <li>
                  <Link
                    href="/story"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Story
                  </Link>
                </li>
                <li>
                  <Link
                    href="/lab"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Lab
                  </Link>
                </li>
                <li>
                  <Link
                    href="/team"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Team
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-russo text-gray-200 text-sm mb-4 uppercase tracking-wider">
                Resources
              </h3>
              <ul className="space-y-3 font-kodemono text-gray-400">
                <li>
                  <Link
                    href="/videos"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Videos
                  </Link>
                </li>
                <li>
                  <Link
                    href="/posts"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/library"
                    className="hover:text-gray-200 transition-colors"
                  >
                    Library
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-1">
            <Newsletter />
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <Link
              href="https://www.youtube.com/@realitydesigners"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube size={24} />
            </Link>
            <Link
              href="https://www.instagram.com/realitydesignerstv/"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />
            </Link>
            <Link
              href="https://www.x.com/realitydesignrs/"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter size={24} />
            </Link>
            <Link
              href="https://www.tiktok.com/@realitydesigners"
              className="text-gray-400 hover:text-gray-200 transition-colors"
              aria-label="TikTok"
            >
              <FaTiktok size={24} />
            </Link>
          </div>
          <div className="font-kodemono text-gray-400 text-[10px]">
            © {new Date().getFullYear()} Reality Designers. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

const Newsletter = () => {
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | "submitting" | null
  >(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmissionStatus("submitting");
    const email = event.target.email.value;
    const name = event.target.name.value;

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      await response.json();
      setSubmissionStatus("success");
    } catch (error) {
      setSubmissionStatus("error");
    }
  };

  if (submissionStatus === "success") {
    return (
      <div className="bg-gray-900/50 rounded-lg p-6 text-center">
        <p className="text-gray-200 font-russo text-lg">
          Thank you for subscribing!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-russo text-gray-200 text-sm mb-4 uppercase tracking-wider">
        Newsletter
      </h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="w-full bg-gray-900/50 border border-[#181818] rounded px-4 py-2 text-gray-200 font-kodemono text-sm focus:outline-none focus:border-gray-600 transition-colors"
        />
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          required
          className="w-full  border border-[#181818] rounded px-4 py-2 text-gray-200 font-kodemono text-sm focus:outline-none focus:border-gray-600 transition-colors"
        />
        <button
          type="submit"
          disabled={submissionStatus === "submitting"}
          className="w-full bg-gray-200 font-bold text-black font-kodemono py-2 rounded hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {submissionStatus === "submitting" ? "Sending..." : "Subscribe"}
        </button>
      </form>
      {submissionStatus === "error" && (
        <p className="text-red-400 text-sm mt-2">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
};
