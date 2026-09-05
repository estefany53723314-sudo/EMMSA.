import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Syringe, 
  Pill, 
  Bell, 
  Plus, 
  X, 
  Clock,
  Check
} from 'lucide-react';
import { Medication } from '../types';

interface AddMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medication: Medication) => void;
}

export const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [form, setForm] = useState('Cápsula / Pastilla');
  const [frequency, setFrequency] = useState('Cada 8 horas');
  const [durationNumber, setDurationNumber] = useState(7);
  const [durationUnit, setDurationUnit] = useState<'dias' | 'semanas' | 'continuo'>('dias');
  const [scheduledTimes, setScheduledTimes] = useState<string[]>(['08:00', '16:00', '00:00']);
  const [newTimeInput, setNewTimeInput] = useState('');
  const [isAddingTime, setIsAddingTime] = useState(false);
  const [instructions, setInstructions] = useState('');

  if (!isOpen) return null;

  // Recalculate scheduled times automatically when frequency changes
  const handleFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFrequency(val);
    if (val === 'Cada 8 horas') {
      setScheduledTimes(['08:00', '16:00', '00:00']);
    } else if (val === 'Cada 12 horas') {
      setScheduledTimes(['08:00', '20:00']);
    } else if (val === 'Una vez al día') {
      setScheduledTimes(['08:00']);
    } else if (val === 'Cada 6 horas') {
      setScheduledTimes(['06:00', '12:00', '18:00', '00:00']);
    }
  };

  const handleAddTime = () => {
    if (newTimeInput && !scheduledTimes.includes(newTimeInput)) {
      setScheduledTimes([...scheduledTimes, newTimeInput].sort());
      setNewTimeInput('');
      setIsAddingTime(false);
    }
  };

  const handleRemoveTime = (timeToRemove: string) => {
    if (scheduledTimes.length > 1) {
      setScheduledTimes(scheduledTimes.filter((t) => t !== timeToRemove));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !dosage.trim()) return;

    // Determine primary time of day category
    let category: 'mañana' | 'tarde' | 'noche' = 'mañana';
    if (scheduledTimes.length > 0) {
      const hour = parseInt(scheduledTimes[0].split(':')[0], 10);
      if (hour >= 12 && hour < 19) category = 'tarde';
      else if (hour >= 19 || hour < 6) category = 'noche';
    }

    const takenTodayObj: { [time: string]: boolean } = {};
    scheduledTimes.forEach((t) => {
      takenTodayObj[t] = false;
    });

    const newMed: Medication = {
      id: `med-${Date.now()}`,
      name: name.trim(),
      dosage: dosage.trim(),
      form,
      frequency,
      durationNumber: Number(durationNumber) || 7,
      durationUnit,
      scheduledTimes,
      takenToday: takenTodayObj,
      instructions: instructions.trim() || undefined,
      timeCategory: category,
    };

    onSave(newMed);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden border border-gray-100 my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Page Header */}
        <div className="p-6 md:p-8 border-b border-gray-100 bg-[#f7fafc] flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="p-2.5 rounded-full hover:bg-gray-200/70 transition-colors text-gray-600"
            title="Volver"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-[#003758]">Agregar Medicamento</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Ingrese los detalles de la nueva prescripción para configurar sus recordatorios.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
          {/* Basic Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Medication Name */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Nombre del Medicamento
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Pill className="w-5 h-5 text-[#006b5d]" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej: Amoxicilina"
                  className="w-full pl-11 pr-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
                />
              </div>
            </div>

            {/* Dosage */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Dosis
              </label>
              <input
                type="text"
                required
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
                placeholder="Ej: 500mg, 1 pastilla"
                className="w-full px-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
              />
            </div>

            {/* Pharmaceutical Form */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Forma Farmacéutica
              </label>
              <select
                value={form}
                onChange={(e) => setForm(e.target.value)}
                className="w-full px-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
              >
                <option value="Cápsula / Pastilla">Cápsula / Pastilla</option>
                <option value="Líquido / Jarabe">Líquido / Jarabe</option>
                <option value="Inyección">Inyección</option>
                <option value="Gotas">Gotas</option>
                <option value="Inhalador">Inhalador</option>
                <option value="Pomada / Crema">Pomada / Crema</option>
              </select>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Schedule Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#003758]">Esquema y Recordatorios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Frequency */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Frecuencia
                </label>
                <select
                  value={frequency}
                  onChange={handleFrequencyChange}
                  className="w-full px-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
                >
                  <option value="Cada 8 horas">Cada 8 horas</option>
                  <option value="Cada 12 horas">Cada 12 horas</option>
                  <option value="Una vez al día">Una vez al día</option>
                  <option value="Cada 6 horas">Cada 6 horas</option>
                  <option value="Personalizado">Personalizado...</option>
                </select>
              </div>

              {/* Duration */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-700 block">
                  Duración
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="1"
                    value={durationNumber}
                    onChange={(e) => setDurationNumber(parseInt(e.target.value) || 1)}
                    className="w-24 px-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
                  />
                  <select
                    value={durationUnit}
                    onChange={(e) => setDurationUnit(e.target.value as any)}
                    className="flex-1 px-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
                  >
                    <option value="dias">Días</option>
                    <option value="semanas">Semanas</option>
                    <option value="continuo">Continuo</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Time Picker Visuals matching image 1 */}
            <div className="p-4 bg-[#f1f4f6] rounded-xl border border-gray-200/60 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-[#006b5d]" />
                  <span>Horarios Calculados (Ajustables)</span>
                </p>
                <span className="text-[11px] text-gray-500">
                  {scheduledTimes.length} recordatorios programados
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                {scheduledTimes.map((time) => (
                  <div
                    key={time}
                    className="group flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 hover:border-[#006b5d] transition-colors shadow-2xs"
                  >
                    <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#006b5d]" />
                    <span className="text-sm font-bold text-[#003758]">{time}</span>
                    {scheduledTimes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTime(time)}
                        className="text-gray-400 hover:text-red-500 ml-1 p-0.5 rounded-full hover:bg-gray-100"
                        title="Eliminar este horario"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}

                {isAddingTime ? (
                  <div className="flex items-center gap-1.5 bg-white p-1 rounded-full border border-[#006b5d] shadow-xs">
                    <input
                      type="time"
                      value={newTimeInput}
                      onChange={(e) => setNewTimeInput(e.target.value)}
                      className="px-2 py-1 text-xs outline-none text-gray-800"
                    />
                    <button
                      type="button"
                      onClick={handleAddTime}
                      className="p-1 bg-[#006b5d] text-white rounded-full hover:bg-[#005046]"
                    >
                      <Check className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAddingTime(false)}
                      className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsAddingTime(true)}
                    className="flex items-center gap-1 text-[#006b5d] hover:text-[#005046] text-xs font-semibold px-3 py-2 hover:bg-[#7ef7e0]/20 rounded-full transition-colors border border-dashed border-[#006b5d]/40"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agregar hora</span>
                  </button>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-700 block">
                Indicaciones médicas adicionales (opcional)
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Ej: Tomar con alimentos, no suspender el tratamiento antes de 7 días."
                className="w-full px-4 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm text-gray-900 focus:bg-white focus:border-[#006b5d] focus:ring-2 focus:ring-[#7ef7e0]/50 outline-none transition-all"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-5 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-full border border-gray-300 text-gray-700 font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#006b5d] hover:bg-[#005046] text-white font-semibold text-sm shadow-md active:scale-95 transition-all"
            >
              Guardar Medicamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
