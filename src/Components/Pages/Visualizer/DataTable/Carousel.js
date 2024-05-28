import React from 'react'
import { NormalButton } from '../../../Shared/Buttons'

const Carousel = () => {
    const onNext = () => {

    };

    const onPrevious = () => {

    }

  return (
    <>
          <div className="flex items-center justify-between px-8 border-t-1p border-gray-700 dark:border-gray-50 h-40p" aria-label="Table navigation">
              <div className='flex items-center justify-center h-full'>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">20</span></span>
              </div>
              <div className="flex items-center justify-center gap-x-10 pt-1">
                  <NormalButton title={'Previous'} onClick={onPrevious} />
                  <NormalButton title={'Next'} onClick={onNext} />
              </div>
          </div>
    </>
  )
}

export default Carousel