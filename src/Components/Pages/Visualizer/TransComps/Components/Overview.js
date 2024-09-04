import classNames from 'classnames'
import React, { useContext } from 'react'
import { FontVarTitle } from '../../../../Shared/Title'
import SmallTable from '../../Table/Components/SmallTable'
import { anglesDownIcon, eyeIcon } from '../../../../../Resources/Icons'
import { ThemeContext } from '../../../../../Context/theme'
import { Icon } from '../../../../Shared/Icon'

const Overview = ({ goToElement }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={classNames('flex flex-col rounded-md bg-blue-10 border-3p border-solid border-gray-700 dark:border-gray-50 dark:bg-blue-450 relative w-full')}>
      <div className="flex items-center justify-center gap-x-2 w-full border-b-2p border-solid border-gray-700 dark:border-gray-50 h-60p">
          <Icon
            fill={theme ? "rgb(209,213,219)" : "black"}
            height={'1em'}
            path={eyeIcon}
            viewBox={'0 0 576 512'}
          />
        <FontVarTitle title={'Overview'} />
      </div>
      <div className="overflow-y-scroll h-full">
        <SmallTable />
      </div>
      <div className='w-full flex items-center justify-center gap-x-2 border-t-3p border-solid border-gray-700 dark:border-gray-50 cursor-pointer hover:dark:bg-green-80 h-60p' onClick={() => goToElement("transaction-table")}>
        <div> 
          <Icon path={anglesDownIcon} fill={theme ? "rgb(209,213,219)" : "black"} height={"1.1em"} viewBox='0 0 448 512' />
        </div>
        <div className="dark:text-gray-300 text-gray-700 font-bold text-center text-14p">
          All Transactions
        </div>
      </div>
    </div>
  )
}

export default Overview
