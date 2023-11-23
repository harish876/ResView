import React from 'react'
import Wrapper from './Wrapper';

const Footer = () => {
  return (
    <div className='w-full h-full flex justify-center items-center z-10 my-8'>
    <div className='flex flex-col items-center justify-center'>
        <div className='text-12p text-gray-100 bold py-[-6em]'>
        Handcrafted with &#10084; by{" "}
        <span className='hover:text-blue-190'>
            <a href='/pages/team'>
            The Res <span className='italic'>View</span> Team
            </a>
        </span>
        </div>
        <div className='text-12p text-gray-100 bold my-4p'>@ UC Davis</div>
        <div className='text-12p text-gray-100 bold'>
        v1.1 &middot; &copy; 2023 &middot; All rights reserved
        </div>
    </div>
    </div>
  );
}

export default Footer