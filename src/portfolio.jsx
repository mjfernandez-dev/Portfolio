import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code2, Briefcase, User, ExternalLink, Sun, Moon } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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

  const skills = [
    { name: 'Python', level: 85, icon: '🐍' },
    { name: 'C#', level: 80, icon: '⚡' },
    { name: 'JavaScript', level: 85, icon: '📜' },
    { name: 'React', level: 75, icon: '⚛️' },
    { name: 'Git', level: 70, icon: '🔀' }
  ];

  const projects = [
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
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white' : 'bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 text-slate-800'}`}>
      {/* Skip to main content link para accesibilidad */}
      <a href="#main-content" className="skip-to-main">
        Saltar al contenido principal
      </a>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${isDarkMode ? 'bg-slate-900/80 border-blue-900/30' : 'bg-slate-100/90 border-slate-300/50'} backdrop-blur-md z-50 border-b`} role="navigation" aria-label="Navegación principal">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &lt;Matías Fernández /&gt;
            </h1>
            <div className="flex gap-6 items-center" role="menubar">
              <button
                onClick={toggleTheme}
                aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                className={`p-2.5 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 focus:ring-offset-slate-900' : 'hover:bg-slate-200 text-slate-800 bg-slate-200/50 border border-slate-300 focus:ring-offset-slate-100'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setActiveSection('sobre-mi')}
                aria-label="Ir a la sección Sobre Mí"
                aria-current={activeSection === 'sobre-mi' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'sobre-mi' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Sobre Mí
              </button>
              <button 
                onClick={() => setActiveSection('habilidades')}
                aria-label="Ir a la sección Habilidades"
                aria-current={activeSection === 'habilidades' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'habilidades' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Habilidades
              </button>
              <button 
                onClick={() => setActiveSection('proyectos')}
                aria-label="Ir a la sección Proyectos"
                aria-current={activeSection === 'proyectos' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'proyectos' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Proyectos
              </button>
              <button 
                onClick={() => setActiveSection('contacto')}
                aria-label="Ir a la sección Contacto"
                aria-current={activeSection === 'contacto' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'} rounded px-2 py-1 ${activeSection === 'contacto' ? 'text-blue-400' : isDarkMode ? 'text-white' : 'text-slate-800'}`}
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block p-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
              <div className={`${isDarkMode ? 'bg-slate-900' : 'bg-white'} rounded-full p-4`}>
                <User className="w-20 h-20 text-blue-400" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-4">
              Desarrollador Full Stack
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-slate-200' : 'text-slate-600'}`}>
              Estudiante de desarrollo apasionado por crear soluciones innovadoras con Python, C# y JavaScript
            </p>
            <div className="flex gap-4 justify-center mt-8" role="list">
              <a 
                href="https://github.com/mjfernandez-dev" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de GitHub (se abre en nueva ventana)"
                className={`p-3 ${isDarkMode ? 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50' : 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'}`}
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </a>
              <a 
                href="https://www.linkedin.com/in/matias-fernandez-/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de LinkedIn (se abre en nueva ventana)"
                className={`p-3 ${isDarkMode ? 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50' : 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'}`}
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </a>
              <a 
                href="mailto:mjfernandez.dev@gmail.com" 
                aria-label="Enviar un correo electrónico a mjfernandez.dev@gmail.com"
                className={`p-3 ${isDarkMode ? 'bg-blue-900/30 hover:bg-blue-800/50 border-blue-700/50' : 'bg-slate-200/60 hover:bg-slate-300/70 border-slate-300/50'} rounded-lg transition-colors border focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-900' : 'focus:ring-offset-slate-100'}`}
              >
                <Mail className="w-6 h-6" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main id="main-content" className="max-w-6xl mx-auto px-6 pb-20" role="main">
        
        {/* Sobre Mí */}
        {activeSection === 'sobre-mi' && (
          <div className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30' : 'bg-white/80 border-slate-300/50'} backdrop-blur-sm rounded-2xl p-8 border animate-fadeIn`} role="region" aria-labelledby="sobre-mi-heading">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h3 id="sobre-mi-heading" className="text-3xl font-bold">Sobre Mí</h3>
            </div>
            <div className={`space-y-4 text-lg ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
              <p>
                Soy estudiante de desarrollo de software con experiencia práctica en Python, C# y JavaScript. 
                Actualmente trabajo en proyectos reales mientras completo mi formación universitaria.
              </p>
              <p>
                Mi enfoque está en crear aplicaciones eficientes y escalables, combinando lo mejor de la 
                teoría académica con las prácticas profesionales del mundo real.
              </p>
              <p>
                Busco continuamente aprender nuevas tecnologías y mejorar mis habilidades para ofrecer 
                soluciones de calidad que generen impacto positivo.
              </p>
            </div>
          </div>
        )}

        {/* Habilidades */}
        {activeSection === 'habilidades' && (
          <div className="space-y-6 animate-fadeIn" role="region" aria-labelledby="habilidades-heading">
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h3 id="habilidades-heading" className="text-3xl font-bold">Habilidades Técnicas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
              {skills.map((skill, index) => (
                <div key={index} className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 hover:border-blue-700/50 focus-within:ring-offset-slate-800' : 'bg-white/80 border-slate-300/50 hover:border-slate-400/70 focus-within:ring-offset-white'} backdrop-blur-sm rounded-xl p-6 border transition-all hover:scale-105 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2`} role="listitem" tabIndex={0}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl" role="img" aria-label={`Icono de ${skill.name}`}>{skill.icon}</span>
                    <h4 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>{skill.name}</h4>
                  </div>
                  <div className={`w-full rounded-full h-3 overflow-hidden ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-200/70'}`} role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`Nivel de ${skill.name}: ${skill.level} por ciento`}>
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className={`text-right text-sm mt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>{skill.level}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proyectos */}
        {activeSection === 'proyectos' && (
          <div className="space-y-6 animate-fadeIn" role="region" aria-labelledby="proyectos-heading">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h3 id="proyectos-heading" className="text-3xl font-bold">Proyectos</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
              {projects.map((project, index) => (
                <article key={index} className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30 hover:border-blue-700/50 focus-within:ring-offset-slate-800' : 'bg-white/80 border-slate-300/50 hover:border-slate-400/70 focus-within:ring-offset-white'} backdrop-blur-sm rounded-xl p-6 border transition-all hover:scale-105 flex flex-col focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2`} tabIndex={0}>
                  <div className="flex-1">
                    <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-blue-200' : 'text-blue-700'}`}>{project.title}</h4>
                    <p className={`mb-4 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologías utilizadas">
                      {project.tech.map((tech, i) => (
                        <span key={i} className={`px-3 py-1 rounded-full text-sm border ${isDarkMode ? 'bg-blue-900/40 text-blue-200 border-blue-700/50' : 'bg-blue-100/70 text-blue-700 border-blue-300/50'}`} role="listitem">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
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
                  <a 
                    href={project.github} 
                    target={project.github !== '#' ? "_blank" : undefined}
                    rel={project.github !== '#' ? "noopener noreferrer" : undefined}
                    aria-label={`Ver proyecto ${project.title} en GitHub${project.github !== '#' ? ' (se abre en nueva ventana)' : ''}`}
                    className={`mt-4 flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'text-blue-300 hover:text-blue-200 focus:ring-offset-slate-800' : 'text-blue-600 hover:text-blue-700 focus:ring-offset-slate-100'} rounded`}
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                    Ver en GitHub
                    {project.github !== '#' && <ExternalLink className="w-4 h-4" aria-hidden="true" />}
                  </a>
                </article>
              ))}
            </div>
            <div className={`${isDarkMode ? 'bg-blue-900/20 border-blue-700/50' : 'bg-slate-200/60 border-slate-300/50'} backdrop-blur-sm rounded-xl p-6 border mt-8`} role="note" aria-label="Nota sobre los proyectos">
              <p className={`text-center ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                💡 <strong>Nota:</strong> Estos proyectos están siendo consolidados en mi perfil de GitHub. 
                Los enlaces se actualizarán próximamente con los repositorios completos.
              </p>
            </div>
          </div>
        )}

        {/* Contacto */}
        {activeSection === 'contacto' && (
          <div className="max-w-2xl mx-auto animate-fadeIn" role="region" aria-labelledby="contacto-heading">
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h3 id="contacto-heading" className="text-3xl font-bold">Contacto</h3>
            </div>
            <div className={`${isDarkMode ? 'bg-slate-800/40 border-blue-900/30' : 'bg-white/80 border-slate-300/50'} backdrop-blur-sm rounded-2xl p-8 border`}>
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de contacto">
                <div>
                  <label htmlFor="nombre" className={`block mb-2 font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors ${isDarkMode ? 'bg-slate-900/50 border-blue-900/50 text-white' : 'bg-white border-blue-300/50 text-slate-900'}`}
                    placeholder="Tu nombre"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className={`block mb-2 font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors ${isDarkMode ? 'bg-slate-900/50 border-blue-900/50 text-white' : 'bg-white border-blue-300/50 text-slate-900'}`}
                    placeholder="tu@email.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className={`block mb-2 font-medium ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>Mensaje</label>
                  <textarea
                    id="mensaje"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-none ${isDarkMode ? 'bg-slate-900/50 border-blue-900/50 text-white' : 'bg-white border-blue-300/50 text-slate-900'}`}
                    placeholder="Cuéntame sobre tu oferta de empleo o proyecto..."
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Enviar mensaje de contacto"
                  className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${isDarkMode ? 'focus:ring-offset-slate-800' : 'focus:ring-offset-slate-100'}`}
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-slate-900/80 border-blue-900/30' : 'bg-slate-100/90 border-slate-300/50'} border-t py-8`}>
        <div className={`max-w-6xl mx-auto px-6 text-center ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
          <p>© 2025 - Desarrollado con React, Vite y Tailwind CSS</p>
          {/* <p className="mt-2">Disponible para oportunidades laborales</p>  */}
        </div>
      </footer>

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

