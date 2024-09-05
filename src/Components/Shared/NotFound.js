import React from 'react'
import Wrapper from './Wrapper';
import { URL_HOME_PAGE } from '../../Constants';
import { LinkButton } from './Buttons';

const NotFound = () => {
  return (
    <div className="h-screen">
      <Wrapper>
        <div className='dark:text-white text-gray text-48p font-sans font-bold mt-10p mb-8'>
          Res <span className='text-red-50'>NO</span>{" "}
          <span>View</span>
        </div>
        <div className="flex flex-col items-center justify-center gap-y-2 my-4">
          <div className='text-gray dark:text-white text-36p bold'>Error 404</div>
          <div className='text-gray dark:text-white text-30p bold'>Page Not Found</div>
        </div>
        <div className="mt-8">
          <LinkButton title={'Go Back'} link={URL_HOME_PAGE} external={false} />
        </div>
      </Wrapper>
    </div>
  );
}

export default NotFound