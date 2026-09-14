import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { services } from '../../data/services';
import { t } from '../../utils/theme';

const pad = (n) => String(n).padStart(2, '0');

export default function Sistemas({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      id="proyectos"
      className="relative py-16 sm:py-24 px-4 sm:px-6"
      aria-labelledby="sistemas-heading"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 id="sistemas-heading" className="text-3xl font-serif mb-3">
            Sistemas
          </h2>
          <p className={`mb-10 sm:mb-12 text-base sm:text-lg ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}>
            El abanico de posibilidades es inmenso. Estos son algunos de los caminos posibles.
          </p>
        </motion.div>

        <ol className={t(isDarkMode, 'divide-y divide-white/10', 'divide-y divide-ink/10')}>
          {services.map((service, index) => (
            <motion.li
              key={service.title}
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
                <h3 className="text-xl sm:text-2xl font-serif mb-2">{service.title}</h3>
                <p className={`text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}>
                  {service.oneLiner}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}