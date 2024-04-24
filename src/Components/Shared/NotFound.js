import React from 'react'
import Wrapper from './Wrapper';

const NotFound = () => {
  return (
    <div className="h-screen">
      <Wrapper>
        <div className='dark:text-white text-gray text-48p font-sans font-bold mt-180p'>
          Res <span className='text-red-50'>NO</span>{" "}
          <span>View :P</span>
        </div>
        <div className='my-8 text-gray dark:text-white text-36p bold'>Error 404</div>
        <div className='my-4 text-gray dark:text-white text-30p bold'>Page Not Found</div>
        <a href='/pages/home' className='my-[4em] cursor-pointer border-[2px] border-solid border-blue-190 w-100p h-50p rounded-md text-blue-200 text-18p bold flex items-center justify-center'>
          Go Back
        </a>
      </Wrapper>
    </div>
  );
}

export default NotFound