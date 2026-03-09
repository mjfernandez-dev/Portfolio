import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Github, Linkedin, Mail, Sun, Moon, Menu, X, ChevronUp } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from './hooks/useTheme';
import { t } from './utils/theme';
import AvatarModal from './components/AvatarModal';
import SobreMi from './components/sections/SobreMi';
import Habilidades from './components/sections/Habilidades';
import Proyectos from './components/sections/Proyectos';
import Contacto from './components/sections/Contacto';

const SECTIONS = ['sobre-mi', 'habilidades', 'proyectos', 'contacto'];
const NAV_LABELS = {
  'sobre-mi': 'Sobre Mí',
  'habilidades': 'Habilidades',
  'proyectos': 'Proyectos',
  'contacto': 'Contacto'
};
const SOCIAL_LINKS = [
  { href: 'https://github.com/mjfernandez-dev', label: 'Visitar mi perfil de GitHub (se abre en nueva ventana)', Icon: Github },
  { href: 'https://www.linkedin.com/in/matias-fernandez-/', label: 'Visitar mi perfil de LinkedIn (se abre en nueva ventana)', Icon: Linkedin },
  { href: 'mailto:mjfernandez.dev@gmail.com', label: 'Enviar un correo electrónico a mjfernandez.dev@gmail.com', Icon: Mail }
];

export default function Portfolio() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
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
    document.body.style.overflow = isMenuOpen || isAvatarModalOpen ? 'hidden' : '';
  }, [isMenuOpen, isAvatarModalOpen]);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 4,
    })), []);

  const navBtnClass = (section) =>
    `relative transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-white')} rounded px-2 py-1 ${
      activeSection === section
        ? 'text-indigo-500'
        : t(isDarkMode, 'text-white/80 hover:text-white', 'text-slate-600 hover:text-indigo-600')
    }`;

  const mobileNavBtnClass = (section) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-white')} ${
      activeSection === section
        ? t(isDarkMode, 'bg-indigo-500/20 text-indigo-400', 'bg-indigo-50 text-indigo-600')
        : t(isDarkMode, 'hover:bg-white/5 text-white/80', 'hover:bg-slate-100 text-slate-600')
    }`;

  const themeBtnClass = (mobile = false) =>
    `${mobile ? 'p-2' : 'p-2.5'} rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${t(isDarkMode,
      'hover:bg-white/10 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 focus:ring-offset-black',
      'hover:bg-indigo-50 text-slate-600 bg-white border border-slate-200 focus:ring-offset-white'
    )}`;

  return (
    <div className={`min-h-screen ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>
      <a href="#main-content" className="skip-to-main">Saltar al contenido principal</a>

      {/* ── Fixed background ── */}
      {isDarkMode ? (
        <>
          <div className="fixed inset-0 bg-black -z-10" aria-hidden="true" />
          <div
            className="fixed inset-0 pointer-events-none -z-10"
            aria-hidden="true"
            style={{
              background: [
                'radial-gradient(ellipse at 15% 50%, rgba(99,102,241,0.14) 0%, transparent 55%)',
                'radial-gradient(ellipse at 85% 15%, rgba(6,182,212,0.10) 0%, transparent 50%)',
                'radial-gradient(ellipse at 50% 90%, rgba(59,130,246,0.08) 0%, transparent 50%)',
              ].join(', ')
            }}
          />
          {particles.map(p => (
            <div
              key={p.id}
              aria-hidden="true"
              className="fixed pointer-events-none rounded-full -z-10"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: '2px',
                height: '2px',
                background: 'rgba(255,255,255,0.25)',
                animation: `float-particle ${p.duration}s ease-in-out infinite`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </>
      ) : (
        <>
          <div className="fixed inset-0 bg-slate-50 -z-10" aria-hidden="true" />
          <div
            className="fixed inset-0 pointer-events-none -z-10"
            aria-hidden="true"
            style={{
              background: [
                'radial-gradient(ellipse at 15% 40%, rgba(99,102,241,0.07) 0%, transparent 55%)',
                'radial-gradient(ellipse at 85% 15%, rgba(6,182,212,0.05) 0%, transparent 50%)',
                'radial-gradient(ellipse at 60% 85%, rgba(59,130,246,0.05) 0%, transparent 50%)',
              ].join(', ')
            }}
          />
        </>
      )}

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
              className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded"
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
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full" />
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
                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${t(isDarkMode, 'hover:bg-white/10 text-indigo-400 focus:ring-offset-black', 'hover:bg-indigo-50 text-indigo-600 focus:ring-offset-white')}`}
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
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 sm:space-y-6">

            {/* Avatar with glow ring */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-block relative"
            >
              <div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: isDarkMode
                    ? 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(6,182,212,0.3) 60%, transparent 80%)'
                    : 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(6,182,212,0.15) 60%, transparent 80%)',
                  animation: 'glow-pulse 3s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="relative inline-block p-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full mb-2 sm:mb-4 cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
                aria-label="Ver imagen de perfil en tamaño completo"
              >
                <div className={`${t(isDarkMode, 'bg-black', 'bg-white')} rounded-full p-1`}>
                  <img src="/images/avatar.png" alt="Matías Fernández - Desarrollador Full Stack" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
                </div>
              </button>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 px-4"
            >
              <span className={`animate-gradient-text bg-gradient-to-r ${t(isDarkMode,
                'from-white via-blue-200 to-cyan-300',
                'from-slate-800 via-indigo-600 to-cyan-600'
              )} bg-clip-text text-transparent`}>
                Desarrollador de software Full Stack
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${t(isDarkMode, 'text-slate-300', 'text-slate-500')}`}
            >
              Graduado en desarrollo desarrollo de software. Enfocado por crear soluciones a problemas reales. Aplicaciones web, de escritorio y automatización de procesos.
            </motion.p>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-3 sm:gap-4 justify-center mt-6 sm:mt-8"
              role="list"
            >
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  aria-label={label}
                  className={`p-2.5 sm:p-3 rounded-lg transition-all border focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 hover:scale-110 ${t(isDarkMode,
                    'bg-white/5 hover:bg-white/10 border-white/10 hover:border-indigo-500/50 focus:ring-offset-black hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]',
                    'bg-white hover:bg-indigo-50 border-slate-200 hover:border-indigo-300 focus:ring-offset-white hover:shadow-[0_4px_16px_rgba(99,102,241,0.15)] text-slate-600 hover:text-indigo-600'
                  )}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </a>
              ))}
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pt-8 sm:pt-12"
              aria-hidden="true"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className={`mx-auto w-6 h-10 rounded-full border-2 flex items-start justify-center pt-1.5 ${t(isDarkMode, 'border-white/20', 'border-slate-300')}`}
              >
                <div className={`w-1 h-2.5 rounded-full ${t(isDarkMode, 'bg-white/40', 'bg-slate-400')}`} />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Sections ── */}
      <main id="main-content" role="main">
        <section id="sobre-mi" className="relative py-16 sm:py-24 px-4 sm:px-6" aria-label="Sección Sobre Mí">
          <div className="max-w-6xl mx-auto">
            <SobreMi isDarkMode={isDarkMode} />
          </div>
        </section>

        <section id="habilidades" className="relative py-16 sm:py-24 px-4 sm:px-6" aria-label="Sección Habilidades">
          <div className="max-w-6xl mx-auto">
            <Habilidades isDarkMode={isDarkMode} />
          </div>
        </section>

        <section id="proyectos" className="relative py-16 sm:py-24 px-4 sm:px-6" aria-label="Sección Proyectos">
          <div className="max-w-6xl mx-auto">
            <Proyectos isDarkMode={isDarkMode} />
          </div>
        </section>

        <section id="contacto" className="relative py-16 sm:py-24 px-4 sm:px-6" aria-label="Sección Contacto">
          <div className="max-w-6xl mx-auto">
            <Contacto isDarkMode={isDarkMode} />
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className={`relative border-t py-6 sm:py-8 ${t(isDarkMode, 'bg-black/80 border-white/10', 'bg-white/80 border-slate-200')}`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 text-center ${t(isDarkMode, 'text-slate-500', 'text-slate-400')}`}>
          <p className="text-sm sm:text-base">© 2025 - Desarrollado con React, Vite y Tailwind CSS</p>
        </div>
      </footer>

      {/* ── Scroll-to-top button ── */}
      <motion.button
        animate={{ opacity: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showScrollTop ? 'auto' : 'none' }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver al inicio de la página"
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-lg hover:shadow-[0_0_24px_rgba(99,102,241,0.5)] hover:scale-110 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        <ChevronUp className="w-5 h-5" aria-hidden="true" />
      </motion.button>

      {isAvatarModalOpen && <AvatarModal onClose={() => setIsAvatarModalOpen(false)} />}
    </div>
  );
}
