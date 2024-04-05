import React from 'react'
import Title, { Subtitle } from '../../../../Shared/Title'
import { WHAT_IST_PBFT_SUBTITLE } from '../../../../../Constants'
import { atomIcon } from '../../../../../Resources/Icons'

const index = () => {
  return (
      <div className="flex flex-col items-center jusitfy-center">
          <div className="mb-8">
              <Title title={'What is ResView?'} icon={atomIcon} />
          </div>
          <div>
              <Subtitle subtitle={WHAT_IST_PBFT_SUBTITLE} />
          </div>
          <div className='my-16'>
              
          </div>
      </div>
  )
}

export default index