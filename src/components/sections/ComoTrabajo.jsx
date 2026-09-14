import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { t } from '../../utils/theme';

export default function ComoTrabajo({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      id="como-trabajo"
      className="relative py-16 sm:py-24 px-4 sm:px-6"
      aria-labelledby="como-trabajo-heading"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`max-w-3xl mx-auto ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}
        >
          <h2 id="como-trabajo-heading" className="text-3xl font-serif mb-6 sm:mb-8">
            Cómo trabajo
          </h2>
          <div className="space-y-4 text-base sm:text-lg leading-relaxed">
            <p className="drop-cap">
              Vos conocés tu negocio. Yo conozco el software.
            </p>
            <p>
              Nadie conoce el problema mejor que quien lo vive. Por eso, antes de proponer nada,
              quiero que me cuentes cómo trabajás hoy.
            </p>
            <p>
              Escucho con atención para entender la necesidad real, y recién después pienso la
              solución. El objetivo siempre es el mismo: que el software te facilite la tarea, no
              que te agregue complejidad.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}