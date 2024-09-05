import classNames from 'classnames';
import React, { useContext } from 'react'
import { transactionsIcon } from '../../../../../Resources/Icons';
import { FontVarTitle } from '../../../../Shared/Title';
import { ThemeContext } from '../../../../../Context/theme';
import { VizDataHistoryContext } from '../../../../../Context/visualizer';
import { Icon } from '../../../../Shared/Icon';

const AnalyticsItem = ({ title, value }) => {
  return (
    <div className='flex flex-col items-center justify-center px-2 py-2 pt-3 gap-y-4'>
          <div className={`dark:text-gray-300 text-gray-700 font-semibold text-center text-20p`}>
              {value}
          </div>
      <div className='dark:text-gray-300 text-gray-700 text-14p text-center'>
            {title}
          </div>
    </div>
  )
}

const Analytics = () => {
  const { theme } = useContext(ThemeContext);
  const { totalPercentFaulty, totalHistoryLength, noPrimaryCount } = useContext(VizDataHistoryContext);

  return (
    <div className={classNames('flex flex-col rounded-md bg-blue-10 border-3p border-solid border-gray-700 dark:border-gray-50 dark:bg-blue-450 relative w-full')}>
      <div className="flex items-center justify-center gap-x-2 w-full border-b-2p border-solid border-gray-700 dark:border-gray-50 h-60p">
        <div>
          <Icon
            fill={theme ? "rgb(209,213,219)" : "black"}
            height={'1em'}
            path={transactionsIcon}
            viewBox={'0 0 448 512'}
          />
        </div>
        <FontVarTitle title={' Analytics'} />
      </div>
      <div className="grid grid-rows-2 h-full w-full">
        <div className="flex items-center justify-center w-full border-b-2p border-solid border-gray-700 dark:border-gray-50">
          <AnalyticsItem value={totalHistoryLength} title={'Total Transactions'} />
        </div>
        <div className="grid grid-cols-2 flex-items-center-justify-center w-full">
          <div className="border-r-2p border-solid border-gray-700 dark:border-gray-50 flex items-center justify-center">
            <AnalyticsItem title={'Avg. Faultiness'} value={`${totalPercentFaulty * 100}%`} />
          </div>
          <div className="flex items-center justify-center">
            <AnalyticsItem title={'No Primary'} value={noPrimaryCount} />
          </div>
        </div>
      </div>
    </div>
  )
};

export default Analytics;