import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./tsx/LoginPage"
import RegistroUser from "./tsx/registroUser"
import Dashboard from "./components/Dashboard"
import { ProtectedRoute } from "./components/ProtectedRoute"
import Inicio from "./tsx/inicio" 
import AccessibilityMenu from "./components/AccessibilityMenu"
import { ReadingMask } from "./components/ReadingMask"
import { ReadingGuide } from "./components/ReadingGuide"
import { AccessibilityProvider } from "./hooks/AccessibilityProvider"
import "./css/accessibility.css"
import ContactForm from "./tsx/ContactForm"
import AnimalSearchPage from "./tsx/AnimalSearchPage"
import AnimalForm from "./tsx/AnimalForm";
import BuscarEditarEliminarAnimal from "./tsx/BuscarEditarEliminarAnimal";
import AdminPanel from "./tsx/AdminPanel";
import AdminUserManager from "./tsx/AdminUserManager";
import AdoptionsPage from "./tsx/AdoptionsPage";
import MedicalRecordsPage from "./tsx/MedicalRecordsPage";
import InventoryPage from "./tsx/InventoryPage";
import DonationsPage from "./tsx/DonationsPage";
import AccessibilityDemoPage from "./tsx/AccessibilityDemoPage";
import PerrosDisponibles from "./tsx/PerrosDisponibles";
import HistoriasExito from "./tsx/HistoriasExito";
import ProcesoAdopcion from "./tsx/ProcesoAdopcion";
import Donaciones from "./tsx/Donaciones";
import Voluntariado from "./tsx/Voluntariado";
import HogaresTemporales from "./tsx/HogaresTemporales";
import PreguntasFrecuentes from "./tsx/PreguntasFrecuentes";
import Telefonos from "./tsx/Telefonos";
import Visitanos from "./tsx/Visitanos";
import ComoAyudar from "./tsx/ComoAyudar";

function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <AccessibilityMenu />
        <ReadingMask />
        <ReadingGuide />
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegistroUser />} />
          <Route path="/dashboard" element={
            <ProtectedRoute requiredRole="administrador">
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/animals/search" element={<AnimalSearchPage />} />
          <Route path="/animals/new" element={<AnimalForm />} />
          <Route path="/animals/edit" element={<BuscarEditarEliminarAnimal />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/users" element={<AdminUserManager />} />
          {/* Rutas agregadas para menú lateral y dashboard */}
            <Route path="/adoptions" element={<AdoptionsPage />} />
            <Route path="/medical" element={<MedicalRecordsPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/donations" element={<DonationsPage />} />
            <Route path="/accessibility-demo" element={<AccessibilityDemoPage />} />
            <Route path="/perros-disponibles" element={<PerrosDisponibles />} />
            <Route path="/historias-exito" element={<HistoriasExito />} />
            <Route path="/como-ayudar" element={<ComoAyudar />} />
            <Route path="/proceso-adopcion" element={<ProcesoAdopcion />} />
            <Route path="/donaciones" element={<Donaciones />} />
            <Route path="/voluntariado" element={<Voluntariado />} />
            <Route path="/hogares-temporales" element={<HogaresTemporales />} />
            <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
            <Route path="/telefonos" element={<Telefonos />} />
            <Route path="/visitanos" element={<Visitanos />} />
          {/* Ruta comodín para cualquier otra URL, redirige a inicio */} 
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </Router>
    </AccessibilityProvider>
  )
}

export default App
