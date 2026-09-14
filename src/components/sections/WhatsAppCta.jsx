import React, { useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { t } from '../../utils/theme';

export default function WhatsAppCta({ isDarkMode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section
      id="contacto"
      className="relative py-16 sm:py-24 px-4 sm:px-6"
      aria-labelledby="contacto-heading"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <h2 id="contacto-heading" className="text-3xl font-serif mb-4">
            Escribime
          </h2>
          <p className={`mb-8 text-base sm:text-lg ${t(isDarkMode, 'text-slate-300', 'text-slate-600')}`}>
            Te contesto yo. No hay formulario ni vendedor.
          </p>
          <a
            href="https://wa.me/5493385681007"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Escribirme por WhatsApp (se abre en nueva ventana)"
            className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-6 sm:px-8 rounded-full bg-accent text-white font-medium text-sm sm:text-base transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-black', 'focus:ring-offset-white')}`}
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            Escribime por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}