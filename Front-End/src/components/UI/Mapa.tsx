import { useEffect } from "react";

declare global {
  interface Window {
    initMap: () => void;
  }
  
}

export default function Mapa() {
  useEffect(() => {
    // Inicializamos el mapa
    window.initMap = () => {
      const location = { lat: -0.9677, lng: -80.7089 }; // Coordenadas de Manta, Ecuador

      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: location,
        zoom: 16,
      });

      // Marcador
      new google.maps.Marker({
        position: location,
        map,
        title: "Universidad Laica Eloy Alfaro de Manabí",
      });
    };

    // Cargamos el script de Google Maps
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCt9j5eIlnTN2YmJYDe9NhNGeJW-uRw1Zo&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: "0 0 0.75rem 0.75rem", // bordes redondeados
      }}
    />
  );
}
