import './App.css';
import { useEffect, useState } from 'react';
import Weather from './components/Weather';

function App() {
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCoordinates({ latitude: position.coords.latitude, longitude: position.coords.longitude });
    });
  }, []);


  return (
    <div className="App">
      <Weather coordinates={coordinates} />
    </div>
  );
}

export default App;
