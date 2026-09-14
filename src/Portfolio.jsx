import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Sun, Moon, Menu, X, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './hooks/useTheme';
import { t } from './utils/theme';
import Hero from './components/sections/Hero';
import ComoTrabajo from './components/sections/ComoTrabajo';
import Proyectos from './components/sections/Proyectos';
import WhatsAppCta from './components/sections/WhatsAppCta';

const SECTIONS = ['como-trabajo', 'proyectos', 'contacto'];
const NAV_LABELS = {
  'como-trabajo': 'Sistemas',
  'proyectos': 'Sistemas',
  'contacto': 'Escribime'
};

export default function Portfolio() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('como-trabajo');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const activeSectionRef = useRef(activeSection);
  useEffect(() => { activeSectionRef.current = activeSection; }, [activeSection]);

  const handleNavClick = useCallback((section) => {
    setIsMenuOpen(false);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const i = SECTIONS.indexOf(activeSectionRef.current);
      let target;
      if (e.key === 'ArrowRight' && i < SECTIONS.length - 1) target = SECTIONS[i + 1];
      if (e.key === 'ArrowLeft' && i > 0) target = SECTIONS[i - 1];
      if (target) document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navBtnClass = (section) =>
    `relative transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-white')} rounded px-2 py-1 ${
      activeSection === section
        ? 'text-indigo-500'
        : t(isDarkMode, 'text-white/80 hover:text-white', 'text-slate-600 hover:text-indigo-600')
    }`;

  const mobileNavBtnClass = (section) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-white')} ${
      activeSection === section
        ? t(isDarkMode, 'bg-indigo-500/20 text-indigo-400', 'bg-indigo-50 text-indigo-600')
        : t(isDarkMode, 'hover:bg-white/5 text-white/80', 'hover:bg-slate-100 text-slate-600')
    }`;

  const themeBtnClass = (mobile = false) =>
    `${mobile ? 'p-2' : 'p-2.5'} rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${t(isDarkMode,
      'hover:bg-white/10 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 focus:ring-offset-black',
      'hover:bg-indigo-50 text-slate-600 bg-white border border-slate-200 focus:ring-offset-white'
    )}`;

  return (
    <div className={`min-h-screen ${t(isDarkMode, 'text-paper', 'text-ink')}`}>
      <a href="#main-content" className="skip-to-main">Saltar al contenido principal</a>

      {/* ── Fixed background (flat paper/ink) ── */}
      <div className={`fixed inset-0 -z-10 ${t(isDarkMode, 'bg-ink', 'bg-paper')}`} aria-hidden="true" />

      {/* ── Navigation ── */}
      <nav
        className={`fixed top-0 w-full ${t(isDarkMode, 'bg-black/70 border-white/10', 'bg-white/85 border-slate-200/80')} backdrop-blur-md z-50 border-b`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl sm:text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-accent rounded"
              aria-label="Volver al inicio"
            >
              &lt;Matías Fernández /&gt;
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex gap-6 items-center" role="menubar">
              <button onClick={toggleTheme} aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} className={themeBtnClass()}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {SECTIONS.map(section => (
                <button key={section} onClick={() => handleNavClick(section)} aria-label={`Ir a la sección ${NAV_LABELS[section]}`} aria-current={activeSection === section ? 'page' : undefined} role="menuitem" className={navBtnClass(section)}>
                  {NAV_LABELS[section]}
                  {activeSection === section && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Mobile controls */}
            <div className="flex md:hidden gap-2 items-center">
              <button onClick={toggleTheme} aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} className={themeBtnClass(true)}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(prev => !prev)}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${t(isDarkMode, 'hover:bg-white/10 text-indigo-400 focus:ring-offset-black', 'hover:bg-indigo-50 text-indigo-600 focus:ring-offset-white')}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden mt-4 pb-4 border-t ${t(isDarkMode, 'border-white/10', 'border-slate-200')} pt-4 space-y-2`}
            >
              {SECTIONS.map(section => (
                <button key={section} onClick={() => handleNavClick(section)} aria-current={activeSection === section ? 'page' : undefined} className={mobileNavBtnClass(section)}>
                  {NAV_LABELS[section]}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </nav>

      {/* ── Hero section ── */}
      <Hero isDarkMode={isDarkMode} />

      {/* ── Sections ── */}
      <main id="main-content" role="main">
        <ComoTrabajo isDarkMode={isDarkMode} />

        <Proyectos isDarkMode={isDarkMode} />

        <WhatsAppCta isDarkMode={isDarkMode} />
      </main>

      {/* ── Footer ── */}
      <footer className={`relative border-t py-6 sm:py-8 ${t(isDarkMode, 'bg-black/80 border-white/10', 'bg-white/80 border-slate-200')}`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 text-center ${t(isDarkMode, 'text-slate-500', 'text-slate-400')}`}>
          <p className="text-sm sm:text-base">haciendo software desde 2024</p>
        </div>
      </footer>

      {/* ── Scroll-to-top button ── */}
      <motion.button
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showScrollTop ? 'auto' : 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver al inicio de la página"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-accent text-white shadow-lg hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      >
        <ChevronUp className="w-5 h-5" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
