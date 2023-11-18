import React from 'react'

const Card = ({ name, title, socials, profilePic }) => {
  return (
    <div className='w-full h-200p bg-white rounded-md shadow-md'>
      {name}
    </div>
  )
}

export default Card