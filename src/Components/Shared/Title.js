import React, { useContext } from 'react'
import { Icon } from './Icon'
import { ThemeContext } from '../../Context/theme';

const Title = ({ title, icon, iconHeight, iconViewBox }) => {
  const { theme } = useContext(ThemeContext);

  const iconFill = theme ? 'white' : '#2e2e2e';
  return (
    <div className='flex items-center justify-center gap-x-2 border-b-4 border-blue-550 mb-16'>
        {icon && (
            <div className='mt-2p'>
                <Icon
                    fill={iconFill}
                    height={iconHeight}
                    path={icon}
                    viewBox={iconViewBox}
                />
            </div>
        )}
        <div className='text-36p font-bold dark:text-white text-gray-170'>
            {title}
        </div>
    </div>
  )
}

export default Title