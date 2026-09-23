import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, MapPin, Calendar, Building2, ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function ProjectModal({ project, onClose, t, lang, vtName }) {
  const images = project?.gallery && project.gallery.length > 0 
    ? project.gallery 
    : [project?.image, project?.fullImage].filter(Boolean);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, images.length]);

  if (!project) return null;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/75 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* Click outside backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl my-auto bg-white border border-black/15 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden z-10 text-black">
        {/* Sticky Header with Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-5 sm:px-8 py-4 bg-white/95 backdrop-blur-md border-b border-black/10">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-black/5 text-[11px] font-extrabold tracking-widest text-black uppercase font-['Poppins']">
              {lang === 'ar' ? project.client.ar : project.client.en}
            </span>
            <span className="text-xs text-[#727272]">•</span>
            <span className="text-xs text-[#727272] tracking-wider uppercase font-semibold font-['Poppins']">
              {project.subCategory}
            </span>
          </div>

          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black text-black hover:text-white transition-all text-xs font-bold tracking-wider uppercase font-['Poppins']"
          >
            <span>{t.work.closeModal}</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 md:p-10 max-h-[85vh] overflow-y-auto space-y-8 sm:space-y-10">
          {/* Main Title & Key Highlight */}
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-black mb-3 font-['Poppins']">
              {lang === 'ar' ? project.title.ar : project.title.en}
            </h2>
            {project.highlight && (
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-black/5 border border-black/10 text-black text-xs font-semibold tracking-wide font-['Poppins']">
                <CheckCircle2 className="w-3.5 h-3.5 text-black" />
                <span>{project.highlight}</span>
              </div>
            )}
          </div>

          {/* Interactive Multi-Image Gallery Showcase */}
          <div className="space-y-4">
            {/* Active Hero Image (Fully uncropped with natural aspect ratio) */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#ECECEC] border border-black/10 shadow-sm flex items-center justify-center min-h-[300px] sm:min-h-[460px] max-h-[70vh]">
              <img
                src={images[activeImageIndex]}
                alt={`${project.client.en} - ${activeImageIndex + 1}`}
                className="w-full h-auto max-h-[70vh] object-contain object-center transition-all duration-300"
                style={
                  activeImageIndex === 0 && vtName ? { viewTransitionName: vtName } : undefined
                }
              />

              {/* Navigation Arrows if multiple images */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/90 hover:bg-white text-black shadow-lg flex items-center justify-center transition-transform hover:scale-110 active:scale-95 z-10"
                    title="Next Image"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                  {/* Floating Count Badge */}
                  <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-[11px] font-bold font-mono tracking-wider">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* Thumbnail Strip (If multiple images) */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1">
                {images.map((imgSrc, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx
                        ? 'border-black ring-2 ring-black/20 scale-105 shadow-md'
                        : 'border-black/10 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgSrc}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-[#F7F7F7] border border-black/10 text-xs">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[#727272]" />
              <div>
                <div className="text-[#727272] uppercase font-semibold font-['Poppins']">{t.work.clientLabel}</div>
                <div className="text-black font-bold font-['Poppins']">{lang === 'ar' ? project.client.ar : project.client.en}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-[#727272]" />
              <div>
                <div className="text-[#727272] uppercase font-semibold font-['Poppins']">TIMELINE</div>
                <div className="text-black font-bold font-mono">{project.year}</div>
              </div>
            </div>

            <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
              <MapPin className="w-4 h-4 text-[#727272]" />
              <div>
                <div className="text-[#727272] uppercase font-semibold font-['Poppins']">LOCATION</div>
                <div className="text-black font-bold font-['Poppins']">{project.location}</div>
              </div>
            </div>
          </div>

          {/* Narrative & Concept */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#727272] uppercase font-['Poppins']">
              {t.work.impactLabel}
            </h3>
            <p className="text-base sm:text-lg text-[#222222] leading-relaxed font-normal">
              {lang === 'ar' ? project.overview.ar : project.overview.en}
            </p>
          </div>

          {/* Deliverables List */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold tracking-[0.2em] text-[#727272] uppercase font-['Poppins']">
              {t.work.deliverablesLabel}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F8F8] border border-black/5 text-sm text-[#222222] font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* All Campaign Assets Gallery (Complete high-resolution view of every photo) */}
          {images.length > 1 && (
            <div className="space-y-6 pt-6 border-t border-black/10">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold tracking-[0.2em] text-[#727272] uppercase font-['Poppins']">
                  ALL PROJECT ASSETS ({images.length} PHOTOS)
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                {images.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl overflow-hidden border border-black/10 bg-[#FAFAFA] shadow-sm"
                  >
                    <img
                      src={imgSrc}
                      alt={`Full Asset ${idx + 1}`}
                      className="w-full h-auto object-contain max-h-[85vh] mx-auto"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Inquiry CTA Footer inside Modal */}
          <div className="p-8 rounded-2xl sm:rounded-3xl bg-[#F5F5F5] border border-black/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-extrabold text-black uppercase font-['Poppins']">
                {lang === 'ar' ? 'هل تريد عملاً مماثلاً لعلامتك؟' : 'Looking for similar impact for your brand?'}
              </h4>
              <p className="text-xs text-[#555555] mt-1 font-medium font-['Poppins']">
                {lang === 'ar' ? 'تواصل مع فريق كيرف في جدة لبدء النقاش والتنفيذ.' : 'Connect with our creative leadership in Jeddah to initiate your brief.'}
              </p>
            </div>
            <a
              href="#contact"
              onClick={onClose}
              className="px-7 py-3.5 rounded-full bg-black text-white font-bold text-xs tracking-wider uppercase hover:bg-neutral-800 transition-transform hover:scale-105 inline-flex items-center gap-2 whitespace-nowrap shadow-lg font-['Poppins']"
            >
              <span>{lang === 'ar' ? 'تواصل الآن' : 'Initiate Brief'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
