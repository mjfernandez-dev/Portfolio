import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { t, getStatusStyles } from '../utils/theme';

export default function ProjectCard({ project, isDarkMode }) {
  return (
    <article
      className={`group relative backdrop-blur-sm rounded-xl border transition-all flex flex-col h-full focus-within:ring-2 focus-within:ring-indigo-400 focus-within:ring-offset-2 hover:-translate-y-1 ${t(isDarkMode,
        'bg-white/[0.04] border-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] focus-within:ring-offset-black',
        'bg-white border-slate-200 hover:border-indigo-300/60 hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] focus-within:ring-offset-white'
      )}`}
      tabIndex={0}
    >
      {isDarkMode && (
        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 pointer-events-none" aria-hidden="true" />
      )}

      <div className="relative flex-1 p-5 sm:p-6">
        <h4 className={`text-lg sm:text-xl font-bold mb-3 ${t(isDarkMode, 'text-indigo-200', 'text-indigo-700')}`}>
          {project.title}
        </h4>
        <p className={`mb-4 text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologías utilizadas">
          {project.tech.map((tech, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border cursor-default ${t(isDarkMode,
                'bg-indigo-900/40 text-indigo-200 border-indigo-700/40',
                'bg-indigo-50 text-indigo-700 border-indigo-200/80'
              )}`}
              role="listitem"
            >
              {tech}
            </motion.span>
          ))}
        </div>
        <span
          className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getStatusStyles(project.status, isDarkMode)}`}
          aria-label={`Estado del proyecto: ${project.status}`}
        >
          {project.status}
        </span>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-3 px-5 sm:px-6 pb-5 sm:pb-6">
        {project.github !== '#' ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver proyecto ${project.title} en GitHub (se abre en nueva ventana)`}
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 rounded ${t(isDarkMode,
              'text-indigo-300 hover:text-indigo-200 focus:ring-offset-black',
              'text-indigo-600 hover:text-indigo-700 focus:ring-offset-white'
            )}`}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Ver en GitHub
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
          </a>
        ) : (
          <span
            aria-label={`Repositorio de ${project.title} próximamente en GitHub`}
            className={`flex items-center gap-2 text-sm sm:text-base opacity-40 cursor-not-allowed select-none ${t(isDarkMode, 'text-indigo-300', 'text-indigo-600')}`}
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
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 rounded ${t(isDarkMode,
              'text-cyan-300 hover:text-cyan-200 focus:ring-offset-black',
              'text-cyan-600 hover:text-cyan-700 focus:ring-offset-white'
            )}`}
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Ver demo
          </a>
        )}
        {project.nuget && (
          <a
            href={project.nuget}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver ${project.title} en NuGet (se abre en nueva ventana)`}
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 rounded ${t(isDarkMode,
              'text-blue-300 hover:text-blue-200 focus:ring-offset-black',
              'text-blue-600 hover:text-blue-700 focus:ring-offset-white'
            )}`}
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Ver en NuGet
          </a>
        )}
      </div>
    </article>
  );
}
