import React, { useState } from 'react';
import { X, Calendar, Clock, User, Building, Check } from 'lucide-react';
import { Appointment } from '../types';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (appointment: Appointment) => void;
}

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [doctorName, setDoctorName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [center, setCenter] = useState('Hospital Central EMMSA');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorName.trim() || !specialty.trim() || !date) return;

    const dateObj = new Date(date + 'T00:00:00');
    const dayNumber = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();

    // Format readable date string
    const daysWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayName = daysWeek[dateObj.getDay()];
    const dateStr = `${dayName} ${dayNumber}, ${time}`;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName: doctorName.trim(),
      specialty: specialty.trim(),
      dateStr,
      dayNumber,
      month,
      year,
      timeStr: time,
      status: 'Confirmada',
      center: center.trim(),
      avatarUrl: `https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80`,
    };

    onSave(newAppointment);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#f7fafc] p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7ef7e0]/30 flex items-center justify-center text-[#006b5d]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-[#003758] text-lg">Agendar Nueva Cita</h3>
              <p className="text-xs text-gray-500">Programa tu próxima consulta médica</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Médico o Especialista</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Ej. Dr. Roberto Sánchez"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#006b5d] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Especialidad</label>
            <input
              type="text"
              required
              placeholder="Ej. Cardiología, Medicina General..."
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#006b5d] focus:bg-white outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Fecha</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#006b5d] focus:bg-white outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-700">Hora</label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#006b5d] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Centro Médico / Clínica</label>
            <div className="relative">
              <Building className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                placeholder="Centro Médico o Consultorio"
                className="w-full pl-9 pr-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#006b5d] focus:bg-white outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#006b5d] hover:bg-[#005046] text-white text-sm font-semibold shadow-sm active:scale-95 transition-all"
            >
              Agendar Cita
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
