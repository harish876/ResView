import React, {useState} from 'react'
import Wrapper from '../../Shared/Wrapper'
import { WebSocketDemo } from '../../../Socket'

const index = () => {
  let messageHistory={};

  const onMessage = (newData)=>{
    messageHistory = newData;

    console.log(messageHistory, 'MESSAGE HISTORY')
  };

  return (
    <Wrapper>
        { <div className='text-black dark:text-white text-22p'>
            <WebSocketDemo onMessage = {onMessage}/>
        </div>}
    </Wrapper>
  )
}

export default index