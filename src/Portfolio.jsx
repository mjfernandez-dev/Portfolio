import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code2, Briefcase, User, ExternalLink, Sun, Moon, Menu, X } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Verificar si hay una preferencia guardada, si no, usar dark por defecto
    // SSR-safe: verificar que window existe
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : true;
    }
    return true; // Default para SSR
  });

  // Persistir tema en localStorage
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    // Agregar clase al documento para facilitar estilos globales si es necesario
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      // No navegar si el foco está en un input, textarea o select
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      // Navegación con flechas en el menú
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const sections = ['sobre-mi', 'habilidades', 'proyectos', 'contacto'];
        const currentIndex = sections.indexOf(activeSection);
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
          setActiveSection(sections[currentIndex + 1]);
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
          setActiveSection(sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  // Cerrar menú al hacer scroll o redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú está abierto en móvil o modal de avatar abierto
  useEffect(() => {
    if (isMenuOpen || isAvatarModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isAvatarModalOpen]);

  const skillsData = {
    languages: [
      {
        name: 'Python',
        icon: '🐍',
        tools: ['Flask', 'Django']
      },
      {
        name: 'C#',
        icon: '⚡',
        tools: ['.NET Framework', 'WinForms', 'Class Libraries', 'Selenium']
      },
      {
        name: 'JavaScript',
        icon: '📜',
        tools: ['HTML', 'CSS', 'Bootstrap', 'React', 'Vite', 'Tailwind CSS']
      }
    ],
    devtools: [
      { name: 'Git & GitHub', icon: '🔀' },
      { name: 'Docker', icon: '🐳' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Postman', icon: '📮' },
      { name: 'Trello', icon: '📋' }
    ],
    databases: [
      { name: 'MySQL', icon: '🗄️' },
      { name: 'SQLite', icon: '💾' }
    ]
  };

  const projects = [
    {
      title: 'Expense Tracker',
      description: 'PWA para registrar y gestionar gastos personales. API REST con FastAPI, base de datos SQLite y frontend React + TypeScript con soporte offline.',
      tech: ['FastAPI', 'React', 'TypeScript', 'SQLite', 'PWA'],
      status: 'Completado',
      github: 'https://github.com/mjfernandez-dev/expense-tracker',
      demo: 'https://finanzaap.duckdns.org/login'
    },
    {
      title: 'Proyecto Universitario 1',
      description: 'Sistema desarrollado con Python para análisis de datos académicos',
      tech: ['Python', 'Pandas', 'Matplotlib'],
      status: 'En desarrollo',
      github: '#'
    },
    {
      title: 'Proyecto Universitario 2',
      description: 'Aplicación web para gestión de tareas con C# y ASP.NET',
      tech: ['C#', 'ASP.NET', 'SQL Server'],
      status: 'En desarrollo',
      github: '#'
    },
    {
      title: 'Desarrollo Profesional',
      description: 'Herramienta interna desarrollada en JavaScript para optimización de procesos',
      tech: ['JavaScript', 'Node.js', 'Express'],
      status: 'Completado',
      github: '#'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>
      {/* Skip to main content link para accesibilidad */}
      <a href="#main-content" className="skip-to-main">
        Saltar al contenido principal
      </a>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-slate-900/80 border-blue-900/30' : 'bg-slate-100/90 border-slate-300/50'} backdrop-blur-md z-50 border-b`} role="navigation" aria-label="Navegación principal">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &lt;Matías Fernández /&gt;
            </h1>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center" role="menubar">
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className={`p-2.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 focus:ring-offset-slate-900' : 'hover:bg-slate-200 text-slate-800 bg-slate-200/50 border border-slate-300 focus:ring-offset-slate-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => handleNavClick('sobre-mi')}
                aria-label="Ir a la sección Sobre Mí"
                aria-current={activeSection === 'sobre-mi' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'sobre-mi' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Sobre Mí
              </button>
              <button
                onClick={() => handleNavClick('habilidades')}
                aria-label="Ir a la sección Habilidades"
                aria-current={activeSection === 'habilidades' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'habilidades' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Habilidades
              </button>
              <button
                onClick={() => handleNavClick('proyectos')}
                aria-label="Ir a la sección Proyectos"
                aria-current={activeSection === 'proyectos' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'proyectos' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Proyectos
              </button>
              <button
                onClick={() => handleNavClick('contacto')}
                aria-label="Ir a la sección Contacto"
                aria-current={activeSection === 'contacto' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'contacto' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Contacto
              </button>
            </div>

            {/* Mobile Menu Button and Theme Toggle */}
            <div className="flex md:hidden gap-2 items-center">
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 focus:ring-offset-slate-900' : 'hover:bg-slate-200 text-slate-800 bg-slate-200/50 border border-slate-300 focus:ring-offset-slate-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                aria-expanded={isMenuOpen}
                className={`p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'hover:bg-slate-800 text-blue-400 focus:ring-offset-slate-900' : 'hover:bg-slate-200 text-blue-600 focus:ring-offset-slate-100'}`}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className={`md:hidden mt-4 pb-4 border-t ${isDarkMode ? 'border-blue-900/30' : 'border-slate-300/50'} pt-4 space-y-2`}>
              <button
                onClick={() => handleNavClick('sobre-mi')}
                aria-current={activeSection === 'sobre-mi' ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} ${activeSection === 'sobre-mi' ? 'bg-blue-500/20 text-blue-400' : isDarkMode ? 'hover:bg-slate-800/50 text-white' : 'hover:bg-slate-200/50 text-slate-800'}`}
              >
                Sobre Mí
              </button>
              <button
                onClick={() => handleNavClick('habilidades')}
                aria-current={activeSection === 'habilidades' ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} ${activeSection === 'habilidades' ? 'bg-blue-500/20 text-blue-400' : isDarkMode ? 'hover:bg-slate-800/50 text-white' : 'hover:bg-slate-200/50 text-slate-800'}`}
              >
                Habilidades
              </button>
              <button
                onClick={() => handleNavClick('proyectos')}
                aria-current={activeSection === 'proyectos' ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} ${activeSection === 'proyectos' ? 'bg-blue-500/20 text-blue-400' : isDarkMode ? 'hover:bg-slate-800/50 text-white' : 'hover:bg-slate-200/50 text-slate-800'}`}
              >
                Proyectos
              </button>
              <button
                onClick={() => handleNavClick('contacto')}
                aria-current={activeSection === 'contacto' ? 'page' : undefined}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} ${activeSection === 'contacto' ? 'bg-blue-500/20 text-blue-400' : isDarkMode ? 'hover:bg-slate-800/50 text-white' : 'hover:bg-slate-200/50 text-slate-800'}`}
              >
                Contacto
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Container with Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero-bg.webp)' }}
          aria-hidden="true"
        />

        {/* Overlay - different for dark and light modes */}
        <div
          className={`fixed inset-0 ${isDarkMode ? 'bg-slate-900/85' : 'bg-white/80'}`}
          aria-hidden="true"
        />

        {/* Hero Section */}
        <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 sm:space-y-6">
              <button
                onClick={() => setIsAvatarModalOpen(true)}
                className="inline-block p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-2 sm:mb-4 cursor-pointer hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                aria-label="Ver imagen de perfil en tamaño completo"
              >
                <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-full p-1`}>
                  <img
                    src="/images/avatar.png"
                    alt="Matías Fernández - Desarrollador Full Stack"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                  />
                </div>
              </button>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4 px-4">
                Desarrollador de software Full Stack
              </h2>
              <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
                Graduado en desarrollo desarrollo de software. Enfocado por crear soluciones a problemas reales. Aplicaciones web, de escritorio y automatización de procesos.
              </p>
              <div className="flex gap-3 sm:gap-4 justify-center mt-6 sm:mt-8" role="list">
                <a
                  href="https://github.com/mjfernandez-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar mi perfil de GitHub (se abre en nueva ventana)"
                  className={`p-2.5 sm:p-3 ${isDarkMode ? 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50' : 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'}`}
                >
                  <Github className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/matias-fernandez-/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar mi perfil de LinkedIn (se abre en nueva ventana)"
                  className={`p-2.5 sm:p-3 ${isDarkMode ? 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50' : 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'}`}
                >
                  <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </a>
                <a
                  href="mailto:mjfernandez.dev@gmail.com"
                  aria-label="Enviar un correo electrónico a mjfernandez.dev@gmail.com"
                  className={`p-2.5 sm:p-3 ${isDarkMode ? 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50' : 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'}`}
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main id="main-content" className="relative max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-20" role="main">

        {/* Sobre Mí */}
        {activeSection === 'sobre-mi' && (
          <div className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30' : 'bg-white/80 border-slate-300/50'} backdrop-blur-sm rounded-2xl p-6 sm:p-8 border animate-fadeIn`} role="region" aria-labelledby="sobre-mi-heading">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <User className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
              <h3 id="sobre-mi-heading" className="text-2xl sm:text-3xl font-bold">Sobre Mí</h3>
            </div>
            <div className={`space-y-4 text-base sm:text-lg ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              <p>
                Soy desarrollador de software con experiencia práctica en Python, C# y JavaScript.
              </p>
              <p>
                Mi enfoque está en crear soluciones eficientes y escalables, combinando lo mejor de la
                teoría académica con las prácticas profesionales del mundo real.
              </p>
              <p>
                Busco continuamente aprender nuevas tecnologías y mejorar mis habilidades para ofrecer
                soluciones que generen impacto positivo.
              </p>
            </div>
          </div>
        )}

        {/* Habilidades */}
        {activeSection === 'habilidades' && (
          <div className="space-y-8 sm:space-y-10 animate-fadeIn" role="region" aria-labelledby="habilidades-heading">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
              <h3 id="habilidades-heading" className="text-2xl sm:text-3xl font-bold">Habilidades Técnicas</h3>
            </div>

            {/* Lenguajes y Frameworks */}
            <div>
              <h4 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-blue-300' : 'text-blue-700'}`}>Lenguajes y Frameworks</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {skillsData.languages.map((lang, index) => (
                  <div key={index} className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 hover:border-blue-700/50' : 'bg-white/80 border-slate-300/50 hover:border-slate-400/70'} backdrop-blur-sm rounded-xl p-5 sm:p-6 border transition-all hover:scale-105`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl sm:text-4xl" role="img" aria-label={`Icono de ${lang.name}`}>{lang.icon}</span>
                      <h5 className={`text-lg sm:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{lang.name}</h5>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {lang.tools.map((tool, i) => (
                        <span key={i} className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${isDarkMode ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-100/70 text-blue-700'}`}>
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Herramientas y DevOps */}
            <div>
              <h4 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-cyan-300' : 'text-cyan-700'}`}>Herramientas y DevOps</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {skillsData.devtools.map((tool, index) => (
                  <div key={index} className={`${isDarkMode ? 'bg-slate-800/40 border-cyan-900/30 hover:border-cyan-700/50' : 'bg-white/80 border-slate-300/50 hover:border-cyan-400/70'} backdrop-blur-sm rounded-xl p-4 border transition-all hover:scale-105 text-center`}>
                    <span className="text-2xl sm:text-3xl block mb-2" role="img" aria-label={`Icono de ${tool.name}`}>{tool.icon}</span>
                    <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{tool.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bases de Datos */}
            <div>
              <h4 className={`text-lg sm:text-xl font-semibold mb-4 ${isDarkMode ? 'text-purple-300' : 'text-purple-700'}`}>Bases de Datos</h4>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 max-w-2xl">
                {skillsData.databases.map((db, index) => (
                  <div key={index} className={`${isDarkMode ? 'bg-slate-800/40 border-purple-900/30 hover:border-purple-700/50' : 'bg-white/80 border-slate-300/50 hover:border-purple-400/70'} backdrop-blur-sm rounded-xl p-5 sm:p-6 border transition-all hover:scale-105 text-center`}>
                    <span className="text-3xl sm:text-4xl block mb-3" role="img" aria-label={`Icono de ${db.name}`}>{db.icon}</span>
                    <p className={`text-base sm:text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{db.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Proyectos */}
        {activeSection === 'proyectos' && (
          <div className="space-y-4 sm:space-y-6 animate-fadeIn" role="region" aria-labelledby="proyectos-heading">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
              <h3 id="proyectos-heading" className="text-2xl sm:text-3xl font-bold">Proyectos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
              {projects.map((project, index) => (
                <article key={index} className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 hover:border-blue-700/50 focus-within:ring-offset-slate-800' : 'bg-white/80 border-slate-300/50 hover:border-slate-400/70 focus-within:ring-offset-white'} backdrop-blur-sm rounded-xl p-5 sm:p-6 border transition-all hover:scale-105 flex flex-col focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2`} tabIndex={0}>
                  <div className="flex-1">
                    <h4 className={`text-lg sm:text-xl font-bold mb-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>{project.title}</h4>
                    <p className={`mb-4 text-sm sm:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologías utilizadas">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border ${isDarkMode ? 'bg-blue-900/40 text-blue-200 border-blue-700/50' : 'bg-blue-100/70 text-blue-700 border-blue-300/50'}`} role="listitem">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${
                      project.status === 'Completado'
                        ? isDarkMode
                          ? 'bg-green-900/40 text-green-200 border border-green-700/50'
                          : 'bg-green-100/70 text-green-700 border border-green-300/50'
                        : isDarkMode
                          ? 'bg-yellow-900/40 text-yellow-200 border border-yellow-700/50'
                          : 'bg-yellow-100/70 text-yellow-700 border border-yellow-300/50'
                    }`} aria-label={`Estado del proyecto: ${project.status}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {project.github !== '#' ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver proyecto ${project.title} en GitHub (se abre en nueva ventana)`}
                        className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'text-blue-300 hover:text-blue-200 focus:ring-offset-slate-800' : 'text-blue-600 hover:text-blue-700 focus:ring-offset-slate-100'} rounded`}
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        Ver en GitHub
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
                      </a>
                    ) : (
                      <span
                        aria-label={`Repositorio de ${project.title} próximamente en GitHub`}
                        className={`flex items-center gap-2 text-sm sm:text-base opacity-50 cursor-not-allowed select-none ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
                      >
                        <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        Próximamente en GitHub
                      </span>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver demo en vivo de ${project.title} (se abre en nueva ventana)`}
                        className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${isDarkMode ? 'text-cyan-300 hover:text-cyan-200 focus:ring-offset-slate-800' : 'text-cyan-600 hover:text-cyan-700 focus:ring-offset-slate-100'} rounded`}
                      >
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                        Ver demo
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
            <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700/50' : 'bg-slate-200/60 border-slate-300/50'} backdrop-blur-sm rounded-xl p-4 sm:p-6 border mt-6 sm:mt-8`} role="note" aria-label="Nota sobre los proyectos">
              <p className={`text-center text-sm sm:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                💡 <strong>Nota:</strong> Estos proyectos están siendo consolidados en mi perfil de GitHub.
                Los enlaces se actualizarán próximamente con los repositorios completos.
              </p>
            </div>
          </div>
        )}

        {/* Contacto */}
        {activeSection === 'contacto' && (
          <div className="max-w-2xl mx-auto animate-fadeIn" role="region" aria-labelledby="contacto-heading">
            <div className="flex items-center gap-3 mb-6 sm:mb-8">
              <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
              <h3 id="contacto-heading" className="text-2xl sm:text-3xl font-bold">Contacto</h3>
            </div>
            <div className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30' : 'bg-white/80 border-slate-300/50'} backdrop-blur-sm rounded-2xl p-6 sm:p-8 border`}>
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" aria-label="Formulario de contacto">
                <div>
                  <label htmlFor="nombre" className={`block mb-2 font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors ${isDarkMode ? 'bg-slate-900/50 border-blue-900/50 text-white placeholder:text-slate-400' : 'bg-white border-blue-300/50 text-slate-900 placeholder:text-slate-500'}`}
                    placeholder="Tu nombre"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block mb-2 font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors ${isDarkMode ? 'bg-slate-900/50 border-blue-900/50 text-white placeholder:text-slate-400' : 'bg-white border-blue-300/50 text-slate-900 placeholder:text-slate-500'}`}
                    placeholder="tu@email.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className={`block mb-2 font-medium text-sm sm:text-base ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Mensaje</label>
                  <textarea
                    id="mensaje"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className={`w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-none ${isDarkMode ? 'bg-slate-900/50 border-blue-900/50 text-white placeholder:text-slate-400' : 'bg-white border-blue-300/50 text-slate-900 placeholder:text-slate-500'}`}
                    placeholder="Cuéntame sobre tu oferta de empleo o proyecto..."
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Enviar mensaje de contacto"
                  className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-800' : 'focus:ring-offset-slate-100'}`}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      </div>

      {/* Footer */}
      <footer className={`relative ${isDarkMode ? 'bg-slate-900/80 border-blue-900/30' : 'bg-slate-100/90 border-slate-300/50'} border-t py-6 sm:py-8`}>
        <div className={`max-w-6xl mx-auto px-4 sm:px-6 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p className="text-sm sm:text-base">© 2025 - Desarrollado con React, Vite y Tailwind CSS</p>
          {/* <p className="mt-2 text-sm sm:text-base">Disponible para oportunidades laborales</p>  */}
        </div>
      </footer>

      {/* Avatar Modal */}
      {isAvatarModalOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsAvatarModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="avatar-modal-title"
        >
          <div className="relative max-w-2xl w-full">
            {/* Close button */}
            <button
              onClick={() => setIsAvatarModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
              aria-label="Cerrar imagen de perfil"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Avatar image */}
            <img
              src="/images/avatar.png"
              alt="Matías Fernández - Desarrollador Full Stack"
              className="w-full h-auto rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Caption */}
            <p
              id="avatar-modal-title"
              className="text-white text-center mt-4 text-lg font-medium"
            >
              Matías Fernández - Desarrollador Full Stack
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
