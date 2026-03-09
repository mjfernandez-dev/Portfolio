import React, { useRef } from 'react';
import { Briefcase } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { projects } from '../../data/projects';
import ProjectCard from '../ProjectCard';
import { t } from '../../utils/theme';

export default function Proyectos({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div className="space-y-4 sm:space-y-6" role="region" aria-labelledby="proyectos-heading" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6 sm:mb-8"
      >
        <Briefcase className={`w-7 h-7 sm:w-8 sm:h-8 ${isDarkMode ? 'text-indigo-400' : 'text-blue-400'}`} aria-hidden="true" />
        <h3 id="proyectos-heading" className="text-2xl sm:text-3xl font-bold">Proyectos</h3>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" role="list">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
          >
            <ProjectCard project={project} isDarkMode={isDarkMode} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
        className={`${t(isDarkMode,
          'bg-indigo-900/10 border-indigo-700/30',
          'bg-slate-200/60 border-slate-300/50'
        )} backdrop-blur-sm rounded-xl p-4 sm:p-6 border mt-6 sm:mt-8`}
        role="note"
        aria-label="Nota sobre los proyectos"
      >
        <p className={`text-center text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-700')}`}>
          💡 <strong>Nota:</strong> Estos proyectos están siendo consolidados en mi perfil de GitHub.
          Los enlaces se actualizarán próximamente con los repositorios completos.
        </p>
      </motion.div>
    </div>
  );
}
