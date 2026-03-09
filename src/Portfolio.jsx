import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
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

  const handleNavClick = useCallback((section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  }, []);

  // Navegación por teclado (no depende de activeSection gracias al setter funcional)
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      setActiveSection(prev => {
        const i = SECTIONS.indexOf(prev);
        if (e.key === 'ArrowRight' && i < SECTIONS.length - 1) return SECTIONS[i + 1];
        if (e.key === 'ArrowLeft' && i > 0) return SECTIONS[i - 1];
        return prev;
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isAvatarModalOpen ? 'hidden' : 'unset';
  }, [isMenuOpen, isAvatarModalOpen]);

  // Floating particles - generated once
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 3 + Math.random() * 3,
      delay: Math.random() * 4,
    })), []);

  const navBtnClass = (section) =>
    `relative hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-slate-100')} rounded px-2 py-1 ${activeSection === section ? 'text-blue-400' : t(isDarkMode, 'text-white/80', 'text-slate-800')}`;

  const mobileNavBtnClass = (section) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-slate-100')} ${activeSection === section ? 'bg-indigo-500/20 text-blue-400' : t(isDarkMode, 'hover:bg-white/5 text-white/80', 'hover:bg-slate-200/50 text-slate-800')}`;

  const themeBtnClass = (mobile = false) =>
    `${mobile ? 'p-2' : 'p-2.5'} rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode,
      'hover:bg-white/10 text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 focus:ring-offset-black',
      'hover:bg-slate-200 text-slate-800 bg-slate-200/50 border border-slate-300 focus:ring-offset-slate-100'
    )}`;

  return (
    <div className={`min-h-screen ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>
      <a href="#main-content" className="skip-to-main">Saltar al contenido principal</a>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full ${t(isDarkMode, 'bg-black/70 border-white/10', 'bg-slate-100/90 border-slate-300/50')} backdrop-blur-md z-50 border-b`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &lt;Matías Fernández /&gt;
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center" role="menubar">
              <button onClick={toggleTheme} aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'} className={themeBtnClass()}>
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              {SECTIONS.map(section => (
                <button key={section} onClick={() => handleNavClick(section)} aria-label={`Ir a la sección ${NAV_LABELS[section]}`} aria-current={activeSection === section ? 'page' : undefined} role="menuitem" className={navBtnClass(section)}>
                  {NAV_LABELS[section]}
                  {activeSection === section && isDarkMode && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full" />
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
                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'hover:bg-white/10 text-blue-400 focus:ring-offset-black', 'hover:bg-slate-200 text-blue-600 focus:ring-offset-slate-100')}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden mt-4 pb-4 border-t ${t(isDarkMode, 'border-white/10', 'border-slate-300/50')} pt-4 space-y-2`}
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

      {/* Main Container with Background */}
      <div className="relative min-h-screen">

        {/* Dark mode: animated gradient background */}
        {isDarkMode ? (
          <>
            <div className="fixed inset-0 bg-black" aria-hidden="true" />
            <div
              className="fixed inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background: [
                  'radial-gradient(ellipse at 15% 50%, rgba(99,102,241,0.14) 0%, transparent 55%)',
                  'radial-gradient(ellipse at 85% 15%, rgba(6,182,212,0.10) 0%, transparent 50%)',
                  'radial-gradient(ellipse at 50% 90%, rgba(59,130,246,0.08) 0%, transparent 50%)',
                ].join(', ')
              }}
            />
            {/* Floating particles */}
            {particles.map(p => (
              <div
                key={p.id}
                aria-hidden="true"
                className="fixed pointer-events-none rounded-full"
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
            <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hero-bg.webp)' }} aria-hidden="true" />
            <div className="fixed inset-0 bg-white/80" aria-hidden="true" />
          </>
        )}

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 sm:space-y-6">

              {/* Avatar with glow ring */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-block relative"
              >
                {isDarkMode && (
                  <div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{
                      background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, rgba(6,182,212,0.3) 60%, transparent 80%)',
                      animation: 'glow-pulse 3s ease-in-out infinite',
                    }}
                    aria-hidden="true"
                  />
                )}
                <button
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="relative inline-block p-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full mb-2 sm:mb-4 cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
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
                {isDarkMode ? (
                  <span className="animate-gradient-text bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
                    Desarrollador de software Full Stack
                  </span>
                ) : (
                  'Desarrollador de software Full Stack'
                )}
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}
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
                    className={`group relative p-2.5 sm:p-3 ${t(isDarkMode,
                      'bg-white/5 hover:bg-white/10 border-white/10 hover:border-indigo-500/50',
                      'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'
                    )} rounded-lg transition-all border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-slate-100')} hover:scale-110 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </a>
                ))}
              </motion.div>

            </div>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content" className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20" role="main">
          {activeSection === 'sobre-mi' && <SobreMi isDarkMode={isDarkMode} />}
          {activeSection === 'habilidades' && <Habilidades isDarkMode={isDarkMode} />}
          {activeSection === 'proyectos' && <Proyectos isDarkMode={isDarkMode} />}
          {activeSection === 'contacto' && <Contacto isDarkMode={isDarkMode} />}
        </main>
      </div>

      {/* Footer */}
      <footer className={`relative ${t(isDarkMode, 'bg-black/80 border-white/10', 'bg-slate-100/90 border-slate-300/50')} border-t py-6 sm:py-8`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 text-center ${t(isDarkMode, 'text-slate-500', 'text-slate-600')}`}>
          <p className="text-sm sm:text-base">© 2025 - Desarrollado con React, Vite y Tailwind CSS</p>
        </div>
      </footer>

      {isAvatarModalOpen && <AvatarModal onClose={() => setIsAvatarModalOpen(false)} />}
    </div>
  );
}
