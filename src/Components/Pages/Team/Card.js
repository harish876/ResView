import React from 'react'
import defaultProfileImage from '../../../Resources/Images/defaultProfileImage.png';

const Card = ({ name, title, socials, profilePic }) => {
  return (
    <div className='w-full h-200p bg-white text-black rounded-md shadow-md dark:border-1p grid grid-cols-2 dark:border-solid dark:border-gray-50 dark:bg-blue-300 dark:text-white'>
      <div className='w-full h-full flex items-center justify-center'>
        <img
          src={profilePic || defaultProfileImage}
          alt={`Profile pic of ${name}`}
          className='object-contain rounded-md w-full max-h-190p'
        />
      </div>
      <div className='px-5p py-10p flex flex-col items-center justify-start'>
        <div className='truncate text-18p bold text-gray-100'>{name}</div>
        <div></div>
      </div>
    </div>
  );
}

export default Card