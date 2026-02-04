"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    explore: [
      { name: "Browse Meals", href: "/meals" },
      { name: "Our Providers", href: "/providers" },
      { name: "Categories", href: "/categories" },
    ],
    support: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Privacy Protocol", href: "/privacy" },
    ],
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#" },
    { icon: <Instagram size={18} />, href: "#" },
    { icon: <Twitter size={18} />, href: "#" },
  ];

  return (
    <footer className="relative bg-background border-t border-cream overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#6F2F14] pointer-events-none" />

      <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <Image
                src="/assets/logo/website-logoMain.png"
                alt="Velvet Bite Logo"
                width={120}
                height={60}
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-muted-foreground font-serif italic leading-relaxed max-w-xs">
              “Curating the finest local culinary masterpieces and delivering
              the velvet experience to your doorstep.”
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="size-10 rounded-xl bg-card/50 border border-cream flex items-center justify-center text-caramel hover:bg-cream hover:text-white hover:drop-shadow-[0_0_8px_rgba(192,133,82,0.4)] transition-all duration-300"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white">
              Explore
            </h4>
            <ul className="space-y-4">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-cream border-l-2 border-cream flex items-center gap-2 transition-colors group"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-caramel transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white">
              Support
            </h4>
            <ul className="space-y-4">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-cream flex items-center gap-2 transition-colors group border-l-2 border-cream"
                  >
                    <span className="w-0 group-hover:w-4 h-[1px] bg-caramel transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.4em] font-black text-white">
              Drop Point
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-caramel shrink-0" />
                <span>Culinary District, Velvet Lane 123, Dhaka</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="text-caramel shrink-0" />
                <span className="hover:text-cream transition-colors cursor-pointer">
                  concierge@velvetbite.com
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-caramel shrink-0" />
                <span>+880 1234 567890</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-cream flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground/70 font-bold">
            © {currentYear} Velvet Bite Architecture • All Rights Reserved
          </p>
          <div className="flex gap-8">
            <Link
              href="/terms"
              className="text-[10px] uppercase tracking-widest text-cream/80 hover:text-white/80 transition-colors font-bold"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-[10px] uppercase tracking-widest text-cream/80 hover:text-white/80 transition-colors font-bold"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
