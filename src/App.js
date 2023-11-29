import Navbar from './Components/Shared/Navbar';
import './Styles/App.css';
import { AllProviders } from './Context';
import Visualizer from './Components/Pages/Visualizer';
import Team from './Components/Pages/Team';
import Home from './Components/Pages/Home';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useContext, useState } from 'react';
import Loader from './Components/Shared/Loader';
import Footer from './Components/Shared/Footer';
import NotFound from './Components/Shared/NotFound';
import { ThemeContext } from './Context/theme';

const PreSynthApp = () => {
  const [isLoading, setIsLoading] = useState(false);

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
      {isLoading ? (
        <Loader />
      ) : (
          <Router>
            <Navbar />
            <Routes>
              <Route path='/pages/visualizer' element={<Visualizer  />} />
              <Route path='/pages/team' element={<Team />} />
              <Route path='/pages/home' element={<Home />} />
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
