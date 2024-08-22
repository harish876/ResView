import React, { useContext } from 'react'
import { NormalButton } from '../../../../Shared/Buttons'
import { VizDataHistoryContext } from '../../../../../Context/visualizer'

const Carousel = ({ onNext, onPrev, nextDisabled, prevDisabled, currentData, startRecord, endRecord }) => {

  const { loading, totalHistoryLength } = useContext(VizDataHistoryContext)


  return (
      <div className="flex items-center justify-between px-8 border-t-1p border-gray-700 dark:border-gray-50 h-40p" aria-label="Table navigation">
        {loading ? (
          <div className='w-120p h-3 px-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
        ) : (
          <div className='flex items-center justify-center h-full'>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">{`${startRecord}-${endRecord}`}</span> of <span className="font-semibold text-gray-900 dark:text-white">
              {totalHistoryLength ?? 'N/A'}
            </span></span>
          </div>
        )}
        <div className="flex items-center justify-center gap-x-10 pt-1">
          <NormalButton title={'Previous'} onClick={onPrev} disabled={prevDisabled || loading} />
          <NormalButton title={'Next'} onClick={onNext} disabled={nextDisabled || loading} />
        </div>
      </div>
  )
}

export default Carousel