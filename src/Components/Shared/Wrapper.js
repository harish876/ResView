import React from 'react'
import ParticleBackground from 'react-particle-backgrounds'

const settings = {
  canvas: {
      canvasFillSpace: true,
      useBouncyWalls: false
    },
    particle: {
      particleCount: 50,
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