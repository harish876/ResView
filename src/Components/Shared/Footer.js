import React from 'react';

import ucDavisLogo from '../../Resources/Images/ucDavisLogo.svg'
import expolabLogo from '../../Resources/Images/expolabIcon.png'
import apacheIncubatorLogo from '../../Resources/Images/apacheIncubatorLogo.png'
import resdbLogo from '../../Resources/Images/resdbLogo.svg'
import { APACHE_LINK, AUNSH_PORTFOLIO_LINK, EXPOLAB_LINK, RELEASE_NOTES_LINK, REPO_LINK, RESDB_LINK, SP_PORTFOLIO_LINK, UCDAVS_LINK, URL_HOME_PAGE, URL_TEAM_PAGE, URL_VISUALIZER_PAGE } from '../../Constants';

export const DetailedFooter = () => {
  return (
    <div className="w-full h-auto pt-8 pb-2 px-8 mt-28 border-t-2 border-gray-900 dark:border-white transition">
      <div className="flex items-start md:flex-row justify-between">
        <div className="grid grid-cols-2 gap-16">
		  <a href={RESDB_LINK} rel='noreferrer nofollow' target='_blank'>
			<img src={resdbLogo} alt="UC Davis Logo" className="w-120p" />
		  </a>
			<a href={EXPOLAB_LINK} rel='noreferrer nofollow' target='_blank'>
				<img src={expolabLogo} alt="UC Davis Logo" className="w-120p" />
			</a>
			<a href={APACHE_LINK} rel='noreferrer nofollow' target='_blank'>
				<img src={apacheIncubatorLogo} alt="UC Davis Logo" className="w-120p bg-white px-2 py-1 rounded-md" />
			</a>
			<a href={UCDAVS_LINK} rel='noreferrer nofollow' target='_blank'>
				<img src={ucDavisLogo} alt="UC Davis Logo" className="w-120p" />
			</a>
        </div>
        <div className="grid grid-cols-3 gap-12">
          <div>
            <div className="text-16p font-bold mb-4 text-gray-900 dark:text-white">Site Links</div>
            <ul className="space-y-5">
              <li><a href={URL_HOME_PAGE} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">Home</a></li>
              <li><a href={URL_TEAM_PAGE} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">Team</a></li>
              <li><a href={REPO_LINK} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">Code</a></li>
              <li><a href={URL_VISUALIZER_PAGE} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">Visualizer</a></li>
            </ul>
          </div>
          <div>
            <div className="text-16p font-bold mb-6 text-gray-900 dark:text-white">Authors</div>
            <ul className="space-y-5">
				<li><a href={AUNSH_PORTFOLIO_LINK} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">aunshx</a></li>
              <li><a href={SP_PORTFOLIO_LINK} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">saipranav</a></li>
            </ul>
            <div className="text-16p font-bold mt-6 mb-2 text-gray-900 dark:text-white">Release</div>
				<a href={RELEASE_NOTES_LINK} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">v3.2.5</a>
          </div>
          <div>
            <div className="text-16p font-bold mb-6 text-gray-900 dark:text-white">Contact Us</div>
            <ul className="space-y-5">
              <li><a href="mailto:aunsh@ucdavis.edu" className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">Mail Us</a></li>
              <li><a href={UCDAVS_LINK} className="text-gray-900 dark:text-white dark:hover:text-gray-300 hover:text-blue-190 transition duration-200">UC Davis Site</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full my-2 flex flex-col gap-1 text-12p">
        <div className="text-gray-100 text-center">
          Handcrafted with &#10084; in Davis, CA
        </div>
        <div className="text-gray-100 text-center">
          v3.2.5 &middot; &copy; 2023-2024 &middot; All rights reserved
        </div>
        <div />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className='w-full h-full flex justify-center items-center z-10 my-8'>
    <div className='flex flex-col items-center justify-center'>
        <div className='text-12p text-gray-100 bold py-[-6em]'>
        Handcrafted with &#10084;
        <span className='hover:text-blue-190 mx-1'>
            @ UC Davis
        </span>
        </div>
        <div className='text-12p text-gray-100 my-1p'>
          by {" "}
          <span className='hover:text-blue-190 mx-1'>
            <a href={AUNSH_PORTFOLIO_LINK}>
              aunshx
            </a>
          </span>
          <span>
            &
          </span>
          <span className='hover:text-blue-190 mx-1'>
            <a href={SP_PORTFOLIO_LINK}>
              saipranav
            </a>
          </span>
        </div>
        <div className='text-12p text-gray-100 bold'>
        v3.2.4 &middot; &copy; 2023-2024 &middot; All rights reserved
        </div>
    </div>
    </div>
  );
}

export default Footer