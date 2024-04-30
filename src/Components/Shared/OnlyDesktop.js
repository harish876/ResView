import React, { useContext } from 'react'
import { ThemeContext } from '../../Context/theme';

const OnlyDesktop = () => {

    const { theme } = useContext(ThemeContext);

    const logo = theme ? 'https://i.postimg.cc/jd6PkhDs/Res-View-Logo-Dark.png' : 'https://i.postimg.cc/Y0dMy9mf/Copy-of-Untitled-Design-removebg-preview.png';

  return (
      <div className='flex items-center justify-center flex-col m-4 p-2 h-[95vh]'>
          <div className="m-2">
              <img
                  src={logo}
                  alt='ResDb View Logo'
                  className='h-100p w-100p'
              />
          </div>
          <div className='dark:text-white text-gray-700 text-18p text-bold flex items-center justify-center text-center'>
              ResView is available only on desktops, Macs and PCs
          </div>
          <div className='mt-2 dark:text-white text-gray-700 flex items-center justify-center text-16p'>
              Please check it out using a laptop!
          </div>
      </div>
  )
}

export default OnlyDesktop