import React from 'react';
import { INSTITUTIONAL_CREDITS } from '../types';
import { GraduationCap, Award, Users, School } from 'lucide-react';

interface ProjectCreditsBadgeProps {
  compact?: boolean;
}

export const ProjectCreditsBadge: React.FC<ProjectCreditsBadgeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-[#1b4e74]/10 border border-[#7ef7e0]/40 rounded-xl p-3 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-[#003758] mb-1">
          <School className="w-3.5 h-3.5 text-[#006b5d]" />
          <span className="truncate">{INSTITUTIONAL_CREDITS.colegio}</span>
        </div>
        <p className="text-gray-600 text-[11px] leading-tight mb-1">
          {INSTITUTIONAL_CREDITS.autores.join(' • ')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#1b4e74] to-[#003758] text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
      {/* Decorative accent element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#7ef7e0]/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#7ef7e0]/20 flex items-center justify-center border border-[#7ef7e0]/40">
            <GraduationCap className="w-5 h-5 text-[#7ef7e0]" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#7ef7e0]">
              Proyecto Institucional
            </span>
            <h4 className="text-sm font-bold text-white leading-tight">
              {INSTITUTIONAL_CREDITS.colegio}
            </h4>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-white/10 text-[11px] text-[#9ecbf7] font-medium border border-white/10">
          {new Date().getFullYear()}
        </span>
      </div>

      <div className="border-t border-white/10 pt-3 mt-2 relative z-10">
        <div className="flex items-center gap-1.5 text-xs text-[#cee5ff] font-semibold mb-2">
          <Users className="w-3.5 h-3.5 text-[#7ef7e0]" />
          <span>Equipo de Desarrollo:</span>
        </div>
        <ul className="space-y-1">
          {INSTITUTIONAL_CREDITS.autores.map((autor, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7ef7e0]" />
              <span className="font-medium">{autor}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-3 text-[11px] text-white/70 italic border-t border-white/10 pt-2">
        {INSTITUTIONAL_CREDITS.descripcion}
      </p>
    </div>
  );
};
