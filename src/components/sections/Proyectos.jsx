import React, { useRef } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { projects } from '../../data/projects';
import { t, getStatusStyles } from '../../utils/theme';

const pad = (n) => String(n).padStart(2, '0');

export default function Proyectos({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const linkClass = `inline-flex items-center gap-1.5 text-sm sm:text-base transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded ${t(isDarkMode,
    'text-blue-300 hover:text-blue-200 focus:ring-offset-black',
    'text-accent hover:text-blue-700 focus:ring-offset-white'
  )}`;

  return (
    <section
      id="proyectos"
      className="relative py-16 sm:py-24 px-4 sm:px-6"
      aria-labelledby="proyectos-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          id="proyectos-heading"
          className="text-3xl font-serif mb-10 sm:mb-4"
        >
          Sistemas
        </motion.h2>

        <ol className={t(isDarkMode, 'divide-y divide-white/10', 'divide-y divide-ink/10')}>
          {projects.map((project, index) => (
            <motion.li
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 + index * 0.06 }}
              className="grid grid-cols-[3.5rem_1fr] sm:grid-cols-[5rem_1fr] gap-x-4 sm:gap-x-8 py-10 sm:py-12"
            >
              <span
                aria-hidden="true"
                className={`font-serif text-2xl sm:text-3xl tabular-nums ${t(isDarkMode, 'text-blue-300/70', 'text-accent/70')}`}
              >
                {pad(index + 1)}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-xl sm:text-2xl font-serif">{project.title}</h3>
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs border ${getStatusStyles(project.status, isDarkMode)}`}
                    aria-label={`Estado del proyecto: ${project.status}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className={`mb-3 text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}>
                  {project.oneLiner ?? project.description}
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {project.github && project.github !== '#' && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${project.title} en GitHub (se abre en nueva ventana)`}
                      className={linkClass}
                    >
                      <Github className="w-4 h-4" aria-hidden="true" />
                      GitHub
                    </a>
                  )}
                  {project.nuget && (
                    <a
                      href={project.nuget}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver ${project.title} en NuGet (se abre en nueva ventana)`}
                      className={linkClass}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      NuGet
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Ver demo de ${project.title} (se abre en nueva ventana)`}
                      className={linkClass}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}