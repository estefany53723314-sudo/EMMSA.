export interface Medication {
  id: string;
  name: string;
  dosage: string;
  form: string;
  frequency: string;
  durationNumber: number;
  durationUnit: 'dias' | 'semanas' | 'continuo';
  scheduledTimes: string[];
  takenToday: { [time: string]: boolean };
  instructions?: string;
  timeCategory: 'mañana' | 'tarde' | 'noche';
}

export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  dateStr: string; // e.g. "Jueves 5, 16:00"
  dayNumber: number;
  month: number; // 0-indexed or 1-12
  year: number;
  timeStr: string;
  status: 'Confirmada' | 'Pendiente' | 'Completada';
  center?: string;
  avatarUrl?: string;
  icon?: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

export interface HealthMetric {
  month: string;
  peso: number;
  presion: number;
}

export interface UserProfile {
  name: string;
  age: number;
  bloodType: string;
  weight: number;
  email: string;
  phone: string;
  address: string;
  allergies: string[];
  activeConditions: string[];
  emergencyContacts: EmergencyContact[];
  avatarUrl?: string;
}

export interface ProjectCredits {
  colegio: string;
  autores: string[];
  titulo: string;
  materia: string;
  descripcion: string;
}

export const INSTITUTIONAL_CREDITS: ProjectCredits = {
  colegio: 'Colegio Técnico Industrial José Elías Puyana',
  autores: [
    'Sara Juliana Ortiz Ramirez',
    'Emily Estefany Olachica Pinto',
    'Maria Jose Cardenas Conde'
  ],
  titulo: 'EMMSA - Sistema de Recordatorio de Medicamentos',
  materia: 'Proyecto Técnico & Salud Digital',
  descripcion: 'Desarrollado con dedicación para brindar a los pacientes un acompañamiento confiable, accesible y humano en el control de sus tratamientos médicos.'
};
