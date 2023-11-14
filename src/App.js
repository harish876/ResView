import Navbar from './Components/Shared/Navbar';
import './Styles/App.css';
import { AllProviders } from './Context';
import Visualizer from './Components/Pages/Visualizer';
import Team from './Components/Pages/Team';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from 'react';
import Loader from './Components/Shared/Loader';

const PreSynthApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Router>
            <Routes>
              {/* TODO: Change the path for the visualizer below */}
              <Route path='/pages/visualizer' element={<Visualizer />} />
              <Route path='/pages/team' element={<Team />} />
            </Routes>
          </Router>
        </>
      )}
    </>
  );
}

function App(){
  return (
      <AllProviders>
        <PreSynthApp />
      </AllProviders>
  );
};

export default App;
