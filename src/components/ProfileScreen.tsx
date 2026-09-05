import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldAlert, 
  HeartHandshake, 
  AlertTriangle, 
  Activity, 
  Edit3, 
  GraduationCap, 
  School,
  Check,
  X,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { UserProfile, INSTITUTIONAL_CREDITS } from '../types';
import { EmmsaLogo } from './EmmsaLogo';

interface ProfileScreenProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenEmergency: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onUpdateProfile,
  onOpenEmergency,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserProfile>(userProfile);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-20 md:pb-8 animate-in fade-in duration-200">
      {/* Header matching Image 13 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#003758] tracking-tight">
            Mi Perfil
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Información personal, médica y contactos de emergencia.
          </p>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-700 hover:text-[#006b5d] hover:border-[#006b5d] text-xs font-semibold shadow-xs transition-colors self-start sm:self-center"
        >
          <Edit3 className="w-4 h-4" />
          <span>{isEditing ? 'Cancelar Edición' : 'Editar Perfil'}</span>
        </button>
      </div>

      {/* Main Patient Card matching Image 13 */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative">
          <img
            src={userProfile.avatarUrl || '/patient_avatar.jpg'}
            alt={userProfile.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#7ef7e0]/30 shadow-md"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80';
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#006b5d] rounded-full flex items-center justify-center text-white border-2 border-white">
            <Check className="w-4 h-4" />
          </div>
        </div>

        <div className="text-center sm:text-left flex-1 space-y-1">
          <span className="px-3 py-1 rounded-full bg-[#7ef7e0]/20 text-[#006b5d] text-xs font-bold uppercase tracking-wider">
            Paciente Activo
          </span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{userProfile.name}</h3>
          <p className="text-sm font-medium text-gray-500">
            {userProfile.age} años • Tipo de Sangre: <strong className="text-gray-800">{userProfile.bloodType}</strong> • Peso: <strong className="text-gray-800">{userProfile.weight} kg</strong>
          </p>
        </div>
      </div>

      {/* Edit Form Modal/Drawer if editing */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 shadow-md border border-[#7ef7e0] space-y-4 animate-in fade-in">
          <h4 className="font-bold text-lg text-[#003758]">Actualizar Datos del Perfil</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">Nombre Completo</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Edad</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Peso (kg)</label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Correo</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Teléfono</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">Dirección</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border rounded-xl text-sm"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border rounded-xl text-xs font-semibold text-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#006b5d] text-white rounded-xl text-xs font-semibold shadow-sm"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      )}

      {/* Bento Grid: Contact, Emergency, Medical Summary matching Image 13 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Info Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4 overflow-hidden min-w-0">
          <h4 className="text-base font-bold text-[#003758] flex items-center gap-2">
            <Mail className="w-5 h-5 text-[#006b5d]" />
            <span>Información de Contacto</span>
          </h4>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100/60 overflow-hidden min-w-0">
              <Mail className="w-4 h-4 text-[#006b5d] mt-1 shrink-0" />
              <div className="min-w-0 flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-gray-500">Correo Electrónico</p>
                <p 
                  className="font-medium text-gray-900 text-sm break-all leading-snug mt-0.5" 
                  title={userProfile.email}
                >
                  {userProfile.email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100/60 overflow-hidden min-w-0">
              <Phone className="w-4 h-4 text-[#006b5d] mt-1 shrink-0" />
              <div className="min-w-0 flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-gray-500">Teléfono Móvil</p>
                <p className="font-medium text-gray-900 text-sm truncate leading-snug mt-0.5">
                  {userProfile.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100/60 overflow-hidden min-w-0">
              <MapPin className="w-4 h-4 text-[#006b5d] mt-1 shrink-0" />
              <div className="min-w-0 flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-gray-500">Dirección</p>
                <p className="font-medium text-gray-900 text-sm break-words leading-snug mt-0.5">
                  {userProfile.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contacts Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-[#003758] flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-500" />
              <span>Contactos de Emergencia</span>
            </h4>
            <button
              onClick={onOpenEmergency}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Abrir S.O.S
            </button>
          </div>

          <div className="space-y-3">
            {userProfile.emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-gray-50 border border-gray-100"
              >
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">{contact.name}</h5>
                  <p className="text-xs text-[#006b5d] font-semibold">{contact.relationship}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{contact.phone}</p>
                </div>
                <a
                  href={`tel:${contact.phone}`}
                  className="p-2.5 rounded-full bg-[#006b5d] text-white hover:bg-[#005046] shadow-xs transition-transform active:scale-95"
                  title="Llamar"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Summary: Allergies and Conditions */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-4">
          <h4 className="text-base font-bold text-[#003758] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#006b5d]" />
            <span>Resumen Médico</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Allergies */}
            <div className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-700">
                <AlertTriangle className="w-4 h-4" />
                <span>Alergias Conocidas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {userProfile.allergies.map((allergy, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-red-200 text-red-700 rounded-full text-xs font-semibold"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>

            {/* Active Conditions */}
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1b4e74]">
                <HeartHandshake className="w-4 h-4" />
                <span>Condiciones Médicas Activas</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {userProfile.activeConditions.map((cond, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-white border border-blue-200 text-[#1b4e74] rounded-full text-xs font-semibold"
                  >
                    {cond}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Institutional Logo Management Card */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <EmmsaLogo 
            size="lg" 
            shape="square" 
            allowUpload={true} 
            className="border border-gray-200 shadow-sm" 
          />
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="px-2.5 py-0.5 rounded-full bg-[#006b5d]/10 text-[#006b5d] text-[11px] font-bold uppercase tracking-wider">
                Identidad Institucional
              </span>
            </div>
            <h4 className="text-lg font-black text-[#003758] mt-1">Logotipo Oficial EMMSA</h4>
            <p className="text-xs text-gray-500 max-w-md mt-0.5 leading-relaxed">
              Haz clic sobre el logotipo o pulsa el botón para cargar directamente tu archivo original. Se reflejará automáticamente en toda la aplicación (barra lateral, inicio de sesión y encabezado) exactamente como es.
            </p>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto flex justify-center">
          <EmmsaLogo size="md" variant="full" allowUpload={true} />
        </div>
      </div>

      {/* Prominent School & Students Credits Card in Profile View */}
      <div className="bg-gradient-to-r from-[#003758] to-[#145680] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#246392]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#7ef7e0] font-bold text-xs uppercase tracking-wider">
              <School className="w-4 h-4" />
              <span>Institución Educativa</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {INSTITUTIONAL_CREDITS.colegio}
            </h3>
            <p className="text-xs text-[#cee5ff] max-w-xl leading-relaxed">
              Proyecto de software en salud preventiva diseñado y presentado por el grupo de estudiantes de especialidad técnica.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shrink-0 w-full md:w-auto">
            <p className="text-xs text-[#7ef7e0] font-bold uppercase tracking-wider mb-2">
              Autores del Proyecto:
            </p>
            <ul className="space-y-1.5 text-xs font-semibold text-white">
              {INSTITUTIONAL_CREDITS.autores.map((autor, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7ef7e0]" />
                  <span>{autor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
