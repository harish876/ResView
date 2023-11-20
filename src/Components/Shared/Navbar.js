import React, { memo, useContext } from 'react'
import cn from 'classnames';
import ResViewLogo from '../../Resources/Images/ResViewLogo.jpg';
import { Icon } from './Icon';
import { linearGraphIcon, teamIcon, sunIcon, moonIcon, blogIcon } from '../../Resources/Icons';
import { Tooltip } from '@mui/material';
import { ThemeContext } from '../../Context';
import { COLOR_LIGHT, ICON_DEFAULT_COLOR, SUN_COLOR } from './Constants';

const navbarPageActiveColor = (currentPage, pageName) => {
  return currentPage === pageName ? COLOR_LIGHT : ICON_DEFAULT_COLOR
};

const LightOrDark = memo(() => {
  const { theme, toggleLightTheme, toggleDarkTheme } = useContext(ThemeContext);

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
        onClick={!theme ? toggleDarkTheme : toggleLightTheme}
      >
        {!theme ? (
          <Icon fill={SUN_COLOR} height={"1.4em"} path={sunIcon} />
        ) : (
          <Icon fill={ICON_DEFAULT_COLOR} height={"1.4em"} path={moonIcon} />
        )}
      </div>
    </Tooltip>
  );
});

const NavLink = ({ title, currentPage, page, icon, iconHeight, iconViewBox }) => (
  <Tooltip title={title} enterDelay={500}>
    <a href={`/pages/${page}`} className='cursor-pointer'>
      <Icon 
        fill={navbarPageActiveColor(currentPage, page)} 
        height={iconHeight} 
        path={icon} 
        viewBox={iconViewBox}
      />
    </a>
  </Tooltip>
);

const Navbar = memo(() => {
  const CURRENT_PAGE = window.location.href.split('/')[4];
  return (
    <>
      <div class='w-full max-w-screen-xl rounded-xl bg-white py-2 px-8 text-white shadow-md lg:px-8 lg:py-4 flex items-center justify-between flex-initial fixed z-20 dark:border-1p dark:border-solid dark:border-gray-50 dark:bg-blue-300'>
        <div
          className='flex items-center justify-start gap-x-4 w-full'
        >
          <a href='/'>
            <img
              src={ResViewLogo}
              alt='ResDb View Logo'
              className='h-40p w-60p rounded-md'
            />
          </a>
          <div className='text-blue-190 text-20p font-sans font-bold'>
            Res <span className='italic text-blue-200'>Viz</span>
          </div>
        </div>
        <div
          className='flex items-center justify-center gap-x-24 w-full'
        >
          <NavLink 
            title={'Visualizer'} 
            currentPage={CURRENT_PAGE}
            page={'visualizer'}
            icon={linearGraphIcon}
            iconHeight={'1.5em'}
          />
          <NavLink 
            title={'Our Team'} 
            currentPage={CURRENT_PAGE}
            page={'team'}
            icon={teamIcon}
            iconHeight={'1.4em'}
            iconViewBox={'0 0 640 512'}
          />
          <NavLink 
            title={'Blog'} 
            currentPage={CURRENT_PAGE}
            page={'blog'}
            icon={blogIcon}
            iconHeight={'1.4em'}
          />
        </div>
        <div className='w-full flex items-center justify-end'>
          <LightOrDark />
        </div>
      </div>
    </>
  );
});

export default Navbar
