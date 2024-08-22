import React from 'react'

const AnalyticsItem = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center justify-center px-2 py-2 pt-3 gap-y-4'>
          <div className={`dark:text-gray-300 text-gray-700 font-semibold text-center text-20p`}>
              {value}
          </div>
      <div className='dark:text-gray-300 text-gray-700 text-14p'>
            {title}
          </div>
    </div>
  )
}

export default AnalyticsItem