import React from 'react'
import { WHAT_IS_RESVIEW } from '../../../../../Constants'
import { eyeIcon } from '../../../../../Resources/Icons'
import Title, { Subtitle } from '../../../../Shared/Title'

const index = () => {
  return (
      <div className="flex flex-col items-center jusitfy-center">
          <div className="mb-8">
              <Title title={'What is ResView?'} icon={eyeIcon} iconViewBox={'0 0 576 512'} />
          </div>
          <div>
              <Subtitle subtitle={WHAT_IS_RESVIEW} />
          </div>
          <div className='my-16'>
              
          </div>
      </div>
  )
}

export default index