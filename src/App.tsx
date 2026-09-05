import React, { useState, useEffect } from 'react';
import { Sidebar, ScreenType } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { DashboardScreen } from './components/DashboardScreen';
import { MedicationsScreen } from './components/MedicationsScreen';
import { AgendaScreen } from './components/AgendaScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AddMedicationModal } from './components/AddMedicationModal';
import { AddAppointmentModal } from './components/AddAppointmentModal';
import { EmergencyModal } from './components/EmergencyModal';
import { CreditsModal } from './components/CreditsModal';
import { AuthModal } from './components/AuthModal';
import { 
  INITIAL_MEDICATIONS, 
  INITIAL_APPOINTMENTS, 
  INITIAL_PROFILE, 
  INITIAL_HEALTH_METRICS 
} from './data/initialData';
import { Medication, Appointment, UserProfile } from './types';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('inicio');
  
  // Persistent state initialized from storage or defaults
  const [medications, setMedications] = useState<Medication[]>(() => {
    try {
      const saved = localStorage.getItem('emmsa_medications');
      return saved ? JSON.parse(saved) : INITIAL_MEDICATIONS;
    } catch {
      return INITIAL_MEDICATIONS;
    }
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const saved = localStorage.getItem('emmsa_appointments');
      if (saved) {
        const parsed: Appointment[] = JSON.parse(saved);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        return parsed.map((apt) => ({
          ...apt,
          year: currentYear,
          month: currentMonth,
        }));
      }
      return INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('emmsa_profile');
      if (saved) {
        const parsed: UserProfile = JSON.parse(saved);
        if (!parsed.name || parsed.name.includes('Carlos') || !parsed.avatarUrl || parsed.email === 'valentina.mendoza@email.com') {
          const updated = {
            ...parsed,
            ...INITIAL_PROFILE,
            avatarUrl: INITIAL_PROFILE.avatarUrl,
            email: 'valen.mendoza@email.com',
          };
          localStorage.setItem('emmsa_profile', JSON.stringify(updated));
          return updated;
        }
        return parsed;
      }
      return INITIAL_PROFILE;
    } catch {
      return INITIAL_PROFILE;
    }
  });

  // Modal open states
  const [isAddMedicationOpen, setIsAddMedicationOpen] = useState(false);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isCreditsOpen, setIsCreditsOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('emmsa_medications', JSON.stringify(medications));
    } catch (e) {
      console.warn('Could not save medications to localStorage', e);
    }
  }, [medications]);

  useEffect(() => {
    try {
      localStorage.setItem('emmsa_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.warn('Could not save appointments to localStorage', e);
    }
  }, [appointments]);

  useEffect(() => {
    try {
      localStorage.setItem('emmsa_profile', JSON.stringify(userProfile));
    } catch (e) {
      console.warn('Could not save profile to localStorage', e);
    }
  }, [userProfile]);

  // Handler: Toggle dose taken status
  const handleToggleDose = (medId: string, time: string) => {
    setMedications((prev) =>
      prev.map((med) => {
        if (med.id !== medId) return med;
        const currentVal = !!med.takenToday[time];
        return {
          ...med,
          takenToday: {
            ...med.takenToday,
            [time]: !currentVal,
          },
        };
      })
    );
  };

  // Handler: Add new medication
  const handleAddMedication = (newMed: Medication) => {
    setMedications((prev) => [newMed, ...prev]);
  };

  // Handler: Delete medication
  const handleDeleteMedication = (id: string) => {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  };

  // Handler: Add new appointment
  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  // Handler: Update profile
  const handleUpdateProfile = (updated: UserProfile) => {
    setUserProfile(updated);
  };

  return (
    <div className="min-h-screen bg-[#f7fafc] text-gray-800 flex">
      {/* Main Sidebar Navigation (Desktop) & Bottom Bar (Mobile) */}
      <Sidebar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenCredits={() => setIsCreditsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-h-screen">
        {/* Top Navbar */}
        <TopNavbar
          userName={userProfile.name}
          onOpenCredits={() => setIsCreditsOpen(true)}
          onOpenEmergency={() => setIsEmergencyOpen(true)}
          onOpenAddMedication={() => setIsAddMedicationOpen(true)}
        />

        {/* Dynamic Screen View */}
        <main className="flex-1 p-4 sm:p-6 md:p-8">
          {currentScreen === 'inicio' && (
            <DashboardScreen
              medications={medications}
              appointments={appointments}
              userProfile={userProfile}
              onToggleDose={handleToggleDose}
              onNavigate={setCurrentScreen}
              onOpenAddMedication={() => setIsAddMedicationOpen(true)}
              onOpenCredits={() => setIsCreditsOpen(true)}
            />
          )}

          {currentScreen === 'medicamentos' && (
            <MedicationsScreen
              medications={medications}
              onToggleDose={handleToggleDose}
              onOpenAddMedication={() => setIsAddMedicationOpen(true)}
              onDeleteMedication={handleDeleteMedication}
            />
          )}

          {currentScreen === 'agenda' && (
            <AgendaScreen
              appointments={appointments}
              healthMetrics={INITIAL_HEALTH_METRICS}
              onOpenAddAppointment={() => setIsAddAppointmentOpen(true)}
            />
          )}

          {currentScreen === 'perfil' && (
            <ProfileScreen
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onOpenEmergency={() => setIsEmergencyOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Modals & Dialogs */}
      <AddMedicationModal
        isOpen={isAddMedicationOpen}
        onClose={() => setIsAddMedicationOpen(false)}
        onSave={handleAddMedication}
      />

      <AddAppointmentModal
        isOpen={isAddAppointmentOpen}
        onClose={() => setIsAddAppointmentOpen(false)}
        onSave={handleAddAppointment}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        contacts={userProfile.emergencyContacts}
      />

      <CreditsModal
        isOpen={isCreditsOpen}
        onClose={() => setIsCreditsOpen(false)}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(name) => {
          setUserProfile((prev) => ({ ...prev, name }));
        }}
      />
    </div>
  );
}

export default App;
