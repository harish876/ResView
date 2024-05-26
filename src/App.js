import { Suspense, useContext, useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './Components/Pages/Home';
import Team from './Components/Pages/Team';
import Visualizer from './Components/Pages/Visualizer';
import Footer from './Components/Shared/Footer';
import Loader from './Components/Shared/Loader';
import Navbar from './Components/Shared/Navbar';
import NotFound from './Components/Shared/NotFound';
import OnlyDesktop from './Components/Shared/OnlyDesktop';
import ParticleWrapper from './Components/Shared/ParticleWrapper';
import { AllProviders } from './Context';
import { NavbarToggleContext } from './Context/navbarToggle';
import { ThemeContext } from './Context/theme';
import './Styles/App.css';
import { isMobile } from 'react-device-detect';
import { URL_HOME_PAGE, URL_REROUTE_PAGE, URL_TEAM_PAGE, URL_VISUALIZER_PAGE } from './Constants';

const BorderToggleRef = () => {
  const { bToggleElement } = useContext(NavbarToggleContext);

  return (
    <div className='relative mt-30p' ref={bToggleElement} /> 
  );
}

const PreSynthApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { borderToggle } = useContext(NavbarToggleContext);
  const { toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer);
  // }, []);

  if (localStorage.getItem("theme") === "light") {
    toggleLightTheme();
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    toggleDarkTheme();
    document.documentElement.setAttribute("data-theme", "dark");
  }

  return (
    <>
      <ParticleWrapper setIsLoading={setIsLoading} />
      {isLoading ? (
        <Loader />
      ) : (
          <>
            {isMobile ? (
              <OnlyDesktop />
            ) : (
              <Router>
                <Navbar borderToggle={borderToggle} />
                <BorderToggleRef />
                <Routes>
                    <Route path={`${URL_TEAM_PAGE}`} element={<Team />} />
                    <Route path={`${URL_HOME_PAGE}`} element={<Home />} />
                    <Route path={`${URL_VISUALIZER_PAGE}`} element={<Visualizer />} />
                  <Route path='*' element={<NotFound />} />
                    <Route index element={<Navigate to={`${URL_REROUTE_PAGE}`} />} />
                </Routes>
                <Footer />
              </Router >
            )}
          </>
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
