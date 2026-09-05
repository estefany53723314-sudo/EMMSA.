import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Appointment, HealthMetric } from '../types';

interface AgendaScreenProps {
  appointments: Appointment[];
  healthMetrics: HealthMetric[];
  onOpenAddAppointment: () => void;
}

export const AgendaScreen: React.FC<AgendaScreenProps> = ({
  appointments,
  healthMetrics,
  onOpenAddAppointment,
}) => {
  // Calendar interactive state: default to current month and year
  const today = new Date();
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysOfWeek = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  // Days in month calculation
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayIndex = (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; // Monday as 0

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Find appointments for selected day
  const appointmentsOnSelectedDay = appointments.filter(
    (apt) => apt.dayNumber === selectedDay && apt.month === currentMonth
  );

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      {/* Header matching mockup */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#003758] tracking-tight">
            Agenda Médica
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona tus consultas, exámenes y horarios médicos.
          </p>
        </div>

        <button
          onClick={onOpenAddAppointment}
          className="flex items-center justify-center gap-2 bg-[#006b5d] hover:bg-[#005046] text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-md active:scale-95 transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Nueva Cita</span>
        </button>
      </div>

      {/* Main Grid: Calendar (Left) & Upcoming Appointments (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Calendar Card (Col 7) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-5">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="text-xl font-bold text-[#003758]">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
                title="Mes anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition-colors"
                title="Mes siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {daysOfWeek.map((day) => (
              <span key={day} className="text-xs font-semibold text-gray-400 py-1">
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {/* Empty slots for month start offset */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-12" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const hasApt = appointments.some(
                (a) => a.dayNumber === day && a.month === currentMonth
              );
              const isSelected = selectedDay === day;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`h-12 rounded-2xl flex flex-col items-center justify-center text-sm font-semibold relative transition-all ${
                    isSelected
                      ? 'bg-[#003758] text-white shadow-md'
                      : hasApt
                      ? 'bg-[#7ef7e0]/25 text-[#006b5d] hover:bg-[#7ef7e0]/40'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{day}</span>
                  {hasApt && (
                    <span
                      className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                        isSelected ? 'bg-[#7ef7e0]' : 'bg-[#006b5d]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick filter note for selected day */}
          {selectedDay && (
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-medium">
                Día seleccionado: <strong>{selectedDay} de {monthNames[currentMonth]}</strong>
              </span>
              {appointmentsOnSelectedDay.length > 0 ? (
                <span className="text-[#006b5d] font-bold">
                  {appointmentsOnSelectedDay.length} cita(s) programada(s)
                </span>
              ) : (
                <span className="text-gray-400">Sin citas este día</span>
              )}
            </div>
          )}
        </div>

        {/* Appointments Column matching Image 11 (Col 5) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#003758]">Próximas Citas</h3>
            <span className="text-xs font-semibold text-gray-500">
              {appointments.length} en total
            </span>
          </div>

          <div className="space-y-3">
            {appointments.map((apt) => {
              const isConfirmed = apt.status === 'Confirmada';
              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    {apt.avatarUrl ? (
                      <img
                        src={apt.avatarUrl}
                        alt={apt.doctorName}
                        className="w-11 h-11 rounded-2xl object-cover border border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#1b4e74] flex items-center justify-center font-bold text-sm border border-blue-100 shrink-0">
                        <Activity className="w-5 h-5 text-[#006b5d]" />
                      </div>
                    )}

                    <div>
                      <h4 className="text-sm font-bold text-gray-900">{apt.doctorName}</h4>
                      <p className="text-xs font-semibold text-[#006b5d]">{apt.specialty}</p>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{apt.dateStr}</span>
                      </div>
                      {apt.center && (
                        <div className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{apt.center}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide shrink-0 ${
                      isConfirmed
                        ? 'bg-[#7ef7e0]/30 text-[#006b5d]'
                        : 'bg-amber-100/80 text-amber-800'
                    }`}
                  >
                    {apt.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Health Tracking Bar Chart matching Image 11 ("Seguimiento de Salud") */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#006b5d]" />
              <h3 className="text-xl font-bold text-[#003758]">Seguimiento de Salud</h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Comparativa semestral de Peso corporal (kg) y Presión arterial media
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#1b4e74]" />
              <span className="text-gray-700">Peso (kg)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#45b39d]" />
              <span className="text-gray-700">Presión (sist.)</span>
            </div>
          </div>
        </div>

        {/* Custom Responsive SVG / HTML Bar Chart */}
        <div className="pt-4">
          <div className="h-60 flex items-end justify-between gap-3 sm:gap-6 border-b border-gray-100 pb-3">
            {healthMetrics.map((item, index) => {
              const maxVal = 70;
              const pesoHeight = `${(item.peso / maxVal) * 100}%`;
              const presionHeight = `${(item.presion / maxVal) * 100}%`;

              return (
                <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-[10px] rounded-md px-2 py-1 mb-2 whitespace-nowrap pointer-events-none shadow-md">
                    Peso: {item.peso}kg | Presión: {item.presion}
                  </div>

                  <div className="w-full flex items-end justify-center gap-1.5 sm:gap-2 h-full">
                    {/* Dark Blue Bar (Peso) */}
                    <div
                      style={{ height: pesoHeight }}
                      className="w-3 sm:w-6 bg-[#1b4e74] hover:bg-[#145680] rounded-t-lg transition-all duration-500 ease-out"
                      title={`Peso: ${item.peso} kg`}
                    />
                    {/* Mint Teal Bar (Presión) */}
                    <div
                      style={{ height: presionHeight }}
                      className="w-3 sm:w-6 bg-[#45b39d] hover:bg-[#60dac5] rounded-t-lg transition-all duration-500 ease-out"
                      title={`Presión: ${item.presion}`}
                    />
                  </div>

                  <span className="text-xs font-medium text-gray-500 mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
