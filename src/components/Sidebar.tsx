import React from 'react';
import { 
  Home, 
  Pill, 
  Calendar, 
  User, 
  AlertCircle, 
  GraduationCap,
  LogOut,
  Sparkles
} from 'lucide-react';
import { INSTITUTIONAL_CREDITS } from '../types';
import { EmmsaLogo } from './EmmsaLogo';

export type ScreenType = 'inicio' | 'medicamentos' | 'agenda' | 'perfil';

interface SidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenEmergency: () => void;
  onOpenAuth: () => void;
  onOpenCredits: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentScreen,
  onNavigate,
  onOpenEmergency,
  onOpenAuth,
  onOpenCredits,
}) => {
  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'medicamentos', label: 'Medicamentos', icon: Pill },
    { id: 'agenda', label: 'Agenda', icon: Calendar },
    { id: 'perfil', label: 'Perfil', icon: User },
  ] as const;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-[#145680] text-white flex-col h-screen fixed left-0 top-0 z-40 p-4 border-r border-[#1b4e74] hidden md:flex shadow-xl justify-between">
        <div>
          {/* Header Brand - Small square completely filled by the logo image */}
          <div className="flex items-center gap-3 mb-6 px-1 pt-1">
            <EmmsaLogo 
              size="custom" 
              shape="square" 
              fit="cover"
              allowUpload={true}
              className="w-12 h-12 rounded-xl shadow-md border border-white/25 p-0 overflow-hidden shrink-0" 
            />
            <div className="min-w-0">
              <h1 className="font-serif font-black text-2xl tracking-wide text-white leading-tight">EMMSA</h1>
              <p className="text-[11px] text-[#a8c7d8] font-medium leading-tight mt-0.5">Recordatorio de Medicamentos</p>
            </div>
          </div>

          {/* School Mini Tag */}
          <button 
            onClick={onOpenCredits}
            className="w-full text-left mb-6 px-3 py-2 bg-[#0e3f5e]/80 hover:bg-[#0e3f5e] border border-[#246392]/50 rounded-xl transition-all group"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#7ef7e0] group-hover:scale-110 transition-transform" />
              <div className="min-w-0 flex-1">
                <span className="block text-[10px] uppercase font-bold tracking-wider text-[#7ef7e0]">Colegio Técnico Industrial</span>
                <span className="block text-xs font-semibold text-white/90 truncate">José Elías Puyana</span>
              </div>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 text-left ${
                    isActive
                      ? 'bg-[#7ef7e0] text-[#003758] font-bold shadow-md shadow-[#7ef7e0]/20'
                      : 'text-[#a8c7d8] hover:text-white hover:bg-[#1e6796]'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-[#003758]' : 'text-[#a8c7d8]'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#003758]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-2.5 pt-4 border-t border-[#1e6796]/60">
          {/* Institutional Credits Trigger */}
          <button
            onClick={onOpenCredits}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#7ef7e0]" />
              <span>Autores del Proyecto</span>
            </span>
            <span className="text-[10px] bg-[#7ef7e0]/20 text-[#7ef7e0] px-1.5 py-0.5 rounded font-bold">
              3
            </span>
          </button>

          {/* Login/Register Screens Demo */}
          <button
            onClick={onOpenAuth}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-[#a8c7d8] hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Pantallas de Acceso / Login</span>
          </button>

          {/* Emergency Button */}
          <button
            onClick={onOpenEmergency}
            className="w-full flex items-center justify-center gap-2 border border-red-400 text-red-100 bg-red-500/10 hover:bg-red-500/20 py-3 rounded-xl font-semibold text-xs tracking-wide transition-all active:scale-[0.98]"
          >
            <AlertCircle className="w-4 h-4 text-red-300" />
            <span>Emergency Contact</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center md:hidden shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
                isActive
                  ? 'text-[#006b5d] font-bold bg-[#7ef7e0]/30'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[11px] mt-0.5">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={onOpenEmergency}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-red-600 rounded-xl"
        >
          <AlertCircle className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-0.5">S.O.S</span>
        </button>
      </nav>
    </>
  );
};
