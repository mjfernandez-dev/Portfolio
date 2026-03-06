import React from 'react';
import { Briefcase } from 'lucide-react';
import { projects } from '../../data/projects';
import ProjectCard from '../ProjectCard';
import { t } from '../../utils/theme';

export default function Proyectos({ isDarkMode }) {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn" role="region" aria-labelledby="proyectos-heading">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
        <h3 id="proyectos-heading" className="text-2xl sm:text-3xl font-bold">Proyectos</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} isDarkMode={isDarkMode} />
        ))}
      </div>
      <div
        className={`${t(isDarkMode,
          'bg-blue-900/20 border-blue-700/50',
          'bg-slate-200/60 border-slate-300/50'
        )} backdrop-blur-sm rounded-xl p-4 sm:p-6 border mt-6 sm:mt-8`}
        role="note"
        aria-label="Nota sobre los proyectos"
      >
        <p className={`text-center text-sm sm:text-base ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>
          💡 <strong>Nota:</strong> Estos proyectos están siendo consolidados en mi perfil de GitHub.
          Los enlaces se actualizarán próximamente con los repositorios completos.
        </p>
      </div>
    </div>
  );
}
