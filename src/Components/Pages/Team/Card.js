import React from 'react'

const Card = ({ name, title, socials, profilePic }) => {
  return (
    <div className='w-full h-200p bg-white text-black rounded-md shadow-md dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300 dark:text-white'>
      {name}
    </div>
  )
}

export default Card