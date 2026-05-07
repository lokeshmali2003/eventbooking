import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

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
  const barColor = scrolled ? "bg-navy" : "bg-white";
  const navBg = scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent";

  return (
    <div>
      <nav
        ref={navRef}
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 sm:h-18">

            {/* Logo */}
            <a href="#" className="flex items-center gap-1.5 sm:gap-2 group">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-cobalt flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`font-display text-xl sm:text-2xl font-black tracking-tight transition-colors duration-300 ${logoColor}`}
                style={{ letterSpacing: "-0.02em" }}>
                Eventara
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`font-medium text-sm transition-colors ${linkColor}`}>Home</Link>
              <Link to="/events" className={`font-medium text-sm transition-colors ${linkColor}`}>Events</Link>
              <Link to="/dashboard" className={`font-medium text-sm transition-colors ${linkColor}`}>Dashboard</Link>
              <Link to="/profile"
                className="bg-white text-cobalt px-5 py-2 rounded-full text-sm font-semibold hover:bg-ice transition-colors shadow-sm">
                Profile
              </Link>
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <span className={`block w-5 sm:w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 sm:w-6 h-0.5 rounded transition-all duration-300 ${barColor} ${isMobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-4 sm:w-4 h-0.5 rounded transition-all duration-300 ml-auto ${barColor} ${isMobileMenuOpen ? "-rotate-45 -translate-y-2 w-5 sm:w-6" : ""}`} />
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col gap-3 sm:gap-4 border border-white/20">
                <Link to="/" onClick={closeMobileMenu} className="text-white/90 hover:text-white font-medium text-sm sm:text-base transition-colors py-1">
                  Home
                </Link>
                <Link to="/events" onClick={closeMobileMenu} className="text-white/90 hover:text-white font-medium text-sm sm:text-base transition-colors py-1">
                  Events
                </Link>
                <Link to="/dashboard" onClick={closeMobileMenu} className="text-white/90 hover:text-white font-medium text-sm sm:text-base transition-colors py-1">
                  Dashboard
                </Link>
                <Link to="/profile" onClick={closeMobileMenu}
                  className="bg-white text-cobalt px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-sm font-semibold text-center hover:bg-ice transition-colors mt-1">
                  Profile
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;