import React from 'react'
import { data } from './data'
import { Icon } from '../../../../Shared/Icon'
import { fiveIcon, fourIcon, oneIcon, threeIcon, twoIcon } from '../../../../../Resources/Icons'

const indexToIcon = {
    1: [oneIcon, '0 0 256 512'],
    2: [twoIcon, '0 0 312 512'],
    3: [threeIcon, '0 0 320 512'],
    4: [fourIcon, '0 0 384 512'],
    5: [fiveIcon, '0 0 320 512'],
}

const Timeline = () => {
  return (
      <div className="items-center flex">
          {data.length > 0 && (
              data.map(({ title, subTitle, description }, index) => (
                  <div class="relative mb-6 sm:mb-0">
                      <div class="flex items-center">
                          <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                              <div>
                                  <Icon path={indexToIcon[index + 1][0]} viewBox={indexToIcon[index + 1][1]} height={'13px'} />
                              </div>
                          </div>
                          <div class="sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                      </div>
                      <div class="mt-3 sm:pe-8">
                          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                          <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{subTitle}</time>
                          <p class="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
                      </div>
                  </div>
              ))
          )}
      </div>
  )
}

export default Timeline