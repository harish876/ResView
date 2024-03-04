import React from 'react'
import { loadingPartialBueIcon } from '../../../../../Resources/Icons'
import classNames from 'classnames'

const SubmitButton = ({ title, loading }) => {
  return (
     <>
          <button disabled type="button" className={classNames(
              'py-2.5 px-5 me-2 text-sm font-medium w-120p flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center',
              {'cursor-not-allowed text-gray-300 dark:text-gray-400': loading},
              {'cursor-pointer text-gray-900 dark:text-white': !loading}
              )}>
            {loading && (
                <div className='mb-1p'>
                    {loadingPartialBueIcon}
                </div>
            )}
              {title ?? 'Submit'}
          </button>
     </>
  )
}

export default SubmitButton