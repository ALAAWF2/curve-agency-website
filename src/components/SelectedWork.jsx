import React, { useLayoutEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { ArrowUpRight } from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectModal from './ProjectModal';
import Reveal from './Reveal';

export default function SelectedWork({ t, lang }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterOptions = [
    { key: 'all', label: t.work.filters.all },
    { key: 'campaigns', label: t.work.filters.campaigns },
    { key: 'branding', label: t.work.filters.branding },
    { key: 'photography', label: t.work.filters.photography },
    { key: 'production', label: t.work.filters.production },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeFilter);

  // --- Card → case study: shared-element transition ------------------------
  const [vtHeroId, setVtHeroId] = useState(null);
  const canViewTransition = () =>
    typeof document !== 'undefined' && typeof document.startViewTransition === 'function';

  const openProject = (project) => {
    if (!canViewTransition()) {
      setSelectedProject(project);
      return;
    }
    // The grid card owns the transition name first, so the outgoing snapshot
    // has something concrete to morph away from.
    flushSync(() => setVtHeroId(project.id));
    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => setSelectedProject(project));
      });
      transition.finished.finally(() => setVtHeroId(null));
    } catch {
      setSelectedProject(project);
      setVtHeroId(null);
    }
  };

  const closeProject = () => {
    const project = selectedProject;
    const cardStillOnScreen = project && filteredProjects.some((p) => p.id === project.id);
    if (!project || !canViewTransition() || !cardStillOnScreen) {
      setSelectedProject(null);
      setVtHeroId(null);
      return;
    }
    try {
      const transition = document.startViewTransition(() => {
        flushSync(() => setSelectedProject(null));
      });
      transition.finished.finally(() => setVtHeroId(null));
    } catch {
      setSelectedProject(null);
      setVtHeroId(null);
    }
  };

  // --- FLIP: surviving cards glide to their new slots on filter change -----
  const gridRef = useRef(null);
  const previousRects = useRef(new Map());
  const firstPass = useRef(true);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(grid.querySelectorAll('[data-flip-id]'));
    const next = new Map();

    nodes.forEach((node) => {
      const id = node.dataset.flipId;
      const rect = node.getBoundingClientRect();
      const previous = previousRects.current.get(id);
      const animate = !reduced && !firstPass.current;

      if (animate && previous) {
        const dx = previous.left - rect.left;
        const dy = previous.top - rect.top;
        if (Math.abs(dx) > 1 || Math.abs(dy) > 1) {
          node.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0px, 0px)' }],
            { duration: 560, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
          );
        }
      } else if (animate && !previous) {
        node.animate(
          [
            { opacity: 0, transform: 'translateY(22px) scale(0.985)' },
            { opacity: 1, transform: 'translateY(0px) scale(1)' },
          ],
          { duration: 540, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' }
        );
      }

      next.set(id, rect);
    });

    previousRects.current = next;
    firstPass.current = false;
  }, [activeFilter]);

  return (
    <section id="work" className="py-24 sm:py-32 px-6 sm:px-8 max-w-7xl mx-auto border-t border-black/10">
      {/* Header Section */}
      <Reveal className="mb-14">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight text-black font-['Poppins']">
          {t.work.tag}
        </h2>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg font-medium tracking-normal text-[#727272] uppercase max-w-2xl font-['Poppins']">
          {t.work.headline}
        </p>
      </Reveal>

      {/* Filter Buttons */}
      <Reveal delay={60} className="flex flex-wrap items-center gap-2.5 mb-14 pb-4 border-b border-black/10 overflow-x-auto">
        {filterOptions.map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 font-['Poppins'] ${
              activeFilter === f.key
                ? 'bg-black text-white shadow-lg shadow-black/10 scale-105'
                : 'bg-white border border-black/10 text-[#555550] hover:text-black hover:border-black/30'
            }`}
          >
            {f.label}
          </button>
        ))}
      </Reveal>

      {/* Projects Grid (2-Column High-Impact Cards) */}
      <Reveal stagger elementRef={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            data-flip-id={project.id}
            onClick={() => openProject(project)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            {/* Card Container with Light Grey Frame */}
            <div className="relative w-full rounded-2xl sm:rounded-3xl bg-[#D6D6D6] border border-black/10 p-3 sm:p-4 transition-all duration-500 shadow-sm group-hover:shadow-2xl group-hover:border-black/25">
              {/* Floating Top Client Pill Badge */}
              <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 z-20">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white text-black font-extrabold text-[11px] sm:text-[12px] tracking-wider uppercase shadow-md border border-black/5 font-['Poppins']">
                  {lang === 'ar' ? project.client.ar : project.client.en}
                </span>
              </div>

              {/* Crisp Standard High-Res Showcase Image (Uncut, Pure Photography) */}
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#222222]">
                <img
                  src={project.image}
                  alt={lang === 'ar' ? project.title.ar : project.title.en}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={
                    vtHeroId === project.id && !selectedProject
                      ? { viewTransitionName: 'project-hero' }
                      : undefined
                  }
                  loading="lazy"
                />

                {/* Subtle Hover Button */}
                <div className="absolute bottom-4 right-4 rtl:right-auto rtl:left-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-xl">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Meta & Title Under Card */}
            <div className="pt-4 pb-2 px-1">
              <div className="flex items-center justify-between text-xs font-semibold text-[#727272] mb-1.5 uppercase tracking-wider font-['Poppins']">
                <span>{project.subCategory}</span>
                <span className="font-mono">{project.year}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#111111] group-hover:text-black transition-colors duration-300 font-['Poppins']">
                {lang === 'ar' ? project.title.ar : project.title.en}
              </h3>
            </div>
          </div>
        ))}
      </Reveal>

      {/* Interactive Modal Drawer for clicked project with FULL GALLERY */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProject}
          t={t}
          lang={lang}
          vtName={vtHeroId === selectedProject.id ? 'project-hero' : undefined}
        />
      )}
    </section>
  );
}
