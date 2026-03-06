import React, { useState, useEffect, useCallback } from 'react';
import { Github, Linkedin, Mail, Sun, Moon, Menu, X } from 'lucide-react';
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

  const navBtnClass = (section) =>
    `hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-slate-900', 'focus:ring-offset-slate-100')} rounded px-2 py-1 ${activeSection === section ? 'text-blue-400' : t(isDarkMode, 'text-white', 'text-slate-800')}`;

  const mobileNavBtnClass = (section) =>
    `w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-slate-900', 'focus:ring-offset-slate-100')} ${activeSection === section ? 'bg-blue-500/20 text-blue-400' : t(isDarkMode, 'hover:bg-slate-800/50 text-white', 'hover:bg-slate-200/50 text-slate-800')}`;

  const themeBtnClass = (mobile = false) =>
    `${mobile ? 'p-2' : 'p-2.5'} rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode,
      'hover:bg-slate-800 text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 focus:ring-offset-slate-900',
      'hover:bg-slate-200 text-slate-800 bg-slate-200/50 border border-slate-300 focus:ring-offset-slate-100'
    )}`;

  return (
    <div className={`min-h-screen ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>
      <a href="#main-content" className="skip-to-main">Saltar al contenido principal</a>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full ${t(isDarkMode, 'bg-slate-900/80 border-blue-900/30', 'bg-slate-100/90 border-slate-300/50')} backdrop-blur-md z-50 border-b`}
        role="navigation"
        aria-label="Navegación principal"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
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
                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'hover:bg-slate-800 text-blue-400 focus:ring-offset-slate-900', 'hover:bg-slate-200 text-blue-600 focus:ring-offset-slate-100')}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 border-t ${t(isDarkMode, 'border-blue-900/30', 'border-slate-300/50')} pt-4 space-y-2`}>
              {SECTIONS.map(section => (
                <button key={section} onClick={() => handleNavClick(section)} aria-current={activeSection === section ? 'page' : undefined} className={mobileNavBtnClass(section)}>
                  {NAV_LABELS[section]}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Container with Background */}
      <div className="relative min-h-screen">
        <div className="fixed inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/hero-bg.webp)' }} aria-hidden="true" />
        <div className={`fixed inset-0 ${t(isDarkMode, 'bg-slate-900/85', 'bg-white/80')}`} aria-hidden="true" />

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 sm:space-y-6">
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="inline-block p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-2 sm:mb-4 cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Ver imagen de perfil en tamaño completo"
              >
                <div className={`${t(isDarkMode, 'bg-slate-900', 'bg-white')} rounded-full p-1`}>
                  <img src="/images/avatar.png" alt="Matías Fernández - Desarrollador Full Stack" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover" />
                </div>
              </button>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 px-4">
                Desarrollador de software Full Stack
              </h2>
              <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${t(isDarkMode, 'text-slate-200', 'text-slate-600')}`}>
                Graduado en desarrollo desarrollo de software. Enfocado por crear soluciones a problemas reales. Aplicaciones web, de escritorio y automatización de procesos.
              </p>
              <div className="flex gap-3 sm:gap-4 justify-center mt-6 sm:mt-8" role="list">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={href}
                    href={href}
                    target={href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className={`p-2.5 sm:p-3 ${t(isDarkMode, 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50', 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50')} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-slate-900', 'focus:ring-offset-slate-100')}`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
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
      <footer className={`relative ${t(isDarkMode, 'bg-slate-900/80 border-blue-900/30', 'bg-slate-100/90 border-slate-300/50')} border-t py-6 sm:py-8`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 text-center ${t(isDarkMode, 'text-slate-400', 'text-slate-600')}`}>
          <p className="text-sm sm:text-base">© 2025 - Desarrollado con React, Vite y Tailwind CSS</p>
        </div>
      </footer>

      {isAvatarModalOpen && <AvatarModal onClose={() => setIsAvatarModalOpen(false)} />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
      `}</style>
    </div>
  );
}
