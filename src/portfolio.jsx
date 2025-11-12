import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Code2, Briefcase, User, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Skip to main content link para accesibilidad */}
      <a href="#main-content" className="skip-to-main">
        Saltar al contenido principal
      </a>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-blue-900/30" role="navigation" aria-label="Navegación principal">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &lt;Matías Fernández /&gt;
            </h1>
            <div className="flex gap-6" role="menubar">
              <button 
                onClick={() => setActiveSection('sobre-mi')}
                aria-label="Ir a la sección Sobre Mí"
                aria-current={activeSection === 'sobre-mi' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${activeSection === 'sobre-mi' ? 'text-blue-400' : 'text-white'}`}
              >
                Sobre Mí
              </button>
              <button 
                onClick={() => setActiveSection('habilidades')}
                aria-label="Ir a la sección Habilidades"
                aria-current={activeSection === 'habilidades' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${activeSection === 'habilidades' ? 'text-blue-400' : 'text-white'}`}
              >
                Habilidades
              </button>
              <button 
                onClick={() => setActiveSection('proyectos')}
                aria-label="Ir a la sección Proyectos"
                aria-current={activeSection === 'proyectos' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${activeSection === 'proyectos' ? 'text-blue-400' : 'text-white'}`}
              >
                Proyectos
              </button>
              <button 
                onClick={() => setActiveSection('contacto')}
                aria-label="Ir a la sección Contacto"
                aria-current={activeSection === 'contacto' ? 'page' : undefined}
                role="menuitem"
                className={`hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded px-2 py-1 ${activeSection === 'contacto' ? 'text-blue-400' : 'text-white'}`}
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
              <div className="bg-slate-900 rounded-full p-4">
                <User className="w-20 h-20 text-blue-400" aria-hidden="true" />
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-4">
              Desarrollador Full Stack
            </h2>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">
              Estudiante de desarrollo apasionado por crear soluciones innovadoras con Python, C# y JavaScript
            </p>
            <div className="flex gap-4 justify-center mt-8" role="list">
              <a 
                href="https://github.com/mjfernandez-dev" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de GitHub (se abre en nueva ventana)"
                className="p-3 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors border border-blue-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Github className="w-6 h-6" aria-hidden="true" />
              </a>
              <a 
                href="https://www.linkedin.com/in/matias-fernandez-/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visitar mi perfil de LinkedIn (se abre en nueva ventana)"
                className="p-3 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors border border-blue-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
              >
                <Linkedin className="w-6 h-6" aria-hidden="true" />
              </a>
              <a 
                href="mailto:mjfernandez.dev@gmail.com" 
                aria-label="Enviar un correo electrónico a mjfernandez.dev@gmail.com"
                className="p-3 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors border border-blue-700/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
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
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/30 animate-fadeIn" role="region" aria-labelledby="sobre-mi-heading">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-blue-400" aria-hidden="true" />
              <h3 id="sobre-mi-heading" className="text-3xl font-bold">Sobre Mí</h3>
            </div>
            <div className="space-y-4 text-slate-200 text-lg">
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
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-700/50 transition-all hover:scale-105 focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-800" role="listitem" tabIndex={0}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl" role="img" aria-label={`Icono de ${skill.name}`}>{skill.icon}</span>
                    <h4 className="text-xl font-semibold text-white">{skill.name}</h4>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={`Nivel de ${skill.name}: ${skill.level} por ciento`}>
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-slate-300 mt-2">{skill.level}%</p>
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
                <article key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-700/50 transition-all hover:scale-105 flex flex-col focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 focus-within:ring-offset-slate-800" tabIndex={0}>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-3 text-blue-200">{project.title}</h4>
                    <p className="text-slate-200 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologías utilizadas">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-900/40 text-blue-200 rounded-full text-sm border border-blue-700/50" role="listitem">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      project.status === 'Completado' 
                        ? 'bg-green-900/40 text-green-200 border border-green-700/50' 
                        : 'bg-yellow-900/40 text-yellow-200 border border-yellow-700/50'
                    }`} aria-label={`Estado del proyecto: ${project.status}`}>
                      {project.status}
                    </span>
                  </div>
                  <a 
                    href={project.github} 
                    target={project.github !== '#' ? "_blank" : undefined}
                    rel={project.github !== '#' ? "noopener noreferrer" : undefined}
                    aria-label={`Ver proyecto ${project.title} en GitHub${project.github !== '#' ? ' (se abre en nueva ventana)' : ''}`}
                    className="mt-4 flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800 rounded"
                  >
                    <Github className="w-5 h-5" aria-hidden="true" />
                    Ver en GitHub
                    {project.github !== '#' && <ExternalLink className="w-4 h-4" aria-hidden="true" />}
                  </a>
                </article>
              ))}
            </div>
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50 mt-8" role="note" aria-label="Nota sobre los proyectos">
              <p className="text-center text-slate-200">
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
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/30">
              <form onSubmit={handleSubmit} className="space-y-6" aria-label="Formulario de contacto">
                <div>
                  <label htmlFor="nombre" className="block text-slate-200 mb-2 font-medium">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-blue-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    placeholder="Tu nombre"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-slate-200 mb-2 font-medium">Email</label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-blue-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                    placeholder="tu@email.com"
                    aria-required="true"
                  />
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-slate-200 mb-2 font-medium">Mensaje</label>
                  <textarea
                    id="mensaje"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full bg-slate-900/50 border border-blue-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-none"
                    placeholder="Cuéntame sobre tu oferta de empleo o proyecto..."
                    aria-required="true"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="Enviar mensaje de contacto"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-blue-900/30 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400">
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