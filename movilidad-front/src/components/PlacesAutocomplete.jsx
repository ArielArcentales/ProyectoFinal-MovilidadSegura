import React, { useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

// Este componente recibe una etiqueta (label) y una función (onPlaceSelected) de su padre.
function PlacesAutocomplete({ label, onPlaceSelected }) {
  // Usamos una 'ref' para mantener una referencia al objeto de autocompletado.
  const autocompleteRef = useRef(null);

  // Esta función se ejecuta cuando la librería de Google está lista.
  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // Esta función se ejecuta cuando el usuario selecciona una dirección de la lista.
  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      // Obtenemos toda la información del lugar seleccionado.
      const place = autocompleteRef.current.getPlace();
      // Le avisamos al componente padre (el formulario) del lugar que se seleccionó.
      onPlaceSelected(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <div className="input-group">
      <label>{label}</label>
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        // Opcional: restringe la búsqueda a un país (ej. Ecuador)
        options={{ componentRestrictions: { country: 'ec' } }}
      >
        <input
          type="text"
          placeholder="Escribe una dirección..."
          className="modern-form-input" // Reutilizamos nuestro estilo de input
        />
      </Autocomplete>
    </div>
  );
}

export default PlacesAutocomplete;