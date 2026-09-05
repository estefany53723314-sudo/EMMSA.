import React, { useState } from 'react';
import { 
  Plus, 
  Pill, 
  Clock, 
  Check, 
  Filter, 
  Search, 
  Calendar,
  AlertCircle,
  Trash2,
  CheckCircle
} from 'lucide-react';
import { Medication } from '../types';

interface MedicationsScreenProps {
  medications: Medication[];
  onToggleDose: (medId: string, time: string) => void;
  onOpenAddMedication: () => void;
  onDeleteMedication: (id: string) => void;
}

export const MedicationsScreen: React.FC<MedicationsScreenProps> = ({
  medications,
  onToggleDose,
  onOpenAddMedication,
  onDeleteMedication,
}) => {
  const [activeTab, setActiveTab] = useState<'todos' | 'mañana' | 'tarde' | 'noche'>('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const filterTabs = [
    { id: 'todos', label: 'Todos' },
    { id: 'mañana', label: 'Mañana' },
    { id: 'tarde', label: 'Tarde' },
    { id: 'noche', label: 'Noche' },
  ] as const;

  const filteredMeds = medications.filter((med) => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.dosage.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'todos') return matchesSearch;
    return matchesSearch && med.timeCategory === activeTab;
  });

  const handleRegisterDose = (med: Medication, time: string) => {
    onToggleDose(med.id, time);
    const isNowTaken = !med.takenToday[time];
    if (isNowTaken) {
      setSuccessToast(`¡Toma registrada con éxito para ${med.name} (${time})!`);
      setTimeout(() => setSuccessToast(null), 3000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      {/* Toast Alert */}
      {successToast && (
        <div className="fixed top-5 right-5 z-50 bg-[#006b5d] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-sm font-semibold animate-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5 text-[#7ef7e0]" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Screen Header matching Image 3 */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#145680] leading-tight">
            Mis<br className="hidden sm:inline" /> Medicamentos
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administra tus dosis diarias y frecuencias de tratamiento.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddMedication}
            className="flex items-center justify-center gap-2 bg-[#45B39D] hover:bg-[#389583] text-white px-5 py-3 rounded-2xl font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Medicamento</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar matching Image 3 */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#75CBB8] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:bg-white focus:border-[#45B39D] outline-none"
          />
        </div>
      </div>

      {/* Medication List matching Image 3 card style */}
      <div className="space-y-4">
        {filteredMeds.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 space-y-3">
            <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
              <Pill className="w-7 h-7" />
            </div>
            <h4 className="text-base font-bold text-gray-700">No se encontraron medicamentos</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              No hay prescripciones en esta categoría o búsqueda. Puedes añadir una nueva en cualquier momento.
            </p>
            <button
              onClick={onOpenAddMedication}
              className="mt-2 px-5 py-2.5 bg-[#45B39D] text-white rounded-xl text-xs font-semibold hover:bg-[#389583] transition-colors"
            >
              Agregar Primer Medicamento
            </button>
          </div>
        ) : (
          filteredMeds.map((med) => {
            const primaryTime = med.scheduledTimes[0] || '08:00';
            const isTaken = !!med.takenToday[primaryTime];

            return (
              <article
                key={med.id}
                className="bg-white rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.1)] border border-gray-100 transition-all group"
              >
                <div className="flex items-center space-x-4">
                  {/* Pill Icon Container with soft blue circle from image 3 */}
                  <div className="w-13 h-13 rounded-2xl bg-[#EBF3F8] text-[#145680] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Pill className="w-6 h-6 transform -rotate-45" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold text-gray-900">{med.name}</h3>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#EBF3F8] text-[#145680]">
                        {med.form}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-0.5">
                      {med.dosage} • {med.frequency} • {primaryTime}
                    </p>

                    {/* All scheduled time tags */}
                    <div className="flex items-center gap-1.5 mt-2">
                      {med.scheduledTimes.map((t) => (
                        <button
                          key={t}
                          onClick={() => handleRegisterDose(med, t)}
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 transition-colors ${
                            med.takenToday[t]
                              ? 'bg-[#7ef7e0]/30 border-[#006b5d]/40 text-[#006b5d]'
                              : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                          title={`Toma de las ${t}: ${med.takenToday[t] ? 'Realizada' : 'Pendiente'}`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{t}</span>
                          {med.takenToday[t] && <Check className="w-3 h-3 text-[#006b5d]" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2.5 self-end sm:self-center">
                  <button
                    onClick={() => handleRegisterDose(med, primaryTime)}
                    className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-sm whitespace-nowrap active:scale-95 flex items-center gap-1.5 ${
                      isTaken
                        ? 'bg-[#EBF3F8] text-[#006b5d] hover:bg-[#d9ecf6]'
                        : 'bg-[#3FA890] hover:bg-[#348C78] text-white'
                    }`}
                  >
                    {isTaken ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Toma Registrada</span>
                      </>
                    ) : (
                      <span>Registrar Toma</span>
                    )}
                  </button>

                  <button
                    onClick={() => onDeleteMedication(med.id)}
                    className="p-2.5 text-gray-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors"
                    title="Eliminar medicamento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
