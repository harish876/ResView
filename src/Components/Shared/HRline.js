import React from 'react'
import { circleIcon } from '../../Resources/Icons'
import { Icon } from './Icon'

const HRline = () => {
  return (
      <div className="flex items-center justify-center w-full">
      <Icon path={circleIcon} viewBox={'0 0 384 512'} height={'13px'} fill={'gray'} />
      <div className='w-full border-dashed border-1p dark:border-2p border-gray-400 dark:border-gray-700' />
      <Icon path={circleIcon} viewBox={'0 0 384 512'} height={'13px'} fill={'gray'} />
      </div>
  )
}

export default HRline