import React from 'react';
import { User } from 'lucide-react';
import { t } from '../../utils/theme';

export default function SobreMi({ isDarkMode }) {
  return (
    <div
      className={`${t(isDarkMode,
        'bg-slate-800/40 border-blue-900/30',
        'bg-white/80 border-slate-300/50'
      )} backdrop-blur-sm rounded-2xl p-6 sm:p-8 border animate-fadeIn`}
      role="region"
      aria-labelledby="sobre-mi-heading"
    >
      <div className="flex items-center gap-3 mb-4 sm:mb-6">
        <User className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
        <h3 id="sobre-mi-heading" className="text-2xl sm:text-3xl font-bold">Sobre Mí</h3>
      </div>
      <div className={`space-y-4 text-base sm:text-lg ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>
        <p>Soy desarrollador de software con experiencia práctica en Python, C# y JavaScript.</p>
        <p>Mi enfoque está en crear soluciones eficientes y escalables, combinando lo mejor de la teoría académica con las prácticas profesionales del mundo real.</p>
        <p>Busco continuamente aprender nuevas tecnologías y mejorar mis habilidades para ofrecer soluciones que generen impacto positivo.</p>
      </div>
    </div>
  );
}
