import React from "react";
import { Phone, Mail, Clock, Navigation, MapPin } from "lucide-react";

export default function ContactSection() {

  return (
    <section className="bg-charcoal-900 text-white py-24 border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-white/40 font-bold tracking-[0.3em] text-[10px] uppercase block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">
            Contact USG Kuwait
          </h2>
          <div className="w-12 h-[1px] bg-white/20 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Information */}
          <div className="space-y-8 bg-charcoal-850 p-6 sm:p-8 rounded-none border border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 border-b border-white/5 pb-3">
              Contact Information
            </h3>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 text-white p-2.5 rounded-none border border-white/10 shrink-0">
                  <Navigation className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/40 font-bold">Headquarters</p>
                  <p className="text-xs text-white/75 mt-1 leading-relaxed">
                    AbdelHady Commercial Center, Floor 6, Alqibla, Kuwait City, Fahad Al-Salem Street
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 text-white p-2.5 rounded-none border border-white/10 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/40 font-bold">Phone</p>
                  <div className="space-y-1 mt-1">
                    <a href="tel:+96599893948" className="text-xs font-bold text-white hover:underline block tracking-wider">
                      +965 99893948
                    </a>
                    <a href="tel:+96550553515" className="text-xs font-bold text-white hover:underline block tracking-wider">
                      +965 50553515
                    </a>
                    <a href="tel:+96599939730" className="text-xs font-bold text-white hover:underline block tracking-wider">
                      +965 99939730
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 text-white p-2.5 rounded-none border border-white/10 shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/40 font-bold">General Inquiries</p>
                  <a href="mailto:info@usgroup.site" className="text-xs text-white/75 hover:underline mt-1 block">
                    info@usgroup.site
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 text-white p-2.5 rounded-none border border-white/10 shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/40 font-bold">Working Hours</p>
                  <p className="text-xs text-white/75 mt-1 leading-relaxed">
                    Saturday – Thursday: 9:00 AM – 5:00 PM <br />
                    Friday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps Button */}
          <div className="bg-charcoal-850 p-6 sm:p-8 rounded-none border border-white/5 flex flex-col items-center justify-center space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
              Visit Us
            </h3>
            <a
              href="https://maps.app.goo.gl/vdnP11L9mGrk69J9A"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center space-x-2 bg-white hover:bg-white/95 text-charcoal-900 py-5 sm:py-4 rounded-none font-bold uppercase text-[10px] sm:text-[9px] tracking-[0.25em] transition-all duration-300 min-h-[48px] sm:min-h-auto"
            >
              <MapPin className="h-5 sm:h-4 w-5 sm:w-4" />
              <span>Open in Google Maps</span>
            </a>
            <p className="text-[9px] text-white/50 text-center leading-relaxed">
              AbdelHady Commercial Center<br />Floor 6, Alqibla<br />Fahad Al-Salem Street<br />Kuwait City
            </p>
          </div>
        </div>

        {/* Embedded Google Maps */}
        <div className="w-full rounded-none overflow-hidden border border-white/10 shadow-2xl h-[400px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3606.4!2d47.9718!3d29.3657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3fc5363a76c5c3a7%3A0x7c8b48c5e1c3d0f0!2sFahad%20Al-Salem%20Street%2C%20Kuwait%20City!5e0!3m2!1sen!2skw!4v1720000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%)" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            title="USG Office Location — Fahad Al-Salem Street, Kuwait City"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
