import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import WhatsAppIcon from '../WhatsAppIcon';
import { motion } from 'motion/react';
import { t } from '../../utils/theme';

const SOCIAL_LINKS = [
  { href: 'https://github.com/mjfernandez-dev', label: 'Visitar mi perfil de GitHub (se abre en nueva ventana)', Icon: Github },
  { href: 'https://www.linkedin.com/in/matias-fernandez-/', label: 'Visitar mi perfil de LinkedIn (se abre en nueva ventana)', Icon: Linkedin },
  { href: 'mailto:mjfernandez.dev@gmail.com', label: 'Enviar un correo electrónico a mjfernandez.dev@gmail.com', Icon: Mail }
];

const iconClass = (isDarkMode) =>
  `p-2.5 sm:p-3 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 ${t(isDarkMode,
    'bg-white/5 hover:bg-white/10 border-white/10 hover:border-accent/50 focus:ring-offset-black text-slate-200 hover:text-white',
    'bg-white hover:bg-indigo-50 border-slate-200 hover:border-accent/50 focus:ring-offset-white text-slate-600 hover:text-accent'
  )}`;

export default function Hero({ isDarkMode }) {
  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6" aria-label="Presentación">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-6 sm:space-y-8">

          {/* Thesis tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-serif font-light max-w-4xl mx-auto px-2"
          >
            El software se debe adaptar a las personas y no al revés.
          </motion.h1>

          {/* Name */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
            className="text-2xl sm:text-3xl font-serif"
          >
            Matías Fernández
          </motion.h2>

          {/* One-liner */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            className={`text-base sm:text-lg max-w-2xl mx-auto px-4 ${t(isDarkMode, 'text-slate-300', 'text-slate-500')}`}
          >
            Desarrollos de software, IA y automatizaciones para personas y empresas que desean optimizar sus tiempos de trabajo.
          </motion.p>

          {/* Avatar photo */}
          <motion.img
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.3 }}
            src="/images/avatar.png"
            alt="Foto de Matías Fernández"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover mx-auto"
          />

          {/* Social links + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.4 }}
            className="flex gap-3 sm:gap-4 justify-center items-center"
            role="list"
          >
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                aria-label={label}
                className={iconClass(isDarkMode)}
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </a>
            ))}
            <a
              href="https://wa.me/5493385681007"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Escribirme por WhatsApp (se abre en nueva ventana)"
              className={iconClass(isDarkMode)}
            >
              <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6" ariaHidden />
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}