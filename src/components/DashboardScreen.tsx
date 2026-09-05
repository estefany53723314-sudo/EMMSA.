import React from 'react';
import { 
  Bell, 
  Calendar, 
  Check, 
  Clock, 
  FileText, 
  CalendarCheck, 
  Plus, 
  Sparkles, 
  ChevronRight,
  Pill,
  Award
} from 'lucide-react';
import { Medication, Appointment, UserProfile } from '../types';
import { ProjectCreditsBadge } from './ProjectCreditsBadge';

interface DashboardScreenProps {
  medications: Medication[];
  appointments: Appointment[];
  userProfile: UserProfile;
  onToggleDose: (medId: string, time: string) => void;
  onNavigate: (screen: 'inicio' | 'medicamentos' | 'agenda' | 'perfil') => void;
  onOpenAddMedication: () => void;
  onOpenCredits: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  medications,
  appointments,
  userProfile,
  onToggleDose,
  onNavigate,
  onOpenAddMedication,
  onOpenCredits,
}) => {
  // Calculate compliance percentage
  let totalDoses = 0;
  let takenDoses = 0;
  medications.forEach((med) => {
    med.scheduledTimes.forEach((time) => {
      totalDoses += 1;
      if (med.takenToday[time]) {
        takenDoses += 1;
      }
    });
  });

  const compliancePercent = totalDoses > 0 
    ? Math.round((takenDoses / totalDoses) * 100) 
    : 75;

  // Next upcoming appointment
  const nextAppointment = appointments[0] || {
    doctorName: 'Dr. Roberto Sánchez',
    dateStr: 'Mañana 10:00',
  };

  // SVGs for circular progress
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (compliancePercent / 100) * circumference;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      {/* Top Banner / Greeting bar matching Image 5 */}
      <div className="bg-gradient-to-r from-[#006b5d] via-[#45b39d] to-[#60dac5] rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle circular blur background elements */}
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/4" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-bold tracking-wide uppercase backdrop-blur-xs">
                Portal del Paciente
              </span>
              <span className="text-white/80 text-xs">
                {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              ¡Hola, {userProfile.name.split(' ')[0]}!
            </h2>
            <p className="text-white/90 text-sm mt-1 max-w-xl">
              Tienes medicamentos pendientes hoy. Mantén tu tratamiento al día para un óptimo bienestar.
            </p>
          </div>

          {/* Quick Profile & Notification Icons */}
          <div className="flex items-center gap-3 self-start sm:self-center">
            <button 
              onClick={onOpenCredits}
              className="px-3.5 py-2 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              title="Créditos escolares"
            >
              <Award className="w-4 h-4 text-[#7ef7e0]" />
              <span className="hidden sm:inline">Colegio José Elías Puyana</span>
            </button>

            <button 
              onClick={() => onNavigate('perfil')}
              className="w-11 h-11 rounded-2xl bg-white/20 hover:bg-white/30 border border-white/30 flex items-center justify-center transition-transform active:scale-95 text-white overflow-hidden p-0.5"
              title="Ver Perfil"
            >
              <img
                src={userProfile.avatarUrl || '/patient_avatar.jpg'}
                alt={userProfile.name}
                className="w-full h-full rounded-xl object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80';
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Device Central View & Right Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Central Core: Next Appointment, Progress Ring, and Daily Medication List (Col 8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Next Appointment Card (Image 5) */}
          <div 
            onClick={() => onNavigate('agenda')}
            className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md border border-gray-100 flex items-center justify-between transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#7ef7e0]/20 text-[#006b5d] flex items-center justify-center group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Siguiente Cita
                </p>
                <h4 className="text-base sm:text-lg font-bold text-[#003758]">
                  {nextAppointment.dateStr} • {nextAppointment.doctorName}
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[#006b5d] font-semibold text-xs">
              <span className="hidden sm:inline">Ver Agenda</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Compliance Card with Circular Ring (Image 5) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-around gap-6">
            <div className="relative w-40 h-40 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {/* Background circle track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#eef1f3"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Dual/Navy track for remaining */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#1b4e74"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={circumference * 0.75}
                  strokeLinecap="round"
                  className="opacity-30"
                />
                {/* Teal progress track */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="#45b39d"
                  strokeWidth="12"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-gray-900 tracking-tight">
                  {compliancePercent}%
                </span>
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Cumplimiento
                </span>
              </div>
            </div>

            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-lg font-bold text-[#003758]">Estado de Tomas de Hoy</h3>
              <p className="text-xs text-gray-600 max-w-sm">
                Has registrado <strong className="text-[#006b5d]">{takenDoses} de {totalDoses} dosis</strong> programadas para el día de hoy.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <button
                  onClick={onOpenAddMedication}
                  className="px-4 py-2 bg-[#006b5d] hover:bg-[#005046] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Agregar Medicamento</span>
                </button>
                <button
                  onClick={() => onNavigate('medicamentos')}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-semibold transition-colors"
                >
                  Ver Todos
                </button>
              </div>
            </div>
          </div>

          {/* Medication Interactive Checklist (Image 5 & Image 3) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#003758] flex items-center gap-2">
                <Pill className="w-5 h-5 text-[#006b5d]" />
                <span>Tomas Pendientes y Registradas</span>
              </h3>
              <span className="text-xs text-gray-500">Toca el check para marcar toma</span>
            </div>

            <div className="space-y-3">
              {medications.map((med) => {
                // Show items for each scheduled time
                return med.scheduledTimes.map((time) => {
                  const isTaken = !!med.takenToday[time];
                  return (
                    <div
                      key={`${med.id}-${time}`}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                        isTaken
                          ? 'bg-[#f0f9f8] border-[#7ef7e0]/60'
                          : 'bg-white border-gray-100 hover:border-gray-200 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                            isTaken
                              ? 'bg-[#7ef7e0] text-[#006b5d]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          <Pill className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`text-sm font-bold ${isTaken ? 'text-gray-800 line-through' : 'text-gray-900'}`}>
                              {med.name}
                            </h4>
                            <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                              {time}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {med.dosage} • {med.form}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => onToggleDose(med.id, time)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          isTaken
                            ? 'bg-[#45b39d] text-white shadow-xs'
                            : 'bg-gray-100 hover:bg-[#7ef7e0]/30 text-gray-700 hover:text-[#006b5d]'
                        }`}
                        title={isTaken ? 'Desmarcar toma' : 'Registrar toma'}
                      >
                        <Check className={`w-4 h-4 ${isTaken ? 'stroke-[3]' : ''}`} />
                        <span>{isTaken ? 'Tomada' : 'Registrar'}</span>
                      </button>
                    </div>
                  );
                });
              })}
            </div>
          </div>
        </div>

        {/* Right Column / Widgets from Image 5 (Col 4) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Institutional Credits Badge (Prominently displaying the requested authors and school!) */}
          <ProjectCreditsBadge />

          {/* Quick Metrics from Image 5 */}
          <div className="space-y-4">
            {/* Total Exito Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center border border-gray-200">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500">Adherencia al Tratamiento</p>
                <p className="text-base font-bold text-gray-900">Total Éxito: 94.2%</p>
              </div>
            </div>

            {/* Citas & Informes Grid from Image 5 */}
            <div className="grid grid-cols-2 gap-4">
              {/* Citas Stat */}
              <div 
                onClick={() => onNavigate('agenda')}
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:border-[#7ef7e0] transition-colors cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#7ef7e0]/20 text-[#006b5d] flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-5 h-5" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900">{appointments.length}</p>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">Citas</p>
              </div>

              {/* Informes Stat */}
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:border-blue-300 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1b4e74] flex items-center justify-center mx-auto mb-2 border border-blue-100">
                  <FileText className="w-5 h-5" />
                </div>
                <p className="text-3xl font-extrabold text-gray-900">32</p>
                <p className="text-xs font-semibold text-gray-500 mt-0.5">Informes</p>
              </div>
            </div>
          </div>

          {/* Quick Emergency Notice */}
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Recordatorios Automáticos
            </p>
            <p className="text-amber-700 text-[11px] leading-relaxed">
              Las notificaciones se sincronizan con los horarios configurados en cada prescripción médica.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
