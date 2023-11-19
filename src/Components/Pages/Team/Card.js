import React from 'react'

const Card = ({ name, title, socials, profilePic }) => {
  return (
    <div className='w-full h-200p bg-white text-black rounded-md shadow-md dark:border-1p grid grid-cols-2 dark:border-solid dark:border-gray-50 dark:bg-blue-300 dark:text-white'>
      <div className='w-full max-h-180p'>
        <img src={profilePic} alt={`Profile picture of ${name}`} className='object-cover rounded-md' />
      </div>
      <div className='px-5p py-10p flex flex-col items-center justify-start'>
        <div className='truncate text-18p bold text-gray-100'>
          {name}
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Card