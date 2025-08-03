"use client"

import { useState, useEffect, useCallback, useRef } from "react"

export interface AccessibilitySettings {
  fontSize: number
  lineHeight: number
  letterSpacing: number
  contrast: "normal" | "high" | "inverted"
  highlightLinks: boolean
  enlargeText: boolean
  hideImages: boolean
  dyslexiaFriendly: boolean
  pauseAnimations: boolean
  textAlign: "left" | "center" | "right"
  cursorSize: "normal" | "large" | "extra-large"
  saturation: number
  // Nuevas configuraciones
  isVoiceReaderActive: boolean
  isReadingMaskActive: boolean
  isReadingGuideActive: boolean
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: 0,
  contrast: "normal",
  highlightLinks: false,
  enlargeText: false,
  hideImages: false,
  dyslexiaFriendly: false,
  pauseAnimations: false,
  textAlign: "left",
  cursorSize: "normal",
  saturation: 100,
  isVoiceReaderActive: false, // Nuevo
  isReadingMaskActive: false, // Nuevo
  isReadingGuideActive: false, // Nuevo
}

export const useAccessibility = () => {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings)
  const [isLoaded, setIsLoaded] = useState(false)
  const [readingMaskY, setReadingMaskY] = useState(window.innerHeight / 2) // Centrado por defecto
  const [readingGuideY, setReadingGuideY] = useState(window.innerHeight / 2) // Centrado por defecto

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const currentSpokenElementRef = useRef<HTMLElement | null>(null)
  const speakTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Función para leer texto
  const speakText = useCallback((text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }
    utteranceRef.current = new SpeechSynthesisUtterance(text)
    utteranceRef.current.lang = "es-ES" // Establecer el idioma a español
    speechSynthesis.speak(utteranceRef.current)
  }, [])

  // Función para detener la lectura
  const stopSpeaking = useCallback(() => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel()
    }
    if (speakTimeoutRef.current) {
      clearTimeout(speakTimeoutRef.current)
    }
    currentSpokenElementRef.current = null
  }, [])

  // Aplicar configuraciones al DOM
  const applySettings = useCallback(
    (newSettings: AccessibilitySettings) => {
      const root = document.documentElement
      const body = document.body
      try {
        // Aplicar variables CSS globales
        root.style.setProperty("--accessibility-font-size", `${newSettings.fontSize}px`)
        root.style.setProperty("--accessibility-line-height", newSettings.lineHeight.toString())
        root.style.setProperty("--accessibility-letter-spacing", `${newSettings.letterSpacing}px`)
        root.style.setProperty("--accessibility-saturation", `${newSettings.saturation}%`)

        // Limpiar todas las clases de accesibilidad del body (excepto las del menú)
        const classesToRemove = [
          "accessibility-contrast-high",
          "accessibility-contrast-inverted",
          "accessibility-highlight-links",
          "accessibility-enlarge-text",
          "accessibility-hide-images",
          "accessibility-dyslexia-friendly",
          "accessibility-pause-animations",
          "accessibility-text-align-center",
          "accessibility-text-align-right",
          "accessibility-cursor-large",
          "accessibility-cursor-extra-large",
          "accessibility-saturation-filter",
          "accessibility-menu-open", // Prevenir doble scroll
        ]
        classesToRemove.forEach((className) => {
          body.classList.remove(className)
        })
        // También limpiar las clases dinámicas de font-size y line-height
        for (let i = 12; i <= 30; i += 2) {
          body.classList.remove(`accessibility-font-size-${i}`)
        }
        for (let i = 10; i <= 20; i++) {
          body.classList.remove(`accessibility-line-height-${i}-${i}`)
        }
        for (let i = 0; i <= 5; i++) {
          body.classList.remove(`accessibility-letter-spacing-${i}`)
        }
        // Aplicar configuraciones de accesibilidad solo al contenido principal
        // Estas clases afectarán elementos que NO tengan la clase 'accessibility-menu'
        if (newSettings.contrast !== "normal") {
          body.classList.add(`accessibility-contrast-${newSettings.contrast}`)
        }
        if (newSettings.highlightLinks) {
          body.classList.add("accessibility-highlight-links")
        }
        if (newSettings.enlargeText) {
          body.classList.add("accessibility-enlarge-text")
        }
        if (newSettings.hideImages) {
          body.classList.add("accessibility-hide-images")
        }
        if (newSettings.dyslexiaFriendly) {
          body.classList.add("accessibility-dyslexia-friendly")
        }
        if (newSettings.pauseAnimations) {
          body.classList.add("accessibility-pause-animations")
        }
        if (newSettings.textAlign !== "left") {
          body.classList.add(`accessibility-text-align-${newSettings.textAlign}`)
        }
        if (newSettings.cursorSize !== "normal") {
          body.classList.add(`accessibility-cursor-${newSettings.cursorSize}`)
        }
        if (newSettings.saturation !== 100) {
          body.classList.add("accessibility-saturation-filter")
        }
        // Aplicar clases dinámicas para tamaños específicos solo si son diferentes del default
        if (newSettings.fontSize !== 16) {
          body.classList.add(`accessibility-font-size-${newSettings.fontSize}`)
        }
        if (newSettings.lineHeight !== 1.5) {
          const lineHeightClass = newSettings.lineHeight.toString().replace(".", "-")
          body.classList.add(`accessibility-line-height-${lineHeightClass}`)
        }
        if (newSettings.letterSpacing !== 0) {
          body.classList.add(`accessibility-letter-spacing-${newSettings.letterSpacing}`)
        }
        // Guardar en localStorage siempre que se cambien configuraciones
        if (isLoaded) {
          localStorage.setItem("accessibilitySettings", JSON.stringify(newSettings))
          console.log("Configuraciones de accesibilidad guardadas:", newSettings)
        }
      } catch (error) {
        console.error("Error applying accessibility settings:", error)
      }
    },
    [isLoaded],
  )

  // Cargar configuraciones desde localStorage
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem("accessibilitySettings")
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings)
        const loadedSettings = { ...defaultSettings, ...parsed }
        setSettings(loadedSettings)
        // Aplicar inmediatamente las configuraciones cargadas
        setTimeout(() => applySettings(loadedSettings), 0)
      }
      setIsLoaded(true)
    } catch (error) {
      console.warn("Error loading accessibility settings:", error)
      setIsLoaded(true)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Actualizar configuraciones
  const updateSettings = useCallback(
    (newSettings: Partial<AccessibilitySettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings }
        applySettings(updated)
        return updated
      })
    },
    [applySettings],
  )

  // Actualizar una configuración específica
  const updateSetting = useCallback(
    <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
      updateSettings({ [key]: value })
    },
    [updateSettings],
  )

  // Restablecer configuraciones
  const resetSettings = useCallback(() => {
    // Limpiar completamente el body de todas las clases de accesibilidad
    const body = document.body
    const classesToRemove = [
      "accessibility-contrast-high",
      "accessibility-contrast-inverted",
      "accessibility-highlight-links",
      "accessibility-enlarge-text",
      "accessibility-hide-images",
      "accessibility-dyslexia-friendly",
      "accessibility-pause-animations",
      "accessibility-text-align-center",
      "accessibility-text-align-right",
      "accessibility-cursor-large",
      "accessibility-cursor-extra-large",
      "accessibility-saturation-filter",
      "accessibility-menu-open", // Prevenir doble scroll
    ]
    classesToRemove.forEach((className) => {
      body.classList.remove(className)
    })
    // También limpiar las clases dinámicas
    for (let i = 12; i <= 30; i += 2) {
      body.classList.remove(`accessibility-font-size-${i}`)
    }
    for (let i = 10; i <= 20; i++) {
      body.classList.remove(`accessibility-line-height-${i}-${i}`)
    }
    for (let i = 0; i <= 5; i++) {
      body.classList.remove(`accessibility-letter-spacing-${i}`)
    }
    // Asegurar que el scroll del body esté habilitado
    body.style.overflow = ""
    setSettings(defaultSettings)
    applySettings(defaultSettings)
    localStorage.removeItem("accessibilitySettings")
    stopSpeaking() // Detener lectura al resetear
  }, [applySettings, stopSpeaking])

  // Aplicar configuraciones al cargar (solo si no se han cargado desde localStorage)
  useEffect(() => {
    if (isLoaded) {
      const savedSettings = localStorage.getItem("accessibilitySettings")
      if (!savedSettings) {
        applySettings(settings)
      }
    }
  }, [settings, applySettings, isLoaded])

  // Detectar preferencias del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mediaQuery.matches && !settings.pauseAnimations) {
      updateSetting("pauseAnimations", true)
    }
    const contrastQuery = window.matchMedia("(prefers-contrast: high)")
    if (contrastQuery.matches && settings.contrast === "normal") {
      updateSetting("contrast", "high")
    }
  }, [settings, updateSetting])

  // Efecto para el lector de voz (mouseover/mouseout)
  useEffect(() => {
    const handleMouseOver = (event: MouseEvent) => {
      if (!settings.isVoiceReaderActive) return

      const target = event.target as HTMLElement
      // Evitar leer elementos interactivos o vacíos
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        !target.innerText.trim() ||
        currentSpokenElementRef.current === target
      ) {
        return
      }

      if (speakTimeoutRef.current) {
        clearTimeout(speakTimeoutRef.current)
      }

      // Debounce para evitar lecturas rápidas y molestas
      speakTimeoutRef.current = setTimeout(() => {
        stopSpeaking() // Detener cualquier lectura anterior
        speakText(target.innerText)
        currentSpokenElementRef.current = target
      }, 300) // Pequeño retraso para evitar lecturas accidentales
    }

    const handleMouseOut = () => {
      if (settings.isVoiceReaderActive) {
        stopSpeaking()
      }
    }

    if (settings.isVoiceReaderActive) {
      document.body.addEventListener("mouseover", handleMouseOver)
      document.body.addEventListener("mouseout", handleMouseOut)
    } else {
      document.body.removeEventListener("mouseover", handleMouseOver)
      document.body.removeEventListener("mouseout", handleMouseOut)
      stopSpeaking() // Asegurarse de detener la lectura si se desactiva
    }

    return () => {
      document.body.removeEventListener("mouseover", handleMouseOver)
      document.body.removeEventListener("mouseout", handleMouseOut)
      stopSpeaking()
    }
  }, [settings.isVoiceReaderActive, speakText, stopSpeaking])

  // Efecto para la máscara y guía de lectura (mousemove y centrado al activar)
  useEffect(() => {
    // Centrar la franja/línea al activar
    if (settings.isReadingMaskActive) {
      setReadingMaskY(window.innerHeight / 2)
    }
    if (settings.isReadingGuideActive) {
      setReadingGuideY(window.innerHeight / 2)
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (settings.isReadingMaskActive) {
        setReadingMaskY(event.clientY)
      }
      if (settings.isReadingGuideActive) {
        setReadingGuideY(event.clientY)
      }
    }

    if (settings.isReadingMaskActive || settings.isReadingGuideActive) {
      document.body.addEventListener("mousemove", handleMouseMove)
    } else {
      document.body.removeEventListener("mousemove", handleMouseMove)
    }

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove)
    }
  }, [settings.isReadingMaskActive, settings.isReadingGuideActive])

  return {
    settings,
    updateSettings,
    updateSetting,
    resetSettings,
    applySettings,
    readingMaskY, // Exportar para el componente de máscara
    readingGuideY, // Exportar para el componente de guía
  }
}

// Utilidades para accesibilidad
export const AccessibilityUtils = {
  // Anunciar cambios a lectores de pantalla
  announceToScreenReader: (message: string) => {
    const announcement = document.createElement("div")
    announcement.setAttribute("aria-live", "polite")
    announcement.setAttribute("aria-atomic", "true")
    announcement.setAttribute("class", "accessibility-screen-reader-only")
    announcement.textContent = message
    document.body.appendChild(announcement)
    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  },
  // Mejorar el foco de elementos
  enhanceFocus: (element: HTMLElement) => {
    element.style.outline = "3px solid #ffff00"
    element.style.outlineOffset = "2px"
    element.style.boxShadow = "0 0 10px rgba(255, 255, 0, 0.5)"
  },
  // Remover mejoras de foco
  removeFocusEnhancement: (element: HTMLElement) => {
    element.style.outline = ""
    element.style.outlineOffset = ""
    element.style.boxShadow = ""
  },
  // Verificar si las animaciones están pausadas
  areAnimationsPaused: (): boolean => {
    return document.body.classList.contains("accessibility-pause-animations")
  },
  // Obtener nivel de contraste actual
  getCurrentContrast: (): "normal" | "high" | "inverted" => {
    const body = document.body
    if (body.classList.contains("accessibility-contrast-high")) return "high"
    if (body.classList.contains("accessibility-contrast-inverted")) return "inverted"
    return "normal"
  },
}

export default useAccessibility
