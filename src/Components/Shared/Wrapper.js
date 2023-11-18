import React from 'react'

const Wrapper = ({ children }) => {
  return (
    <div className='w-full h-full'>
        <div className='w-880p border-1p border-solid border-red-50 flex items-center justify-center flex-col'>
            {children}
        </div>
    </div>
  )
}

export default Wrapper