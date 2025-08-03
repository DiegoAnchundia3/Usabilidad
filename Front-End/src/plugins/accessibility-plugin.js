// Plugin de Tailwind CSS para funciones de accesibilidad
const plugin = require('tailwindcss/plugin');

const accessibilityPlugin = plugin(function ({
  addUtilities,
  addComponents,
  theme,
}) {
  // Utilidades para tamaños de fuente dinámicos
  addUtilities({
    '.text-accessibility': {
      fontSize: 'var(--accessibility-font-size)',
      lineHeight: 'var(--accessibility-line-height)',
      letterSpacing: 'var(--accessibility-letter-spacing)',
    },
    '.saturate-accessibility': {
      filter: 'saturate(var(--accessibility-saturation))',
    },
  });

  // Componentes para elementos de accesibilidad
  addComponents({
    '.accessibility-button': {
      '@apply fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-200':
        {},
      '@screen md': {
        '@apply top-4 right-4': {},
      },
      '@screen sm': {
        '@apply bottom-5 right-5 top-auto': {},
      },
    },
    '.accessibility-modal': {
      '@apply fixed inset-0 z-50 flex items-center justify-center': {},
    },
    '.accessibility-overlay': {
      '@apply absolute inset-0 bg-black/50 backdrop-blur-sm': {},
    },
    '.accessibility-panel': {
      '@apply relative bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto':
        {},
    },
    '.accessibility-header': {
      '@apply flex items-center justify-between p-6 border-b border-gray-200':
        {},
    },
    '.accessibility-title': {
      '@apply text-2xl font-bold text-gray-900 flex items-center gap-3': {},
    },
    '.accessibility-close': {
      '@apply p-2 hover:bg-gray-100 rounded-lg transition-colors': {},
    },
    '.accessibility-content': {
      '@apply p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6': {},
    },
    '.accessibility-section': {
      '@apply bg-gray-50 p-4 rounded-lg': {},
    },
    '.accessibility-section-title': {
      '@apply font-semibold text-gray-900 mb-3 flex items-center gap-2': {},
    },
    '.accessibility-control': {
      '@apply flex items-center gap-2': {},
    },
    '.accessibility-button-control': {
      '@apply p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors':
        {},
    },
    '.accessibility-value': {
      '@apply font-medium text-gray-700 min-w-[50px] text-center': {},
    },
    '.accessibility-checkbox': {
      '@apply rounded': {},
    },
    '.accessibility-radio': {
      '@apply mr-2': {},
    },
    '.accessibility-label': {
      '@apply flex items-center gap-2': {},
    },
    '.accessibility-footer': {
      '@apply border-t border-gray-200 p-6': {},
    },
    '.accessibility-reset': {
      '@apply w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2':
        {},
    },
  });
});

module.exports = accessibilityPlugin;
