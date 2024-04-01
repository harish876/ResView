import React, { useContext } from 'react'
import ParticleBackground from 'react-particle-backgrounds'
import { ThemeContext } from '../../Context/theme'

let settingsBasic = {
  canvas: {
      canvasFillSpace: true,
      useBouncyWalls: false
    },
    particle: {
      particleCount: 80,
      color: "#fff",
      minSize: 1,
      maxSize: 4
    },
    velocity: {
      minSpeed: 0.2,
      maxSpeed: 0.4
    },
    opacity: {
      minOpacity: 0,
      maxOpacity: 0.6,
      opacityTransitionTime: 10000
    }
  }


const Wrapper = ({ children }) => {
  return (
    <div className='w-full h-full flex justify-center items-center py-[6em] z-10'>
        <div className='w-920p flex items-center justify-center flex-col'>
            {children}
        </div>
    </div>
  )
}

export const ParticleWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const settings = theme ? settingsBasic : {
    ...settingsBasic,
    particle: {
      particleCount: 200,
      color: "#0d98db",
      minSize: 1,
      maxSize: 4
    }
  }

  console.log('SETTINGS', settings)
  return (
  <div className='relative'>
        <div className='absolute -z-10 h-full w-full'>
          <ParticleBackground settings={settings} />
        </div>
        {children}
    </div>
  );
};

export default Wrapper