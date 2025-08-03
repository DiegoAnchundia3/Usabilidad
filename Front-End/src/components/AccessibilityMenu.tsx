"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Type,
  Contrast,
  MousePointer,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Pause,
  Play,
  RotateCcw,
  Settings,
  X,
  Link,
  ImageIcon,
  Brain,
  MoreHorizontal,
  Volume2,
  EyeOff,
  AlignJustify,
} from "lucide-react"
import { useAccessibilityContext } from "../hooks/AccessibilityProvider"
import { AccessibilityUtils } from "../hooks/useAccessibility"

const AccessibilityMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const { settings, updateSetting, resetSettings } = useAccessibilityContext()

  useEffect(() => {
    return () => {
      document.body.classList.remove("accessibility-menu-open")
    }
  }, [])

  const handleOpenMenu = () => {
    setIsOpen(true)
    document.body.classList.add("accessibility-menu-open")
    AccessibilityUtils.announceToScreenReader("Menú de accesibilidad abierto")
  }

  const handleCloseMenu = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
      document.body.classList.remove("accessibility-menu-open")
    }, 250)
    AccessibilityUtils.announceToScreenReader("Menú de accesibilidad cerrado")
  }

  const handleReset = () => {
    console.log("Reset button clicked") // Debug
    resetSettings()
    AccessibilityUtils.announceToScreenReader("Configuraciones de accesibilidad restablecidas")
  }

  // Debug para verificar clics
  const handleOptionClick = (optionName: string, value: any) => {
    console.log(`Option clicked: ${optionName} = ${value}`) // Debug
    updateSetting(optionName as any, value)
  }

  return (
    <>
      {/* Botón flotante de accesibilidad - Solo visible cuando el menú está cerrado */}
      {!isOpen && (
        <button onClick={handleOpenMenu} className="accessibility-button" aria-label="Abrir menú de accesibilidad">
          <Settings className="w-6 h-6" />
        </button>
      )}
      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && <div className="accessibility-overlay fade-in" onClick={handleCloseMenu} aria-hidden="true" />}
      {/* Menú de accesibilidad con animaciones */}
      {isOpen && (
        <div
          className={`accessibility-sidebar ${isClosing ? "slide-out" : "slide-in"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con botón de cerrar */}
          <h2>🔧 Configuración de Accesibilidad</h2>
          <button onClick={handleCloseMenu} className="accessibility-close-button" aria-label="Cerrar menú">
            <X className="w-4 h-4" />
          </button>
          {/* Configuraciones de Texto */}
          <h3>📝 Configuraciones de Texto</h3>
          <div className="accessibility-option-card">
            {/* Tamaño de fuente */}
            <div className="accessibility-option">
              <label>
                <Type className="w-4 h-4 mr-2" />
                Tamaño de Fuente
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    console.log("Font size decrease clicked") // Debug
                    handleOptionClick("fontSize", Math.max(12, settings.fontSize - 2))
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                  style={{ pointerEvents: "auto", cursor: "pointer" }}
                >
                  -
                </button>
                <span className="value-display">{settings.fontSize}px</span>
                <button
                  onClick={() => {
                    console.log("Font size increase clicked") // Debug
                    handleOptionClick("fontSize", Math.min(30, settings.fontSize + 2))
                  }}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                  style={{ pointerEvents: "auto", cursor: "pointer" }}
                >
                  +
                </button>
              </div>
            </div>
            {/* Altura de línea */}
            <div className="accessibility-option">
              <label>
                <MoreHorizontal className="w-4 h-4 mr-2" />
                Altura de Línea
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    handleOptionClick("lineHeight", Math.max(1.0, Number((settings.lineHeight - 0.1).toFixed(1))))
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                >
                  -
                </button>
                <span className="value-display">{settings.lineHeight}</span>
                <button
                  onClick={() =>
                    handleOptionClick("lineHeight", Math.min(2.0, Number((settings.lineHeight + 0.1).toFixed(1))))
                  }
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </div>
            {/* Espaciado entre letras */}
            <div className="accessibility-option">
              <label>
                <Type className="w-4 h-4 mr-2" />
                Espaciado de Letras
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOptionClick("letterSpacing", Math.max(0, settings.letterSpacing - 1))}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                >
                  -
                </button>
                <span className="value-display">{settings.letterSpacing}px</span>
                <button
                  onClick={() => handleOptionClick("letterSpacing", Math.min(5, settings.letterSpacing + 1))}
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </div>
            {/* Agrandar texto */}
            <div className="accessibility-option">
              <label>
                <input
                  type="checkbox"
                  checked={settings.enlargeText}
                  onChange={(e) => handleOptionClick("enlargeText", e.target.checked)}
                />
                Agrandar Todo el Texto
              </label>
            </div>
          </div>
          {/* Configuraciones Visuales */}
          <h3>👁️ Configuraciones Visuales</h3>
          <div className="accessibility-option-card">
            {/* Contraste */}
            <div className="accessibility-option">
              <label>
                <Contrast className="w-4 h-4 mr-2" />
                Contraste
              </label>
              <select
                value={settings.contrast}
                onChange={(e) => handleOptionClick("contrast", e.target.value as any)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="high">Alto</option>
                <option value="inverted">Invertido</option>
              </select>
            </div>
            {/* Saturación */}
            <div className="accessibility-option">
              <label>Saturación de Color</label>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="range"
                  min="0"
                  max="200"
                  value={settings.saturation}
                  onChange={(e) => handleOptionClick("saturation", Number(e.target.value))}
                />
                <span className="value-display">{settings.saturation}%</span>
              </div>
            </div>
            {/* Ocultar imágenes */}
            <div className="accessibility-option">
              <label>
                <input
                  type="checkbox"
                  checked={settings.hideImages}
                  onChange={(e) => handleOptionClick("hideImages", e.target.checked)}
                />
                <ImageIcon className="w-4 h-4 mx-2" />
                Ocultar Imágenes (solo &lt;img&gt;)
              </label>
            </div>
          </div>
          {/* Configuraciones de Navegación */}
          <h3>🧭 Navegación y Interacción</h3>
          <div className="accessibility-option-card">
            {/* Resaltar enlaces */}
            <div className="accessibility-option">
              <label>
                <input
                  type="checkbox"
                  checked={settings.highlightLinks}
                  onChange={(e) => handleOptionClick("highlightLinks", e.target.checked)}
                />
                <Link className="w-4 h-4 mx-2" />
                Resaltar Enlaces
              </label>
            </div>
            {/* Cursor grande */}
            <div className="accessibility-option">
              <label>
                <MousePointer className="w-4 h-4 mr-2" />
                Tamaño de Cursor
              </label>
              <select
                value={settings.cursorSize}
                onChange={(e) => handleOptionClick("cursorSize", e.target.value as any)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="large">Grande</option>
                <option value="extra-large">Extra Grande</option>
              </select>
            </div>
            {/* Alineación de texto */}
            <div className="accessibility-option">
              <label>Alineación de Texto</label>
              <div className="flex gap-1">
                <button
                  onClick={() => handleOptionClick("textAlign", "left")}
                  className={`p-1 rounded ${settings.textAlign === "left" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  <AlignLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOptionClick("textAlign", "center")}
                  className={`p-1 rounded ${
                    settings.textAlign === "center" ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                >
                  <AlignCenter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleOptionClick("textAlign", "right")}
                  className={`p-1 rounded ${settings.textAlign === "right" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                >
                  <AlignRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          {/* Configuraciones Especiales */}
          <h3>🧠 Configuraciones Especiales</h3>
          <div className="accessibility-option-card">
            {/* Fuente amigable para dislexia */}
            <div className="accessibility-option">
              <label>
                <input
                  type="checkbox"
                  checked={settings.dyslexiaFriendly}
                  onChange={(e) => handleOptionClick("dyslexiaFriendly", e.target.checked)}
                />
                <Brain className="w-4 h-4 mx-2" />
                Fuente para Dislexia
              </label>
            </div>
            {/* Pausar animaciones */}
            <div className="accessibility-option">
              <label>
                <input
                  type="checkbox"
                  checked={settings.pauseAnimations}
                  onChange={(e) => handleOptionClick("pauseAnimations", e.target.checked)}
                />
                {settings.pauseAnimations ? <Play className="w-4 h-4 mx-2" /> : <Pause className="w-4 h-4 mx-2" />}
                Reducir Animaciones
              </label>
            </div>
            {/* Lector de Voz (Nuevo) */}
            <div className="accessibility-option">
              <label>
                <input
                  type="checkbox"
                  checked={settings.isVoiceReaderActive}
                  onChange={(e) => handleOptionClick("isVoiceReaderActive", e.target.checked)}
                />
                <Volume2 className="w-4 h-4 mx-2" />
                Lector de Voz
              </label>
              <p className="text-xs text-gray-500 mt-1">Lee el texto al pasar el cursor sobre él.</p>
            </div>
            {/* Máscara de Lectura (Nuevo) */}
            <div className="accessibility-option">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.isReadingMaskActive}
                    onChange={(e) => {
                      handleOptionClick("isReadingMaskActive", e.target.checked)
                      if (e.target.checked) {
                        handleOptionClick("isReadingGuideActive", false) // Desactivar guía si se activa máscara
                      }
                    }}
                  />
                  <EyeOff className="w-4 h-4 mx-2" />
                  Máscara de Lectura
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">Oscurece la pantalla, dejando una franja visible.</p>
            </div>
            {/* Guía de Lectura (Nuevo) */}
            <div className="accessibility-option">
              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.isReadingGuideActive}
                    onChange={(e) => {
                      handleOptionClick("isReadingGuideActive", e.target.checked)
                      if (e.target.checked) {
                        handleOptionClick("isReadingMaskActive", false) // Desactivar máscara si se activa guía
                      }
                    }}
                  />
                  <AlignJustify className="w-4 h-4 mx-2" />
                  Guía de Lectura
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-6">Muestra una línea horizontal que sigue el cursor.</p>
            </div>
          </div>
          {/* Botón de reset */}
          <div className="accessibility-option-card">
            <div className="accessibility-option">
              <button
                onClick={handleReset}
                className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center justify-center gap-2"
                style={{ pointerEvents: "auto", cursor: "pointer" }}
              >
                <RotateCcw className="w-4 h-4" />
                Restablecer Configuraciones
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AccessibilityMenu
