import React, { useState } from 'react';
import { 
  X, 
  Pill, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  Check, 
  ShieldCheck, 
  School,
  GraduationCap
} from 'lucide-react';
import { INSTITUTIONAL_CREDITS } from '../types';
import { EmmsaLogo } from './EmmsaLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('valen.mendoza@email.com');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Valentina Mendoza');
  const [phone, setPhone] = useState('+52 55 4321 8765');
  const [termsAccepted, setTermsAccepted] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(fullName || 'Valentina Mendoza');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-gray-100 my-6 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          title="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        {authMode === 'login' ? (
          /* Iniciar Sesion View (matching Image 7) */
          <div className="flex flex-col items-center justify-center p-8 sm:p-12 max-w-md mx-auto text-center space-y-6">
            {/* Logo Container with authentic EMMSA Doctor + Laurel */}
            <div className="mx-auto">
              <EmmsaLogo size="lg" variant="full" shape="square" showSubtitle={true} className="shadow-lg border border-gray-100 p-2 hover:scale-105 transition-transform" />
            </div>

            <div>
              <p className="text-sm text-gray-500 mt-1 font-medium">
                Ingresa tus credenciales para acceder a tus tratamientos
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full space-y-4 text-left">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@correo.com"
                    className="w-full pl-10 pr-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#45B39D] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-700">Contraseña</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 bg-[#f7fafc] border border-gray-200 rounded-xl text-sm focus:border-[#45B39D] focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => alert('Enlace de recuperación enviado al correo')}
                  className="text-xs font-medium text-[#145680] hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#45B39D] hover:bg-[#389583] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
              >
                Iniciar Sesión
              </button>
            </form>

            <div className="pt-2 border-t border-gray-100 w-full space-y-3">
              <p className="text-xs text-gray-600">
                ¿No tienes una cuenta?{' '}
                <button
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-[#145680] hover:underline"
                >
                  Regístrate aquí
                </button>
              </p>

              <div className="bg-[#f0f9f8] p-2.5 rounded-xl text-[11px] text-gray-600 border border-[#7ef7e0]/40">
                <span className="font-bold text-[#006b5d]">{INSTITUTIONAL_CREDITS.colegio}</span>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {INSTITUTIONAL_CREDITS.autores.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Crear Cuenta View (matching Image 9) */
          <div className="grid grid-cols-1 md:grid-cols-12 min-h-[550px]">
            {/* Left Promotional Banner from Image 9 */}
            <div className="md:col-span-5 bg-gradient-to-br from-[#145680] to-[#003758] p-8 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#7ef7e0]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <EmmsaLogo size="md" shape="square" className="shadow-lg border border-white/30" />
                <h3 className="text-2xl font-black text-white leading-tight">
                  Tu salud, organizada y siempre a tu alcance.
                </h3>
                <p className="text-xs text-[#cee5ff] leading-relaxed">
                  Únete a miles de pacientes que ya gestionan sus tratamientos médicos de forma segura, puntual y efectiva.
                </p>

                <div className="space-y-2.5 pt-4">
                  <div className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#7ef7e0] shrink-0" />
                    <span>Recordatorios puntuales y automáticos</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#7ef7e0] shrink-0" />
                    <span>Historial y agenda médica integrada</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <ShieldCheck className="w-4 h-4 text-[#7ef7e0] shrink-0" />
                    <span>Datos médicos encriptados y seguros</span>
                  </div>
                </div>
              </div>

              {/* School badge */}
              <div className="pt-6 border-t border-white/10 text-xs text-white/80 relative z-10">
                <p className="font-bold text-[#7ef7e0] text-[11px] uppercase">
                  {INSTITUTIONAL_CREDITS.colegio}
                </p>
                <p className="text-[10px] text-white/60">
                  Sara Juliana Ortiz • Emily Estefany Olachica • Maria Jose Cardenas
                </p>
              </div>
            </div>

            {/* Right Registration Form from Image 9 */}
            <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center">
              <div>
                <h3 className="text-2xl font-black text-[#003758]">Crear Cuenta</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Completa tus datos para comenzar tu seguimiento médico
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Nombre Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej. Carlos Mendoza"
                      className="w-full pl-10 pr-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-xs focus:border-[#45B39D] focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Correo Electrónico</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@correo.com"
                        className="w-full pl-10 pr-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-xs focus:border-[#45B39D] focus:bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700">Teléfono Móvil</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+52 55..."
                        className="w-full pl-10 pr-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-xs focus:border-[#45B39D] focus:bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700">Contraseña</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo 8 caracteres"
                      className="w-full pl-10 pr-3 py-2.5 bg-[#f7fafc] border border-gray-200 rounded-xl text-xs focus:border-[#45B39D] focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="w-4 h-4 text-[#006b5d] rounded border-gray-300 focus:ring-[#7ef7e0]"
                  />
                  <label htmlFor="terms" className="text-[11px] text-gray-600">
                    Acepto los Términos de Servicio y la Política de Privacidad de Salud.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!termsAccepted}
                  className="w-full py-3 rounded-xl bg-[#006b5d] hover:bg-[#005046] disabled:bg-gray-300 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                >
                  Crear Cuenta y Comenzar
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-600">
                  ¿Ya tienes cuenta registrada?{' '}
                  <button
                    onClick={() => setAuthMode('login')}
                    className="font-bold text-[#145680] hover:underline"
                  >
                    Inicia Sesión
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
