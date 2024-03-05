import classNames from 'classnames'
import React from 'react'
import { loadingPartialBueIcon } from '../../Resources/Icons'
import { Link } from 'react-router-dom'

const LINK_BUTTON_CLASSES = "relative flex h-11 w-220p items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border-3p before:border-blue-500 before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark: before:border-gray-700 dark:before:bg-gray-800 sm:w-max cursor-pointer"

export const LinkButton = ({ title, link, external, scrollId }) => {
    const handleClick = () => {
        const element = document.getElementById(scrollId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest' 
            });
        }
    };
  return (
      <div onClick={scrollId ? handleClick : null} className={LINK_BUTTON_CLASSES}>
        {external ? (
            <a href={link} target='_blank' rel='noreferrer nofollow'>
                <span className="relative text-base font-semibold text-primary dark:text-white">{title}</span >
            </a>
        ) : (
            <Link
              to = { link }
            >
              <span className = "relative text-base font-semibold text-primary dark:text-white">{ title }</span >
          </Link >
        )}
    </div>
  )
}

export const SubmitButton = ({ title, loading }) => {
    return (
        <>
            <button disabled type="button" className={classNames(
                'py-2.5 px-5 me-2 text-sm font-medium w-120p flex items-center justify-center bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center',
                { 'cursor-not-allowed text-gray-300 dark:text-gray-400': loading },
                { 'cursor-pointer text-gray-900 dark:text-white': !loading }
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