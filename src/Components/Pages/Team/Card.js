import React from 'react'
import defaultProfileImage from '../../../Resources/Images/defaultProfileImage.png';
import { Icon } from '../../Shared/Icon';
import { githubIcon, linkedinIcon, instagramIcon } from "../../../Resources/Icons";
import { ICON_DEFAULT_COLOR } from '../../Shared/Constants';

const linkToIcon = {
  github: githubIcon,
  linkedin: linkedinIcon,
  ig: instagramIcon
};

const indexToSocial = {
  1: 'linkedin',
  2: 'github',
  0: 'ig'
};

const LinkIcon = ({ link, social }) => {
  return (
    <a href={link} target='_blank' rel='noreferrer nofollow' className='cursor-pointer'>
      <Icon
        fill={ICON_DEFAULT_COLOR}
        path={linkToIcon[social]}
        height={'1.5em'}
      />
    </a>
  );
};

export const CurrentTeamCard = ({ element }) => {
  const { name, title, socials, profilePic, quote } = element;
  return (
    <div className='w-full h-250p text-black rounded-md border-3p border-gray-700 grid grid-cols-2 gap-x-4 dark:border-solid dark:border-gray-50 bg-blue-10 dark:bg-blue-500 dark:text-white px-4 py-6 hover:scale-105 transition'>
      <div className='w-full h-full flex items-center justify-center'>
        <img
          src={profilePic || defaultProfileImage}
          alt={`Profile pic of ${name}`}
          className='object-fit rounded-md w-full'
        />
      </div>
      <div className='py-10p flex flex-col items-center justify-evenly gap-y-4'>
        <div className='truncate text-20p bold text-black max-w-200p dark:text-white font-bold'>
          {name}
        </div>
        <div className='text-14p'>{title}</div>
        <div className='text-14p italic'>"{quote}"</div>
        <div className='flex items-center justify-between gap-x-6'>
          {socials.length > 0 &&
            socials.map((element, index) => (
              <LinkIcon
                key={index}
                link={element}
                social={indexToSocial[index]}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export const PastMembersCard = ({ element }) => {
  const { name, profilePic, title, socials } = element;
  return (
    <div className='w-full h-auto text-black rounded-md  border-3p border-gray-700 flex flex-col gap-x-2 dark:border-solid dark:border-gray-50 dark:bg-blue-500 dark:text-white px-2 py-4 hover:scale-105 transition'>
      <div className='w-full h-full flex items-center justify-center rounded-lg'>
        <img
          src={profilePic || defaultProfileImage}
          alt={`Profile pic of ${name}`}
          className='object-contain rounded-lg h-135p w-150p'
        />
      </div>
      <div className='py-10p flex flex-col items-center justify-evenly gap-y-4 mt-4'>
        <div className='truncate text-20p bold text-black max-w-250p dark:text-white'>
          {name}
        </div>
        <div className='truncate text-14p bold text-black max-w-250p dark:text-white'>
          {title}
        </div>
        <div className='flex items-center justify-between gap-x-6'>
          {socials.length > 0 &&
            socials.map((element, index) => (
              <div key={index}>
                {element.length > 0 ? (
                  <LinkIcon
                    link={element}
                    social={indexToSocial[index]}
                  />
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
