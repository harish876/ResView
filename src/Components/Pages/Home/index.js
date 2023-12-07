import React from 'react';
import Wrapper from '../../Shared/Wrapper';
// TODO: Remove the below import and entire components after demo is done
import { anglesDownIcon } from '../../../Resources/Icons';
import { Icon } from '../../Shared/Icon';

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

  return (
    <Wrapper customWidth={"w-full"} style={{ border: "1px solid red" }}>
      <div>
        <ScrollBelow />
      </div>
    </Wrapper>
  );
}

export default index