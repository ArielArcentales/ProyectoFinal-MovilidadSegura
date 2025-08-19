import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '8px',
  overflow: 'hidden'
};

// Coordenadas iniciales para centrar el mapa (Quito)
const center = {
  lat: -0.2094847,
  lng: -78.4940086
};

function GoogleLocationPicker({ onLocationSelect }) {
  // Carga el script de Google Maps de forma asíncrona
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY // Carga la API
  });

  const [marker, setMarker] = useState(null);

  // Función del click en el mapa/marcador
  const onMapClick = useCallback((event) => {
    const newMarkerPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setMarker(newMarkerPosition);
    // nueva ubicacion
    onLocationSelect(`${newMarkerPosition.lat.toFixed(6)}, ${newMarkerPosition.lng.toFixed(6)}`);
  }, [onLocationSelect]);

  if (loadError) return <div>Error al cargar el mapa</div>;
  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      onClick={onMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
}

export default React.memo(GoogleLocationPicker);