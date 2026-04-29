import React, { useState, useEffect, useRef } from "react";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Derived styles based on scroll state
  const linkColor = scrolled ? "text-navy/80 hover:text-navy" : "text-white/80 hover:text-white";
  const logoColor = scrolled ? "text-navy" : "text-white";
  const barColor  = scrolled ? "bg-navy" : "bg-white";
  const navBg     = scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent";

  return (
    <div>
      <nav
        ref={navRef}
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-cobalt flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`font-display text-2xl font-black tracking-tight transition-colors duration-300 ${logoColor}`}
                style={{ letterSpacing: "-0.02em" }}>
                Eventara
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#events"  className={`font-medium text-sm transition-colors ${linkColor}`}>Events</a>
              <a href="#about"   className={`font-medium text-sm transition-colors ${linkColor}`}>About</a>
              <a href="#contact" className={`font-medium text-sm transition-colors ${linkColor}`}>Contact</a>
              <a href="#events"
                className="bg-white text-cobalt px-5 py-2 rounded-full text-sm font-semibold hover:bg-ice transition-colors shadow-sm">
                Browse Events
              </a>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <span className={`block w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 h-0.5 rounded transition-all duration-300 ml-auto ${barColor} ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 w-6" : ""}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-5 mb-4 flex flex-col gap-4 border border-white/20">
                <a href="#events"  onClick={closeMobileMenu} className="text-white/90 hover:text-white font-medium text-base transition-colors">Events</a>
                <a href="#about"   onClick={closeMobileMenu} className="text-white/90 hover:text-white font-medium text-base transition-colors">About</a>
                <a href="#contact" onClick={closeMobileMenu} className="text-white/90 hover:text-white font-medium text-base transition-colors">Contact</a>
                <a href="#events"  onClick={closeMobileMenu}
                  className="bg-white text-cobalt px-5 py-2.5 rounded-full text-sm font-semibold text-center hover:bg-ice transition-colors">
                  Browse Events
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;