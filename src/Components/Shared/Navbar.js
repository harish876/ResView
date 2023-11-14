import React, { useContext, useEffect } from 'react'
import cn from 'classnames';
import ResViewLogo from '../../Resources/Images/ResViewLogo.jpg';
import { Icon } from './Icon';
import { linearGraphIcon, teamIcon, sunIcon, moonIcon } from '../../Resources/Icons';
import { Tooltip } from '@mui/material';
import { ThemeContext } from '../../Context';

const SunOrMoon = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Tooltip
      title={cn({ "Light Mode": !theme }, { "Dark Mode": theme })}
      enterDelay={500}
    >
      <div
        className={cn(
          "cursor-pointer",
          {
            "svg-hover-light": !theme,
          },
          {
            "svg-hover-dark": theme,
          }
        )}
        onClick={toggleTheme}
      >
        {!theme ? (
          <Icon fill={"#fdb813"} height={"1.4em"} path={sunIcon} />
        ) : (
          <Icon fill={"#8f9299"} height={"1.4em"} path={moonIcon} />
        )}
      </div>
    </Tooltip>
  );
};

const Navbar = () => {
  return (
    <>
      <div class='w-full max-w-screen-xl rounded-xl bg-white bg-opacity-80 py-2 px-8 text-white shadow-md lg:px-8 lg:py-4 flex items-center justify-between flex-initial'>
        <div
          className='flex items-center justify-start gap-x-4 w-full'
        >
          <a href='/'>
            <img
              src={ResViewLogo}
              alt='ResDb View Logo'
              className='h-50p w-72p rounded-md'
            />
          </a>
          <div className='text-blue-190 text-24p font-sans font-bold'>
            ResDb <span className='italic text-blue-200'>Visualizer</span>
          </div>
        </div>
        <div
          className='flex items-center justify-center gap-x-24 w-full'
        >
          <Tooltip title='Visualizer' enterDelay={500}>
            <a href='/' className='cursor-pointer'>
              <Icon fill={"#8f9299"} height={"1.9em"} path={linearGraphIcon} />
            </a>
          </Tooltip>
          <Tooltip title='Our Team' enterDelay={500}>
            <a href='/pages/team' className='cursor-pointer'>
              <Icon
                fill={"#8f9299"}
                height={"1.8em"}
                path={teamIcon}
                viewBox={"0 0 640 512"}
              />
            </a>
          </Tooltip>
        </div>
        <div className='w-full flex items-center justify-end'>
          <SunOrMoon />
        </div>
      </div>
    </>
  );
}

export default Navbar
