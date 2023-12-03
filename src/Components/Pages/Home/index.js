import React, {useState} from 'react'
import Wrapper from '../../Shared/Wrapper'
// TODO: Remove the below import and entire components after demo is done
import { WebSocketDemo } from '../../../Socket'
import homePageBackground from '../../../Resources/Images/homePageBackground.png'
import { Icon } from '../../Shared/Icon';
import { anglesDownIcon } from '../../../Resources/Icons';
import axios from 'axios';

const ScrollBelow = () => {
  return (
    <div className='flex flex-col items-center justify-center hover:text-blue-200 cursor-pointer text-gray dark:text-white'>
      <div className='text-20p bold mb-10p'>Scroll</div>
      <div>
        <Icon
          path={anglesDownIcon}
          fill={"gray"}
          height={"1.8em"}
          viewBox={"0 0 448 512"}
        />
      </div>
    </div>
  );
};

const index = () => {
  let messageHistory={};

  const onMessage = (newData)=>{
    messageHistory = newData;

    console.log(messageHistory, 'MESSAGE HISTORY')
  };

  const sendGet = async () => {
    let key = 'key1';
    let url = 'http://127.0.0.1:18000/v1/transactions/' + key;
    try{
      const response= await axios.get(url);
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  const sendPost = async () => {
    let key = 'key1';
    let value = 'value1';
    let data = {"id": key, "value": value};
    let url = 'http://127.0.0.1:18000/v1/transactions/commit';
    try{
      const response = await axios.post(
        url,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      console.log("Get response: ", response.data);
    }
    catch(error){
      console.error("Error: ", error);
    }
  };

  return (
    <Wrapper customWidth={"w-full"} style={{ border: "1px solid red" }}>
      <div>
        <ScrollBelow />
      </div>
    </Wrapper>
  );
}

export default index