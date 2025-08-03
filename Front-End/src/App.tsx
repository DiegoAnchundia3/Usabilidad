import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from "./tsx/LoginPage"
import RegistroUser from "./tsx/registroUser"
import Dashboard from "./components/Dashboard"
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/animals/search" element={<AnimalSearchPage />} />
          <Route path="/animals/new" element={<AnimalForm />} />
          <Route path="/animals/edit" element={<BuscarEditarEliminarAnimal />} />
          {/* Ruta comodín para cualquier otra URL, redirige a inicio */} 
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </Router>
    </AccessibilityProvider>
  )
}

export default App
