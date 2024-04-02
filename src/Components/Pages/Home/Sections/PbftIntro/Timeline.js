import React, { useContext, useState } from 'react'
import { data } from './data'
import { Icon } from '../../../../Shared/Icon'
import { anglesRightIcon, circleIcon, fiveIcon, fourIcon, oneIcon, threeIcon, twoIcon } from '../../../../../Resources/Icons'
import { PBFT_IMAGE } from '../../../../../Constants'
import { ThemeContext } from '../../../../../Context/theme'

const indexToIcon = {
    1: [oneIcon, '0 0 256 512'],
    2: [twoIcon, '0 0 312 512'],
    3: [threeIcon, '0 0 320 512'],
    4: [fourIcon, '0 0 384 512'],
    5: [fiveIcon, '0 0 320 512'],
}

const Component = ({ details, index, length }) => {
    const { theme } = useContext(ThemeContext);
    const { title, subTitle, description } = details;

    return (
        <div class="relative mb-6 sm:mb-0">
            <div class="flex items-center">
                <div class="z-10 flex items-center justify-center w-6 h-6 bg-green-900 rounded-full ring-0 ring-white dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 shrink-0">
                    <div>
                        <Icon path={indexToIcon[index + 1][0]} viewBox={indexToIcon[index + 1][1]} height={'13px'} fill={theme ? '#8f9299' : 'white'} />
                    </div>
                </div>
                <div class="sm:flex w-full bg-gray-900 h-0.5 dark:bg-white"></div>
                {index !== length ? (
                    <div>
                        <Icon path={anglesRightIcon} viewBox={'0 0 512 512'} fill={theme ? '#8f9299' : '#111827'} height={'13px'} />
                    </div>
                ) : (
                    <div>
                            <Icon path={circleIcon} viewBox={'0 0 384 512'} fill={theme ? '#8f9299' : '#111827'} height={'13px'} />
                    </div>
                )}
            </div>
            <div class="mt-3 sm:pe-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                <time class="block mb-2 text-sm font-normal leading-none text-gray-500 dark:text-gray-500">{subTitle}</time>
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
                <img src={PBFT_IMAGE} alt="PBFT Consensus Protocol" className='py-3 px-2 flex flex-col justify-center items-center rounded-md my-8 border-3p dark:border-solid dark:border-gray-50 dark:bg-blue-500 border-gray-900' onLoad={imageLoaded} style={{ display: imageLoading ? "none" : "block" }} />
            </div>
            <div className="flex items-start justify-center gap-x-8 mt-4">
                {data.length > 0 && (
                    data.slice(0, 3).map((details, index) => (
                        <div key={index} className='flex-1'>
                            <Component details={details} index={index} length={data.length - 1} />
                        </div>
                    ))
                )}
            </div>
            <div className="flex items-start justify-center gap-x-16 mt-16">
                {data.length > 0 && (
                    data.slice(3).map((details, index) => (
                        <div key={index} className='flex-1'>
                            <Component details={details} index={index + 3} length={data.length - 1} />
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Timeline