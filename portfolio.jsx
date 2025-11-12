import React, { useState } from 'react';
import { Github, Linkedin, Mail, Code2, Briefcase, User, ExternalLink } from 'lucide-react';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('sobre-mi');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

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
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-blue-900/30">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              &lt;TuNombre /&gt;
            </h1>
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveSection('sobre-mi')}
                className={`hover:text-blue-400 transition-colors ${activeSection === 'sobre-mi' ? 'text-blue-400' : ''}`}
              >
                Sobre Mí
              </button>
              <button 
                onClick={() => setActiveSection('habilidades')}
                className={`hover:text-blue-400 transition-colors ${activeSection === 'habilidades' ? 'text-blue-400' : ''}`}
              >
                Habilidades
              </button>
              <button 
                onClick={() => setActiveSection('proyectos')}
                className={`hover:text-blue-400 transition-colors ${activeSection === 'proyectos' ? 'text-blue-400' : ''}`}
              >
                Proyectos
              </button>
              <button 
                onClick={() => setActiveSection('contacto')}
                className={`hover:text-blue-400 transition-colors ${activeSection === 'contacto' ? 'text-blue-400' : ''}`}
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
                <User className="w-20 h-20 text-blue-400" />
              </div>
            </div>
            <h2 className="text-5xl font-bold mb-4">
              Desarrollador Full Stack
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Estudiante de desarrollo apasionado por crear soluciones innovadoras con Python, C# y JavaScript
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <a href="#" className="p-3 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors border border-blue-700/50">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors border border-blue-700/50">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="#" className="p-3 bg-blue-900/30 hover:bg-blue-800/50 rounded-lg transition-colors border border-blue-700/50">
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        
        {/* Sobre Mí */}
        {activeSection === 'sobre-mi' && (
          <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/30 animate-fadeIn">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold">Sobre Mí</h3>
            </div>
            <div className="space-y-4 text-slate-300 text-lg">
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
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
              <Code2 className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold">Habilidades Técnicas</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-700/50 transition-all hover:scale-105">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{skill.icon}</span>
                    <h4 className="text-xl font-semibold">{skill.name}</h4>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-right text-sm text-slate-400 mt-2">{skill.level}%</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Proyectos */}
        {activeSection === 'proyectos' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
              <Briefcase className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold">Proyectos</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-700/50 transition-all hover:scale-105 flex flex-col">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold mb-3 text-blue-300">{project.title}</h4>
                    <p className="text-slate-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-900/40 text-blue-300 rounded-full text-sm border border-blue-700/50">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                      project.status === 'Completado' 
                        ? 'bg-green-900/40 text-green-300 border border-green-700/50' 
                        : 'bg-yellow-900/40 text-yellow-300 border border-yellow-700/50'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <a 
                    href={project.github} 
                    className="mt-4 flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    Ver en GitHub
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
            <div className="bg-blue-900/20 backdrop-blur-sm rounded-xl p-6 border border-blue-700/50 mt-8">
              <p className="text-center text-slate-300">
                💡 <strong>Nota:</strong> Estos proyectos están siendo consolidados en mi perfil de GitHub. 
                Los enlaces se actualizarán próximamente con los repositorios completos.
              </p>
            </div>
          </div>
        )}

        {/* Contacto */}
        {activeSection === 'contacto' && (
          <div className="max-w-2xl mx-auto animate-fadeIn">
            <div className="flex items-center gap-3 mb-8">
              <Mail className="w-8 h-8 text-blue-400" />
              <h3 className="text-3xl font-bold">Contacto</h3>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-2xl p-8 border border-blue-900/30">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-900/50 border border-blue-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-slate-900/50 border border-blue-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-2 font-medium">Mensaje</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    className="w-full bg-slate-900/50 border border-blue-900/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Cuéntame sobre tu oferta de empleo o proyecto..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-slate-900/80 border-t border-blue-900/30 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-400">
          <p>© 2025 - Desarrollado con React y Tailwind CSS</p>
          <p className="mt-2">Disponible para oportunidades laborales</p>
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