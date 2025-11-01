import { useState } from 'react';
import axios from 'axios';
import './App.css';

interface ApiResponse {
  status: string;
  message: string;
  video_url: string;
}

function App() {
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateVideo = async () => {
    setIsLoading(true);
    setMessage('Llamando al servidor de Node');

    try {
      const response = await axios.post<ApiResponse>("http://localhost:8000/api/upload");

      console.log('Respuesta recibida: ', response.data);
      setMessage(`Éxito: ${response.data.message} | URL: ${response.data.video_url}`);
    } catch (error) {
      console.error('Error al llamar al backend: ', error);
      if(axios.isAxiosError(error)) {
        setMessage(`Error: ${error.response?.data?.message || 'No se pudo conectar'}`);
      } else {
        setMessage('Error inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi StudyTube App (con TypeScript)</h1>
        <button onClick={handleGenerateVideo} disabled={isLoading}>
          {isLoading ? 'Generando...' : '¡Generar Video de Prueba!'}
        </button>
        {message && <p>{message}</p>}
      </header>
    </div>
  )
}

export default App;