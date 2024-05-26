import React from "react";

const Wrapper = ({ children }) => {
  return (
    <div className='w-full h-full flex justify-center items-center py-[6em] z-10'>
        <div className='w-920p flex items-center justify-center flex-col'>
            {children}
        </div>
    </div>
  )
}

export const VisualizerWrapper = ({ children }) => {
  return (
    <div className='w-full h-full flex justify-center items-center z-10'>
      <div className='flex items-center justify-center flex-col w-full'>
        {children}
      </div>
    </div>
  );
}

export default Wrapper