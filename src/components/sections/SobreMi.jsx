import React, { useRef } from 'react';
import { User } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { t } from '../../utils/theme';

export default function SobreMi({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`group relative ${t(isDarkMode,
        'border-white/10 hover:border-indigo-500/30',
        'bg-white/80 border-slate-300/50'
      )} backdrop-blur-sm rounded-2xl p-6 sm:p-8 border transition-all`}
      role="region"
      aria-labelledby="sobre-mi-heading"
    >
      {/* Glow effect on hover (dark mode only) */}
      {isDarkMode && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 pointer-events-none" aria-hidden="true" />
      )}
      {isDarkMode && (
        <div className="absolute inset-0 rounded-2xl bg-white/[0.03]" aria-hidden="true" />
      )}

      <div className="relative flex items-center gap-3 mb-4 sm:mb-6">
        <User className={`w-7 h-7 sm:w-8 sm:h-8 ${isDarkMode ? 'text-indigo-400' : 'text-blue-400'}`} aria-hidden="true" />
        <h3 id="sobre-mi-heading" className="text-2xl sm:text-3xl font-bold">Sobre Mí</h3>
      </div>
      <div className={`relative space-y-4 text-base sm:text-lg ${t(isDarkMode, 'text-slate-300', 'text-slate-700')}`}>
        <p>Soy desarrollador de software con experiencia práctica en Python, C# y JavaScript.</p>
        <p>Mi enfoque está en crear soluciones eficientes y escalables, combinando lo mejor de la teoría académica con las prácticas profesionales del mundo real.</p>
        <p>Busco continuamente aprender nuevas tecnologías y mejorar mis habilidades para ofrecer soluciones que generen impacto positivo.</p>
      </div>
    </motion.div>
  );
}
