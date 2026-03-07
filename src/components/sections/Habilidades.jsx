import React from 'react';
import { Code2 } from 'lucide-react';
import { skillsData } from '../../data/skills';
import { t } from '../../utils/theme';

export default function Habilidades({ isDarkMode }) {
  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn" role="region" aria-labelledby="habilidades-heading">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <Code2 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
        <h3 id="habilidades-heading" className="text-2xl sm:text-3xl font-bold">Habilidades Técnicas</h3>
      </div>

      <div>
        <h4 className={`text-lg sm:text-xl font-semibold mb-4 ${t(isDarkMode, 'text-blue-300', 'text-blue-700')}`}>
          Lenguajes y Frameworks
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {skillsData.languages.map((lang, index) => (
            <div
              key={index}
              className={`${t(isDarkMode,
                'bg-slate-800/40 border-blue-900/30 hover:border-blue-700/50',
                'bg-white/80 border-slate-300/50 hover:border-slate-400/70'
              )} backdrop-blur-sm rounded-xl p-5 sm:p-6 border transition-all hover:scale-105`}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl sm:text-4xl" role="img" aria-label={`Icono de ${lang.name}`}>{lang.icon}</span>
                <h5 className={`text-lg sm:text-xl font-bold ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>{lang.name}</h5>
              </div>
              <div className="flex flex-wrap gap-2">
                {lang.tools.map((tool, i) => (
                  <span key={i} className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm ${t(isDarkMode, 'bg-blue-900/30 text-blue-200', 'bg-blue-100/70 text-blue-700')}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-lg sm:text-xl font-semibold mb-4 ${t(isDarkMode, 'text-cyan-300', 'text-cyan-700')}`}>
          Herramientas y DevOps
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {skillsData.devtools.map((tool, index) => (
            <div
              key={index}
              className={`${t(isDarkMode,
                'bg-slate-800/40 border-cyan-900/30 hover:border-cyan-700/50',
                'bg-white/80 border-slate-300/50 hover:border-cyan-400/70'
              )} backdrop-blur-sm rounded-xl p-4 border transition-all hover:scale-105 text-center`}
            >
              <span className="text-2xl sm:text-3xl block mb-2" role="img" aria-label={`Icono de ${tool.name}`}>{tool.icon}</span>
              <p className={`text-xs sm:text-sm font-medium ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>{tool.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className={`text-lg sm:text-xl font-semibold mb-4 ${t(isDarkMode, 'text-purple-300', 'text-purple-700')}`}>
          Bases de Datos
        </h4>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl">
          {skillsData.databases.map((db, index) => (
            <div
              key={index}
              className={`${t(isDarkMode,
                'bg-slate-800/40 border-purple-900/30 hover:border-purple-700/50',
                'bg-white/80 border-slate-300/50 hover:border-purple-400/70'
              )} backdrop-blur-sm rounded-xl p-5 sm:p-6 border transition-all hover:scale-105 text-center`}
            >
              <span className="text-3xl sm:text-4xl block mb-3" role="img" aria-label={`Icono de ${db.name}`}>{db.icon}</span>
              <p className={`text-base sm:text-lg font-semibold ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>{db.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
