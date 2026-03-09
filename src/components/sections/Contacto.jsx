import React, { useState, useRef } from 'react';
import { Mail } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { t } from '../../utils/theme';

export default function Contacto({ isDarkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClass = `w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-colors ${t(isDarkMode,
    'bg-black/40 border-white/10 text-white placeholder:text-slate-500 focus:border-indigo-500/50',
    'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white'
  )}`;

  return (
    <div className="max-w-2xl mx-auto" role="region" aria-labelledby="contacto-heading" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-3 mb-6 sm:mb-8"
      >
        <Mail className={`w-7 h-7 sm:w-8 sm:h-8 ${t(isDarkMode, 'text-indigo-400', 'text-indigo-500')}`} aria-hidden="true" />
        <h3 id="contacto-heading" className="text-2xl sm:text-3xl font-bold">Contacto</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`relative backdrop-blur-sm rounded-2xl p-6 sm:p-8 border ${t(isDarkMode,
          'bg-white/[0.04] border-white/10',
          'bg-white border-slate-200 shadow-[0_4px_30px_rgba(99,102,241,0.08)]'
        )}`}
      >
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" aria-label="Formulario de contacto">
          <div>
            <label htmlFor="nombre" className={`block mb-2 font-medium text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-700')}`}>Nombre</label>
            <input
              id="nombre"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="Tu nombre"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="email" className={`block mb-2 font-medium text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-700')}`}>Email</label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
              placeholder="tu@email.com"
              aria-required="true"
            />
          </div>
          <div>
            <label htmlFor="mensaje" className={`block mb-2 font-medium text-sm sm:text-base ${t(isDarkMode, 'text-slate-300', 'text-slate-700')}`}>Mensaje</label>
            <textarea
              id="mensaje"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className={`${inputClass} resize-none`}
              placeholder="Cuéntame sobre tu oferta de empleo o proyecto..."
              aria-required="true"
            />
          </div>
          <motion.button
            type="submit"
            aria-label="Enviar mensaje de contacto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${t(isDarkMode,
              'focus:ring-offset-black hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]',
              'focus:ring-offset-white hover:shadow-[0_4px_20px_rgba(99,102,241,0.3)]'
            )}`}
          >
            Enviar Mensaje
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
