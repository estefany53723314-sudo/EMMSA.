import { Medication, Appointment, UserProfile, HealthMetric } from '../types';

export const INITIAL_MEDICATIONS: Medication[] = [
  {
    id: 'med-1',
    name: 'Amoxicilina',
    dosage: '500mg - 1 cápsula',
    form: 'Cápsula / Pastilla',
    frequency: 'Cada 8 horas',
    durationNumber: 7,
    durationUnit: 'dias',
    scheduledTimes: ['08:00', '16:00', '00:00'],
    takenToday: {
      '08:00': true,
      '16:00': false,
      '00:00': false,
    },
    instructions: 'Tomar con abundante agua después de los alimentos.',
    timeCategory: 'mañana',
  },
  {
    id: 'med-2',
    name: 'Losartán',
    dosage: '50mg - 1 tableta',
    form: 'Cápsula / Pastilla',
    frequency: 'Cada 24 horas',
    durationNumber: 30,
    durationUnit: 'dias',
    scheduledTimes: ['20:00'],
    takenToday: {
      '20:00': false,
    },
    instructions: 'Control de presión arterial. Tomar todos los días a la misma hora.',
    timeCategory: 'noche',
  },
  {
    id: 'med-3',
    name: 'Omeprazol',
    dosage: '20mg - 1 cápsula',
    form: 'Cápsula / Pastilla',
    frequency: 'Cada 24 horas',
    durationNumber: 14,
    durationUnit: 'dias',
    scheduledTimes: ['07:00'],
    takenToday: {
      '07:00': true,
    },
    instructions: 'Tomar en ayunas, 30 minutos antes del desayuno.',
    timeCategory: 'mañana',
  },
  {
    id: 'med-4',
    name: 'Metformina',
    dosage: '850mg - 1 tableta',
    form: 'Cápsula / Pastilla',
    frequency: 'Cada 12 horas',
    durationNumber: 60,
    durationUnit: 'dias',
    scheduledTimes: ['13:00', '21:00'],
    takenToday: {
      '13:00': true,
      '21:00': false,
    },
    instructions: 'Tomar durante o inmediatamente después del almuerzo.',
    timeCategory: 'tarde',
  },
];

const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth(); // 0-indexed (e.g. current month)
const currentDay = today.getDate();

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    doctorName: 'Dr. Roberto Sánchez',
    specialty: 'Cardiología',
    dateStr: 'Hoy, 10:30 AM',
    dayNumber: currentDay,
    month: currentMonth,
    year: currentYear,
    timeStr: '10:30 AM',
    status: 'Confirmada',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'apt-2',
    doctorName: 'Dra. Elena Gómez',
    specialty: 'Endocrinología',
    dateStr: `Día ${Math.min(28, currentDay + 2)}, 16:00`,
    dayNumber: Math.min(28, currentDay + 2),
    month: currentMonth,
    year: currentYear,
    timeStr: '16:00',
    status: 'Pendiente',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813683-9b9775f0f353?w=150&auto=format&fit=crop&q=80',
  },
  {
    id: 'apt-3',
    doctorName: 'Radiografía Tórax',
    specialty: 'Centro Imagenología',
    dateStr: `Día ${Math.min(28, currentDay + 6)}, 09:00 AM`,
    dayNumber: Math.min(28, currentDay + 6),
    month: currentMonth,
    year: currentYear,
    timeStr: '09:00 AM',
    status: 'Pendiente',
    icon: 'radiology',
  },
  {
    id: 'apt-4',
    doctorName: 'Dr. López',
    specialty: 'Medicina General',
    dateStr: `Día ${Math.min(28, currentDay + 11)}, 11:30 AM`,
    dayNumber: Math.min(28, currentDay + 11),
    month: currentMonth,
    year: currentYear,
    timeStr: '11:30 AM',
    status: 'Confirmada',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
  },
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Valentina Mendoza',
  age: 28,
  bloodType: 'A Positivo',
  weight: 56,
  email: 'valen.mendoza@email.com',
  phone: '+52 55 4321 8765',
  address: 'Av. Insurgentes Sur 1450, CDMX, México',
  avatarUrl: '/patient_avatar.jpg',
  allergies: ['Polen', 'Ibuprofeno'],
  activeConditions: ['Rinitis Alérgica (Controlada)', 'Chequeo Preventivo'],
  emergencyContacts: [
    {
      id: 'ec-1',
      name: 'Camila Mendoza',
      relationship: 'Madre',
      phone: '+52 55 9876 5432',
    },
    {
      id: 'ec-2',
      name: 'Mateo Mendoza',
      relationship: 'Hermano',
      phone: '+52 55 8765 4321',
    },
  ],
};

export const INITIAL_HEALTH_METRICS: HealthMetric[] = [
  { month: 'Ene.', peso: 52, presion: 39 },
  { month: 'Feb.', peso: 44, presion: 36 },
  { month: 'Mar.', peso: 48, presion: 52 },
  { month: 'Abril', peso: 36, presion: 48 },
  { month: 'May', peso: 31, presion: 54 },
  { month: 'Jun.', peso: 41, presion: 57 },
];
