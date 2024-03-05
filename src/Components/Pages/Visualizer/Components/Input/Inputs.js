import cn from 'classnames'
import React from 'react'

const BaseInput = ({ mandatory, title, errorMessage, error }) => {
  return (
    <>
      <div class="mb-6">
        <div for="default-input" className={cn(
          "block mb-2 text-sm font-medium flex items-center justify-center",
          {'text-red-700 dark:text-red-500': error},
          {'text-gray-900 dark:text-white': !error},
        )}>{title ?? 'Title'}</div>
        <input type="text" id="default-input" className={cn(
          "bg-gray-50 border-2p text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-212p p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          {'dark:border-gray-600 border-gray-300': !error},
          {'dark:border-red-500 border-reg-500': error}
        )} />
        {error && (
          <div className="mt-2 text-sm text-red-600 dark:text-red-500 font-medium">
            {errorMessage ?? 'Field cannot be empty'}
          </div>
        )}
      </div>
    </>
  )
}

export default BaseInput