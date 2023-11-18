import Navbar from './Components/Shared/Navbar';
import './Styles/App.css';
import { AllProviders } from './Context';
import Visualizer from './Components/Pages/Visualizer';
import Team from './Components/Pages/Team';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Loader from './Components/Shared/Loader';

const PreSynthApp = () => {
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Router>
            <Navbar />
            <Routes>
              <Route path='/pages/visualizer' element={<Visualizer />} />
              <Route path='/pages/team' element={<Team />} />
              <Route index element={<Navigate to="/pages/visualizer" />} />
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
