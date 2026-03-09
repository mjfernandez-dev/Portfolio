import React, { useRef } from 'react';
import { Code2 } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { skillsData } from '../../data/skills';
import { t } from '../../utils/theme';

function GlowCard({ isDarkMode, children, className = '', delay = 0, isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className={`group relative ${className}`}
    >
      {isDarkMode && (
        <div className="absolute -inset-px rounded-xl bg-gradient-to-r from-indigo-600/25 to-cyan-600/25 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-400 pointer-events-none" aria-hidden="true" />
      )}
      <div className={`relative ${t(isDarkMode,
        'bg-white/[0.04] border-white/10 hover:border-indigo-500/40',
        'bg-white/80 border-slate-300/50 hover:border-slate-400/70'
      )} backdrop-blur-sm rounded-xl border transition-all hover:scale-105 hover:shadow-[0_0_24px_rgba(99,102,241,0.2)]`}>
        {children}
      </div>
    </motion.div>
  );
}

export default function Habilidades({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="space-y-8 sm:space-y-10" role="region" aria-labelledby="habilidades-heading" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6 sm:mb-8"
      >
        <Code2 className={`w-7 h-7 sm:w-8 sm:h-8 ${isDarkMode ? 'text-indigo-400' : 'text-blue-400'}`} aria-hidden="true" />
        <h3 id="habilidades-heading" className="text-2xl sm:text-3xl font-bold">Habilidades Técnicas</h3>
      </motion.div>

      <div>
        <motion.h4
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={`text-lg sm:text-xl font-semibold mb-4 ${t(isDarkMode, 'text-indigo-300', 'text-blue-700')}`}
        >
          Lenguajes y Frameworks
        </motion.h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {skillsData.languages.map((lang, index) => (
            <GlowCard key={index} isDarkMode={isDarkMode} delay={0.15 + index * 0.1} isInView={isInView}>
              <div className="p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl sm:text-4xl" role="img" aria-label={`Icono de ${lang.name}`}>{lang.icon}</span>
                  <h5 className={`text-lg sm:text-xl font-bold ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>{lang.name}</h5>
                </div>
                <div className="flex flex-wrap gap-2">
                  {lang.tools.map((tool, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className={`px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm cursor-default ${t(isDarkMode, 'bg-indigo-900/40 text-indigo-200 border border-indigo-700/30', 'bg-blue-100/70 text-blue-700')}`}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      <div>
        <motion.h4
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={`text-lg sm:text-xl font-semibold mb-4 ${t(isDarkMode, 'text-cyan-300', 'text-cyan-700')}`}
        >
          Herramientas y DevOps
        </motion.h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {skillsData.devtools.map((tool, index) => (
            <GlowCard key={index} isDarkMode={isDarkMode} delay={0.2 + index * 0.06} isInView={isInView}>
              <div className="p-4 text-center">
                <span className="text-2xl sm:text-3xl block mb-2" role="img" aria-label={`Icono de ${tool.name}`}>{tool.icon}</span>
                <p className={`text-xs sm:text-sm font-medium ${t(isDarkMode, 'text-slate-300', 'text-slate-700')}`}>{tool.name}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>

      <div>
        <motion.h4
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={`text-lg sm:text-xl font-semibold mb-4 ${t(isDarkMode, 'text-blue-300', 'text-purple-700')}`}
        >
          Bases de Datos
        </motion.h4>
        <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-2xl">
          {skillsData.databases.map((db, index) => (
            <GlowCard key={index} isDarkMode={isDarkMode} delay={0.3 + index * 0.1} isInView={isInView}>
              <div className="p-5 sm:p-6 text-center">
                <span className="text-3xl sm:text-4xl block mb-3" role="img" aria-label={`Icono de ${db.name}`}>{db.icon}</span>
                <p className={`text-base sm:text-lg font-semibold ${t(isDarkMode, 'text-white', 'text-slate-800')}`}>{db.name}</p>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </div>
  );
}
