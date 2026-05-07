import React, { useState, useEffect, useRef } from "react";
function Footer() {
  return (
    <div>
        <footer id="contact" className="bg-navy border-t border-white/10">
  <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
    <div className="grid md:grid-cols-4 gap-12 mb-12">

      {/* <!-- Brand --> */}
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-9 h-9 rounded-xl bg-cobalt flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>
          <span className="font-display text-2xl font-black text-white">Eventara</span>
        </div>
        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
          The easiest way to discover and book remarkable live experiences — from intimate workshops to stadium concerts.
        </p>
        <div className="flex gap-4 mt-6">
          <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-cobalt flex items-center justify-center transition-colors" aria-label="Twitter">
            <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.264 5.638 5.9-5.638zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-cobalt flex items-center justify-center transition-colors" aria-label="Instagram">
            <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          </a>
          <a href="#" className="w-9 h-9 rounded-full bg-white/5 hover:bg-cobalt flex items-center justify-center transition-colors" aria-label="LinkedIn">
            <svg className="w-4 h-4 text-white/70" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
        </div>
      </div>

      {/* <!-- Quick Links --> */}
      <div>
        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Quick Links</h4>
        <ul className="space-y-3">
          <li><a href="#events" className="text-white/40 hover:text-white text-sm transition-colors">Browse Events</a></li>
          <li><a href="#about"  className="text-white/40 hover:text-white text-sm transition-colors">About Us</a></li>
          <li><a href="#"       className="text-white/40 hover:text-white text-sm transition-colors">Host an Event</a></li>
          <li><a href="#"       className="text-white/40 hover:text-white text-sm transition-colors">Careers</a></li>
        </ul>
      </div>

      {/* <!-- Contact --> */}
      <div>
        <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">Get in Touch</h4>
        <ul className="space-y-3">
          <li className="text-white/40 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
            hello@eventara.com
          </li>
          <li className="text-white/40 text-sm flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            +1 (800) 888-4422
          </li>
          <li className="text-white/40 text-sm flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            San Francisco, CA 94102
          </li>
        </ul>
      </div>

    </div>

    {/* <!-- Bottom bar --> */}
    <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-white/25 text-sm">© 2025 Eventara Inc. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="text-white/25 hover:text-white/60 text-sm transition-colors">Privacy</a>
        <a href="#" className="text-white/25 hover:text-white/60 text-sm transition-colors">Terms</a>
        <a href="#" className="text-white/25 hover:text-white/60 text-sm transition-colors">Cookies</a>
      </div>
    </div>
  </div>
</footer>
    </div>
  )
}

export default Footer