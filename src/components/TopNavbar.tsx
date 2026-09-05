import React from 'react';
import { 
  Bell, 
  Menu, 
  Sparkles, 
  GraduationCap, 
  AlertCircle,
  Plus
} from 'lucide-react';
import { INSTITUTIONAL_CREDITS } from '../types';
import { EmmsaLogo } from './EmmsaLogo';

interface TopNavbarProps {
  onOpenMobileMenu?: () => void;
  onOpenCredits: () => void;
  onOpenEmergency: () => void;
  onOpenAddMedication: () => void;
  userName: string;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  onOpenCredits,
  onOpenEmergency,
  onOpenAddMedication,
  userName,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 sm:px-8 py-3 flex items-center justify-between">
      {/* Brand / School Badge in Topbar */}
      <div className="flex items-center gap-3">
        {/* Mobile Logo Brand */}
        <div className="flex items-center gap-2.5 md:hidden">
          <EmmsaLogo 
            size="custom" 
            variant="icon-only" 
            shape="square" 
            fit="cover"
            className="w-10 h-10 rounded-xl border border-gray-200 shadow-xs p-0 overflow-hidden" 
          />
          <span className="font-serif font-black text-xl text-[#0B5C71] tracking-wide">EMMSA</span>
        </div>

        <button
          onClick={onOpenCredits}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#f0f9f8] hover:bg-[#e0f5f2] border border-[#7ef7e0]/60 transition-colors text-left group"
        >
          <GraduationCap className="w-4 h-4 text-[#006b5d] group-hover:scale-110 transition-transform" />
          <div className="hidden sm:block">
            <span className="text-[10px] font-bold text-[#006b5d] block leading-none">
              {INSTITUTIONAL_CREDITS.colegio}
            </span>
            <span className="text-[9px] text-gray-500 block leading-tight">
              Sara J. • Emily E. • Maria Jose C.
            </span>
          </div>
          <span className="text-xs font-bold text-[#006b5d] sm:hidden">
            Colegio José Elías Puyana
          </span>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={onOpenAddMedication}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#45B39D] hover:bg-[#399684] text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nuevo Medicamento</span>
        </button>

        <button
          onClick={onOpenEmergency}
          className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
          title="Contacto de emergencia"
        >
          <AlertCircle className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenCredits}
          className="p-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
          title="Ver autores"
        >
          <Sparkles className="w-4 h-4 text-[#006b5d]" />
        </button>
      </div>
    </header>
  );
};
