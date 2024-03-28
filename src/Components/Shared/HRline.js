import React from 'react'
import { Icon } from './Icon'
import { circleIcon } from '../../Resources/Icons'

const HRline = () => {
  return (
      <div className="flex items-center justify-center w-full">
          <Icon path={circleIcon} viewBox={'0 0 384 512'} height={'13px'} />
          <div className='w-full border-dashed border-2p dark:border-gray-700' />
          <Icon path={circleIcon} viewBox={'0 0 384 512'} height={'13px'} />
      </div>
  )
}

export default HRline