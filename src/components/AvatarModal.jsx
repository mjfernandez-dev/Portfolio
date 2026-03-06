import React from 'react';
import { X } from 'lucide-react';

export default function AvatarModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="avatar-modal-title"
    >
      <div className="relative max-w-2xl w-full">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg p-2"
          aria-label="Cerrar imagen de perfil"
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src="/images/avatar.png"
          alt="Matías Fernández - Desarrollador Full Stack"
          className="w-full h-auto rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
        <p id="avatar-modal-title" className="text-white text-center mt-4 text-lg font-medium">
          Matías Fernández - Desarrollador Full Stack
        </p>
      </div>
    </div>
  );
}
