import React from 'react'
import Wrapper from '../../Shared/Wrapper';
import { data } from './data/data';
import Card from './Card';

const index = () => {
  return (
    <Wrapper>
      <div className='mt-[4em] mb-4 mx-8 grid grid-cols-2 gap-[5em] w-full'>
        {data.length > 0 &&
          data.map((element, index) => (
            <div key={index} data-aos='fade-in' data-aos-delay={100*index}>
              <Card element={element} />
            </div>
          ))}
      </div>
    </Wrapper>
  );
}

export default index; 