import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { t, getStatusStyles } from '../utils/theme';

export default function ProjectCard({ project, isDarkMode }) {
  return (
    <article
      className={`${t(isDarkMode,
        'bg-slate-800/40 border-blue-900/30 hover:border-blue-700/50 focus-within:ring-offset-slate-800',
        'bg-white/80 border-slate-300/50 hover:border-slate-400/70 focus-within:ring-offset-white'
      )} backdrop-blur-sm rounded-xl p-5 sm:p-6 border transition-all hover:scale-105 flex flex-col focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2`}
      tabIndex={0}
    >
      <div className="flex-1">
        <h4 className={`text-lg sm:text-xl font-bold mb-3 ${t(isDarkMode, 'text-blue-200', 'text-blue-700')}`}>
          {project.title}
        </h4>
        <p className={`mb-4 text-sm sm:text-base ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Tecnologías utilizadas">
          {project.tech.map((tech, i) => (
            <span
              key={i}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm border ${t(isDarkMode,
                'bg-blue-900/40 text-blue-200 border-blue-700/50',
                'bg-blue-100/70 text-blue-700 border-blue-300/50'
              )}`}
              role="listitem"
            >
              {tech}
            </span>
          ))}
        </div>
        <span
          className={`inline-block px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${getStatusStyles(project.status, isDarkMode)}`}
          aria-label={`Estado del proyecto: ${project.status}`}
        >
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
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode,
              'text-blue-300 hover:text-blue-200 focus:ring-offset-slate-800',
              'text-blue-600 hover:text-blue-700 focus:ring-offset-slate-100'
            )} rounded`}
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Ver en GitHub
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" aria-hidden="true" />
          </a>
        ) : (
          <span
            aria-label={`Repositorio de ${project.title} próximamente en GitHub`}
            className={`flex items-center gap-2 text-sm sm:text-base opacity-50 cursor-not-allowed select-none ${t(isDarkMode, 'text-blue-300', 'text-blue-600')}`}
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
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 ${t(isDarkMode,
              'text-cyan-300 hover:text-cyan-200 focus:ring-offset-slate-800',
              'text-cyan-600 hover:text-cyan-700 focus:ring-offset-slate-100'
            )} rounded`}
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
            className={`flex items-center gap-2 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${t(isDarkMode,
              'text-purple-300 hover:text-purple-200 focus:ring-offset-slate-800',
              'text-purple-600 hover:text-purple-700 focus:ring-offset-slate-100'
            )} rounded`}
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
            Ver en NuGet
          </a>
        )}
      </div>
    </article>
  );
}
