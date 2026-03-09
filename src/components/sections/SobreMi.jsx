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
      className={`group relative backdrop-blur-sm rounded-2xl p-6 sm:p-8 border transition-all ${t(isDarkMode,
        'bg-white/[0.04] border-white/10 hover:border-indigo-500/30 hover:shadow-[0_0_30px_rgba(99,102,241,0.12)]',
        'bg-white border-slate-200 hover:border-indigo-300/60 hover:shadow-[0_4px_30px_rgba(99,102,241,0.10)]'
      )}`}
      role="region"
      aria-labelledby="sobre-mi-heading"
    >
      {isDarkMode && (
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500 pointer-events-none" aria-hidden="true" />
      )}

      <div className="relative flex items-center gap-3 mb-4 sm:mb-6">
        <User className={`w-7 h-7 sm:w-8 sm:h-8 ${t(isDarkMode, 'text-indigo-400', 'text-indigo-500')}`} aria-hidden="true" />
        <h3 id="sobre-mi-heading" className="text-2xl sm:text-3xl font-bold">Sobre Mí</h3>
      </div>
      <div className={`relative space-y-4 text-base sm:text-lg ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}>
        <p>Soy desarrollador de software con experiencia práctica en Python, C# y JavaScript.</p>
        <p>Mi enfoque está en crear soluciones eficientes y escalables, combinando lo mejor de la teoría académica con las prácticas profesionales del mundo real.</p>
        <p>Busco continuamente aprender nuevas tecnologías y mejorar mis habilidades para ofrecer soluciones que generen impacto positivo.</p>
      </div>
    </motion.div>
  );
}
