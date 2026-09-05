import React from 'react';
import { Phone, AlertTriangle, X, ShieldAlert, HeartPulse } from 'lucide-react';
import { EmergencyContact } from '../types';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact[];
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  contacts,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-red-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-red-50 p-5 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">Contactos de Emergencia</h3>
              <p className="text-xs text-red-600 font-medium">Asistencia médica inmediata</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-red-100/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="bg-red-600 text-white rounded-xl p-4 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <HeartPulse className="w-6 h-6 animate-pulse" />
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-90">Línea de Emergencias</p>
                <p className="text-2xl font-black">123 / 911</p>
              </div>
            </div>
            <a
              href="tel:911"
              className="px-4 py-2 bg-white text-red-600 rounded-lg font-bold text-sm hover:bg-red-50 active:scale-95 transition-all shadow"
            >
              Llamar
            </a>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">
              Contactos Familiares Registrados
            </h4>
            <div className="space-y-2.5">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="flex items-center justify-between p-3.5 bg-gray-50 hover:bg-gray-100/80 rounded-xl border border-gray-200/70 transition-colors"
                >
                  <div>
                    <h5 className="font-semibold text-gray-900 text-sm">{contact.name}</h5>
                    <p className="text-xs text-[#006b5d] font-medium">{contact.relationship}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{contact.phone}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-2.5 bg-[#006b5d] hover:bg-[#005046] text-white rounded-full shadow-sm hover:shadow transition-all active:scale-95"
                    title={`Llamar a ${contact.name}`}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 text-xs text-amber-800">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p>
              Si experimenta dolor en el pecho, dificultad respiratoria severa o pérdida de conocimiento, comuníquese inmediatamente con el centro asistencial más cercano.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
