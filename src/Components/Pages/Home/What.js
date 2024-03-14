import React from 'react'
import Title from '../../Shared/Title'
import { anglesRightIcon, atomIcon, oneIcon, threeIcon, twoIcon } from '../../../Resources/Icons'
import { Icon } from '../../Shared/Icon'

const What = () => {
  return (
    <div className="flex flex-col items-center jusitfy-center">
        <div className="mb-16">
        <Title title={'Why ResView?'} icon={atomIcon} />
        </div>
        <div class="flex flex-col items-center justify-center gap-y-24">
            Some details
        </div>

      <ol class="items-center flex">
        <li class="relative mb-6 sm:mb-0">
          <div class="flex items-center">
            <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <div>
                <Icon path={oneIcon} viewBox={'0 0 256 512'} height={'13px'} />
              </div>
            </div>
            <div class="sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div class="mt-3 sm:pe-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.0.0</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 2, 2021</time>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
          </div>
        </li>
        <li class="relative mb-6 sm:mb-0">
          <div class="flex items-center">
            <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <div>
                <Icon path={twoIcon} viewBox={'0 0 312 512'} height={'13px'} />
              </div>
            </div>
            <div class="sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
          </div>
          <div class="mt-3 sm:pe-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.2.0</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on December 23, 2021</time>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
          </div>
        </li>
        <li class="relative mb-6 sm:mb-0">
          <div class="flex items-center">
            <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
              <div>
                <Icon path={threeIcon} viewBox={'0 0 320 512'} height={'13px'} />
              </div>
            </div>
            <div class="sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
            <div>
              <Icon path={anglesRightIcon} viewBox={'0 0 512 512'} height={'13px'} />
            </div>
          </div>
          <div class="mt-3 sm:pe-8">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Flowbite Library v1.3.0</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">Released on January 5, 2022</time>
            <p class="text-base font-normal text-gray-500 dark:text-gray-400">Get started with dozens of web components and interactive elements.</p>
          </div>
        </li>
      </ol>


    </div>
  )
}

export default What