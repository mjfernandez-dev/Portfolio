import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { t } from '../../utils/theme';

export default function Contacto({ isDarkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('¡Gracias por tu mensaje! Te contactaré pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const inputClass = `w-full border rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors ${t(isDarkMode,
    'bg-slate-900/50 border-blue-900/50 text-white placeholder:text-slate-400',
    'bg-white border-blue-300/50 text-slate-900 placeholder:text-slate-500'
  )}`;

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn" role="region" aria-labelledby="contacto-heading">
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" aria-hidden="true" />
        <h3 id="contacto-heading" className="text-2xl sm:text-3xl font-bold">Contacto</h3>
      </div>
      <div className={`${t(isDarkMode, 'bg-slate-800/40 border-blue-900/30', 'bg-white/80 border-slate-300/50')} backdrop-blur-sm rounded-2xl p-6 sm:p-8 border`}>
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" aria-label="Formulario de contacto">
          <div>
            <label htmlFor="nombre" className={`block mb-2 font-medium text-sm sm:text-base ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>Nombre</label>
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
            <label htmlFor="email" className={`block mb-2 font-medium text-sm sm:text-base ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>Email</label>
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
            <label htmlFor="mensaje" className={`block mb-2 font-medium text-sm sm:text-base ${t(isDarkMode, 'text-slate-200', 'text-slate-700')}`}>Mensaje</label>
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
          <button
            type="submit"
            aria-label="Enviar mensaje de contacto"
            className={`w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${t(isDarkMode, 'focus:ring-offset-slate-800', 'focus:ring-offset-slate-100')}`}
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
}
