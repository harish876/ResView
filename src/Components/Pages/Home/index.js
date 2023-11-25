import React from 'react'
import Wrapper from '../../Shared/Wrapper'
import { WebSocketDemo } from '../../../Socket'

const index = () => {
  return (
    <Wrapper>
        { <div className='text-black dark:text-white text-22p'>
            <WebSocketDemo />
        </div>}
    </Wrapper>
  )
}

export default index