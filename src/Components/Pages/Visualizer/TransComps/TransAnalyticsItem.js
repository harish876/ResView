import React from 'react'

const TransAnalyticsItem = ({ value }) => {
  return (
    <div className='flex flex-col items-center justify-center px-2 py-2 pt-3'>
          <div className={`dark:text-gray-300 text-gray-700 font-semibold text-center text-16p`}>
              {value}
          </div>
          <div>

          </div>
    </div>
  )
}

export default TransAnalyticsItem