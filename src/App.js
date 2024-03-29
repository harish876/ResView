import Navbar from './Components/Shared/Navbar';
import './Styles/App.css';
import { AllProviders } from './Context';
import Visualizer from './Components/Pages/Visualizer';
import Team from './Components/Pages/Team';
import Home from './Components/Pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useContext, useState, useRef, useCallback, useEffect } from 'react';
import Loader from './Components/Shared/Loader';
import Footer from './Components/Shared/Footer';
import NotFound from './Components/Shared/NotFound';
import { ThemeContext } from './Context/theme';
import { NavbarToggleContext } from './Context/navbarToggle';
import Dashboard from './Components/Pages/Dashboard';

const BorderToggleRef = () => {
  const { bToggleElement } = useContext(NavbarToggleContext);

  return (
    <div className='relative mt-30p' ref={bToggleElement} /> 
  );
}

const PreSynthApp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { borderToggle } = useContext(NavbarToggleContext);
  const { toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (localStorage.getItem("theme") === "light") {
    toggleLightTheme();
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    toggleDarkTheme();
    document.documentElement.setAttribute("data-theme", "dark");
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
          <Router>
            <Navbar borderToggle={borderToggle} />
            <BorderToggleRef />
            <Routes>
              {/* // TODO: Uncomment the below after dashboard is removed */}
              {/* <Route path='/pages/visualizer' element={<Visualizer  />} /> */}
              <Route path='/pages/team' element={<Team />} />
              <Route path='/pages/home' element={<Home />} />

              {/* // TODO: REMOVE THE BELOW AND DELETE THE DASHBOARD FOLDER AFTER VISUALIZER IS COMPLETE */}
              <Route path='/pages/visualizer' element={<Dashboard />} />

              <Route path='*' element={<NotFound  />} />
              <Route index element={<Navigate to="/pages/home" />} />
            </Routes>
            <Footer />
          </Router>
      )}
    </>
  );
}

function App(){
  return (
      <AllProviders>
        <Suspense fallback={<Loader />}>
          <PreSynthApp />
        </Suspense>
      </AllProviders>
  );
};

export default App;
