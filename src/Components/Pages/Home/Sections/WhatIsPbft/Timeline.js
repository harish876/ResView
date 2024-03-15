import React, { useState } from 'react'
import { data } from './data'
import { Icon } from '../../../../Shared/Icon'
import { anglesRightIcon, circleIcon, fiveIcon, fourIcon, oneIcon, threeIcon, twoIcon } from '../../../../../Resources/Icons'
import { PBFT_IMAGE } from '../../../../../Constants'

const indexToIcon = {
    1: [oneIcon, '0 0 256 512'],
    2: [twoIcon, '0 0 312 512'],
    3: [threeIcon, '0 0 320 512'],
    4: [fourIcon, '0 0 384 512'],
    5: [fiveIcon, '0 0 320 512'],
}

const Component = ({ details, index, length }) => {
    const { title, subTitle, description } = details;

    return (
        <div class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
                <div class="z-10 flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <div>
                        <Icon path={indexToIcon[index + 1][0]} viewBox={indexToIcon[index + 1][1]} height={'13px'} />
                    </div>
                </div>
                <div class="sm:flex w-full bg-gray-200 h-0.5 dark:bg-gray-700"></div>
                {index !== length ? (
                    <div>
                        <Icon path={anglesRightIcon} viewBox={'0 0 512 512'} height={'13px'} />
                    </div>
                ) : (
                    <div>
                        <Icon path={circleIcon} viewBox={'0 0 384 512'} height={'13px'} />
                    </div>
                )}
            </div>
            <div class="mt-3 sm:pe-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{subTitle}</time>
                <div class=" font-normal text-13p text-gray-500 dark:text-gray-400">{description}</div>
            </div>
        </div>
    );
};

const Timeline = () => {
    const [imageLoading, setImageLoading] = useState(true);

    const imageLoaded = () => {
        setImageLoading(false);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className='flex items-center justify-center w-full h-550p m-2 mb-16'>
                <div style={{ display: imageLoading ? "block" : "none" }} className='py-3 px-2 shadow-md flex justify-center items-center rounded-md bg-white my-8 dark:border-3p dark:border-solid dark:border-gray-50 dark:bg-blue-500 w-full h-full'>
                    Loading images
                </div>
                <img src={PBFT_IMAGE} alt="PBFT Consensus Protocol" className='py-3 px-2 shadow-md flex flex-col justify-center items-center rounded-md bg-white my-8 dark:border-3p dark:border-solid dark:border-gray-50 dark:bg-blue-500' onLoad={imageLoaded} style={{ display: imageLoading ? "none" : "block" }} />
            </div>
            <div className="items-center flex gap-x-8 mt-4">
                {data.length > 0 && (
                    data.map((details, index) => (
                        <>
                            {index < 3 && (
                                <Component details={details} index={index} key={index} length={data.length - 1} />
                            )}
                        </>
                    ))
                )}
            </div>
            <div className="items-center flex gap-x-16 mt-16">
                {data.length > 0 && (
                    data.map((details, index) => (
                        <>
                            {index > 2 && (
                                <Component details={details} index={index} key={index} length={data.length - 1} />
                            )}
                        </>
                    ))
                )}
            </div>
        </div>
    )
}

export default Timeline