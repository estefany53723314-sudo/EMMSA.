import React from 'react';
import { X, GraduationCap, School, Users, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { INSTITUTIONAL_CREDITS } from '../types';

interface CreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreditsModal: React.FC<CreditsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-teal-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Banner with Medical Blue & Mint Gradient */}
        <div className="bg-gradient-to-r from-[#003758] via-[#145680] to-[#006b5d] p-6 text-white relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-[#7ef7e0]/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-[#7ef7e0] border border-white/10">
              <School className="w-3.5 h-3.5" />
              <span>Proyecto Académico & Tecnológico</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-xl md:text-2xl font-black text-white leading-snug">
            {INSTITUTIONAL_CREDITS.colegio}
          </h3>
          <p className="text-xs text-[#cee5ff] mt-1">
            EMMSA • Plataforma Integral de Recordatorio de Medicamentos
          </p>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5">
          {/* Autores destacados */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#006b5d] mb-3">
              <Users className="w-4 h-4" />
              <span>Estudiantes y Desarrolladoras del Proyecto</span>
            </div>

            <div className="space-y-2.5">
              {INSTITUTIONAL_CREDITS.autores.map((nombre, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#f7fafc] border border-gray-200/80 hover:border-[#60dac5] transition-all group shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1b4e74] to-[#45b39d] flex items-center justify-center text-white font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
                      {nombre.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm">{nombre}</h4>
                      <p className="text-xs text-gray-500">Diseño UI/UX & Desarrollo de Software</p>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-[#7ef7e0]/30 flex items-center justify-center text-[#006b5d]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Note */}
          <div className="bg-[#f0f9f8] border border-[#7ef7e0]/40 rounded-2xl p-4 text-xs text-gray-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-[#006b5d]">
              <Sparkles className="w-4 h-4" />
              <span>Propósito del Sistema</span>
            </div>
            <p className="leading-relaxed">
              Esta aplicación fue conceptualizada para ayudar a pacientes de todas las edades a no olvidar sus dosis médicas, reduciendo riesgos en tratamientos crónicos y mejorando la calidad de vida a través de una interfaz clara en tonos azul, blanco y verde agua.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] text-gray-500 font-medium">
            Colegio Técnico Industrial José Elías Puyana
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#003758] hover:bg-[#1b4e74] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};
