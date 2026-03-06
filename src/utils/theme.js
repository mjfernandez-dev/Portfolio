// Shorthand para clases condicionales dark/light
export const t = (isDarkMode, darkClass, lightClass) =>
  isDarkMode ? darkClass : lightClass;

const STATUS_STYLES = {
  Completado: {
    dark: 'bg-green-900/40 text-green-200 border border-green-700/50',
    light: 'bg-green-100/70 text-green-700 border border-green-300/50'
  },
  Publicado: {
    dark: 'bg-purple-900/40 text-purple-200 border border-purple-700/50',
    light: 'bg-purple-100/70 text-purple-700 border border-purple-300/50'
  },
  'En desarrollo': {
    dark: 'bg-yellow-900/40 text-yellow-200 border border-yellow-700/50',
    light: 'bg-yellow-100/70 text-yellow-700 border border-yellow-300/50'
  }
};

export const getStatusStyles = (status, isDarkMode) =>
  (STATUS_STYLES[status] ?? STATUS_STYLES['En desarrollo'])[isDarkMode ? 'dark' : 'light'];
