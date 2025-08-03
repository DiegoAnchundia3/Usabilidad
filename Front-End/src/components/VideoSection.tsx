"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { Play, Pause, Volume2, VolumeX, Download, Subtitles, Languages, Maximize, Minimize, Type } from "lucide-react"
import { Button } from "./UI/button"
import { Card, CardContent, CardHeader, CardTitle } from "./UI/card"
import jsPDF from "jspdf"

// Subtítulos con timestamps exactos y divididos por palabras/frases
const subtitleTracks = {
  es: [
    { start: 29, end: 34, text: "Adoptar o rescatar una mascota es uno de los momentos más importantes en tu vida." },
    { start: 56, end: 60, text: "Aunque no lo creas, se generará un vínculo especial entre él y tú." },
    {
      start: 62,
      end: 70,
      text: "Por eso, la mascota que elijas debe ser esa con la que te identifiques desde el corazón, considerando tu ritmo y estilo de vida.",
    },
    {
      start: 72,
      end: 85,
      text: "Tendrás que organizarte para alimentarlo, pasearlo, visitar el veterinario, cuidar su espacio. Pero todo valdrá la pena. Tienes la oportunidad de cambiarle la vida a un peludo lleno de amor, listo para ser tu gran amigo.",
    },
  ],
  en: [
    { start: 29, end: 34, text: "Adopting or rescuing a pet is one of the most important moments in your life." },
    { start: 56, end: 60, text: "Believe it or not, a special bond will form between you and your new companion." },
    {
      start: 62,
      end: 70,
      text: "That's why the pet you choose should be the one you truly connect with from the heart, considering your pace and lifestyle.",
    },
    {
      start: 72,
      end: 85,
      text: "You'll need to plan for feeding, walking, vet visits, and taking care of their space. But it will all be worth it. You have the chance to change the life of a furry friend full of love, ready to become your best companion.",
    },
  ],
}

const fullTranscripts = {
  es: "Adoptar o rescatar una mascota es uno de los momentos más importantes en tu vida. Aunque no lo creas, se generará un vínculo especial entre él y tú. Por eso, la mascota que elijas debe ser esa con la que te identifiques desde el corazón, considerando tu ritmo y estilo de vida. Tendrás que organizarte para alimentarlo, pasearlo, visitar el veterinario, cuidar su espacio. Pero todo valdrá la pena. Tienes la oportunidad de cambiarle la vida a un peludo lleno de amor, listo para ser tu gran amigo.",
  en: "Adopting or rescuing a pet is one of the most important moments in your life. Believe it or not, a special bond will form between you and your new companion. That's why the pet you choose should be the one you truly connect with from the heart, considering your pace and lifestyle. You'll need to plan for feeding, walking, vet visits, and taking care of their space. But it will all be worth it. You have the chance to change the life of a furry friend full of love, ready to become your best companion.",
}

// Tamaños de subtítulos con clases de Tailwind
const subtitleSizes = {
  small: {
    name: "Pequeño",
    class: "text-sm",
    fullscreenClass: "text-base",
  },
  medium: {
    name: "Mediano",
    class: "text-base",
    fullscreenClass: "text-lg",
  },
  large: {
    name: "Grande",
    class: "text-lg",
    fullscreenClass: "text-2xl",
  },
}

export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [subtitleLanguage, setSubtitleLanguage] = useState<"es" | "en">("es")
  const [subtitleSize, setSubtitleSize] = useState<"small" | "medium" | "large">("medium")
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentSubtitle, setCurrentSubtitle] = useState("")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [volume, setVolume] = useState(1)
  const [videoInitialized, setVideoInitialized] = useState(false)
  const [showSubtitleSettings, setShowSubtitleSettings] = useState(false)

  // Función para mostrar subtítulos progresivos
  const getProgressiveSubtitle = useCallback((subtitle: any, currentTime: number) => {
    if (!subtitle) return ""

    const progress = (currentTime - subtitle.start) / (subtitle.end - subtitle.start)
    const words = subtitle.text.split(" ")
    const wordsToShow = Math.ceil(words.length * Math.min(progress, 1))

    return words.slice(0, wordsToShow).join(" ")
  }, [])

  // Actualizar subtítulo actual
  useEffect(() => {
    if (showSubtitles && videoInitialized) {
      const currentTrack = subtitleTracks[subtitleLanguage]
      const activeSubtitle = currentTrack.find(
        (subtitle) => currentTime >= subtitle.start && currentTime <= subtitle.end,
      )

      if (activeSubtitle) {
        setCurrentSubtitle(getProgressiveSubtitle(activeSubtitle, currentTime))
      } else {
        setCurrentSubtitle("")
      }
    } else {
      setCurrentSubtitle("")
    }
  }, [currentTime, showSubtitles, subtitleLanguage, getProgressiveSubtitle, videoInitialized])

  // Controles de teclado (solo cuando el video está inicializado)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current || !videoInitialized) return

      switch (e.code) {
        case "Space":
          e.preventDefault()
          togglePlay()
          break
        case "ArrowRight":
          e.preventDefault()
          videoRef.current.currentTime = Math.min(videoRef.current.currentTime + 5, duration)
          break
        case "ArrowLeft":
          e.preventDefault()
          videoRef.current.currentTime = Math.max(videoRef.current.currentTime - 5, 0)
          break
        case "KeyF":
          e.preventDefault()
          toggleFullscreen()
          break
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [duration, videoInitialized])

  // Detectar cambios de pantalla completa
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const initializeVideo = () => {
    console.log("Inicializando video...")
    setVideoInitialized(true)

    // Opcional: reproducir automáticamente después de inicializar
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(console.error)
      }
    }, 100)
  }

  const togglePlay = () => {
    if (videoRef.current && videoInitialized) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
  }

  const changeSubtitleLanguage = () => {
    setSubtitleLanguage(subtitleLanguage === "es" ? "en" : "es")
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen()
      } else {
        await document.exitFullscreen()
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleVolumeChange = (newVolume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setVolume(newVolume)
      setIsMuted(newVolume === 0)
    }
  }

  // Click en la barra de progreso para buscar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !progressBarRef.current || !videoInitialized) return

    const rect = progressBarRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    const newTime = percentage * duration

    videoRef.current.currentTime = newTime
  }

  // Click en el video para pausar/reproducir o inicializar
  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!videoInitialized) {
      initializeVideo()
    } else {
      togglePlay()
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const downloadTranscript = () => {
    const doc = new jsPDF()
    doc.setFont("helvetica", "normal")
    doc.setFontSize(18)
    doc.text("Video Transcript - Adopción de Mascotas", 20, 30)

    doc.setFontSize(14)
    doc.text("Español:", 20, 50)
    doc.setFontSize(11)
    const spanishLines = doc.splitTextToSize(fullTranscripts.es, 170)
    doc.text(spanishLines, 20, 65)

    const spanishHeight = spanishLines.length * 5
    const englishStartY = 80 + spanishHeight

    doc.setFontSize(14)
    doc.text("English:", 20, englishStartY)
    doc.setFontSize(11)
    const englishLines = doc.splitTextToSize(fullTranscripts.en, 170)
    doc.text(englishLines, 20, englishStartY + 15)

    // Agregar timestamps
    doc.addPage()
    doc.setFontSize(16)
    doc.text("Timestamps", 20, 30)
    doc.setFontSize(10)
    let yPos = 45

    subtitleTracks.es.forEach((subtitle, index) => {
      const timeText = `${formatTime(subtitle.start)} - ${formatTime(subtitle.end)}: ${subtitle.text}`
      const lines = doc.splitTextToSize(timeText, 170)
      doc.text(lines, 20, yPos)
      yPos += lines.length * 4 + 3
    })

    doc.save("video-transcript-adopcion-mascotas.pdf")
  }

  // Obtener la clase de tamaño correcta
  const getSubtitleSizeClass = () => {
    const sizeConfig = subtitleSizes[subtitleSize]
    return isFullscreen ? sizeConfig.fullscreenClass : sizeConfig.class
  }

  return (
    <div className="mt-16 mb-8">
      <Card className="bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/20 overflow-hidden">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-3xl font-bold text-gray-900 flex items-center justify-center gap-3">
            <Play className="h-8 w-8 text-purple-600" />
            Conoce Más Sobre la Adopción
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Descubre la importancia de adoptar una mascota y cómo puede cambiar tu vida
          </p>
        </CardHeader>

        <CardContent className="p-6">
          <div
            ref={containerRef}
            className={`relative max-w-4xl mx-auto ${isFullscreen ? "w-screen h-screen max-w-none bg-black flex items-center justify-center" : ""}`}
          >
            {/* Video Player */}
            <div
              className={`relative bg-black rounded-xl overflow-hidden shadow-2xl ${isFullscreen ? "w-full h-full rounded-none" : ""}`}
            >
              <video
                ref={videoRef}
                className={`w-full object-contain ${videoInitialized ? "cursor-pointer" : ""} ${isFullscreen ? "h-full" : "h-auto max-h-[500px]"}`}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onClick={handleVideoClick}
              >
                <source src="/videos/videoInicioAdopta.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>

              {/* Overlay inicial del video */}
              {!videoInitialized && (
                <div
                  className="absolute inset-0 bg-black/80 flex items-center justify-center cursor-pointer group hover:bg-black/70 transition-all duration-300 z-10"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    initializeVideo()
                  }}
                >
                  <div className="text-center pointer-events-none">
                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                      <Play className="h-10 w-10 text-white ml-1" />
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-2">Reproducir Video</h3>
                    <p className="text-white/80 text-sm">Haz clic para comenzar a ver el video sobre adopción</p>
                  </div>
                </div>
              )}

              {/* Subtítulos progresivos con tamaño dinámico */}
              {showSubtitles && currentSubtitle && videoInitialized && (
                <div
                  className={`absolute left-4 right-4 bg-black/90 text-white p-4 rounded-lg text-center transition-all duration-200 ${
                    isFullscreen ? "bottom-24" : "bottom-16"
                  } ${getSubtitleSizeClass()}`}
                >
                  <p className="leading-relaxed font-medium">{currentSubtitle}</p>
                </div>
              )}

              {/* Indicador de tiempo */}
              {videoInitialized && (
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              )}

              {/* Controles personalizados */}
              {videoInitialized && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                  {/* Barra de progreso clickeable */}
                  <div
                    ref={progressBarRef}
                    className="w-full bg-white/20 rounded-full h-2 mb-4 cursor-pointer hover:h-3 transition-all duration-200"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="bg-purple-500 h-full rounded-full transition-all duration-100 relative"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    >
                      <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        onClick={togglePlay}
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                      >
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>

                      <Button
                        onClick={toggleMute}
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                      >
                        {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                      </Button>

                      {/* Control de volumen */}
                      <div className="flex items-center gap-2">
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => handleVolumeChange(Number.parseFloat(e.target.value))}
                          className="w-20 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${volume * 100}%, rgba(255,255,255,0.2) ${volume * 100}%, rgba(255,255,255,0.2) 100%)`,
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        onClick={toggleSubtitles}
                        size="sm"
                        className={`${
                          showSubtitles ? "bg-purple-600 hover:bg-purple-700" : "bg-white/20 hover:bg-white/30"
                        } text-white border-none transition-all duration-200`}
                      >
                        <Subtitles className="h-4 w-4" />
                      </Button>

                      {showSubtitles && (
                        <>
                          <Button
                            onClick={changeSubtitleLanguage}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white border-none transition-all duration-200"
                          >
                            <Languages className="h-4 w-4 mr-1" />
                            {subtitleLanguage.toUpperCase()}
                          </Button>

                          {/* Configuración de subtítulos */}
                          <div className="relative">
                            <Button
                              onClick={() => setShowSubtitleSettings(!showSubtitleSettings)}
                              size="sm"
                              className="bg-gray-600 hover:bg-gray-700 text-white border-none transition-all duration-200"
                            >
                              <Type className="h-4 w-4" />
                            </Button>

                            {/* Panel de configuración de subtítulos */}
                            {showSubtitleSettings && (
                              <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-lg p-4 min-w-[200px] border border-white/20 z-50">
                                <h4 className="text-white font-medium mb-3 text-sm">Tamaño de Subtítulos</h4>
                                <div className="space-y-2">
                                  {Object.entries(subtitleSizes).map(([key, size]) => (
                                    <button
                                      key={key}
                                      onClick={() => {
                                        console.log(`Cambiando tamaño a: ${key}`) // Debug
                                        setSubtitleSize(key as "small" | "medium" | "large")
                                        setShowSubtitleSettings(false)
                                      }}
                                      className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                                        subtitleSize === key
                                          ? "bg-purple-600 text-white"
                                          : "text-white/80 hover:bg-white/10"
                                      }`}
                                    >
                                      {size.name}
                                    </button>
                                  ))}
                                </div>
                                <div className="mt-3 pt-3 border-t border-white/20">
                                  <p className="text-white/60 text-xs">Actual: {subtitleSizes[subtitleSize].name}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </>
                      )}

                      <Button
                        onClick={toggleFullscreen}
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-none"
                      >
                        {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Información de controles (solo cuando no está en pantalla completa y está inicializado) */}
            {!isFullscreen && videoInitialized && (
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>
                  <strong>Controles:</strong> Espacio = Play/Pausa | ← → = Retroceder/Avanzar 5s | F = Pantalla completa
                  | Click en video = Play/Pausa
                </p>
              </div>
            )}

            {/* Botón de descarga */}
            {!isFullscreen && (
              <div className="mt-6 text-center">
                <Button
                  onClick={downloadTranscript}
                  className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-3"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Descargar Transcript Completo (ES/EN)
                </Button>
                <p className="text-sm text-gray-600 mt-2">Incluye texto completo y timestamps exactos</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
