import classNames from 'classnames';
import React, { useContext } from 'react';
import { DATA_TABLE_NO_PRIMARY_EXISTS } from '../../../../../Constants';
import { VizDataHistoryContext } from '../../../../../Context/visualizer';

const TABLE_HEADERS = [
  'Sr #',
  'Transaction #',
  'Primary',
  'Faulty Replicas',
]

const CellValues = ({ value, loading, primaryDoesNotExist }) => {
  return (
    <td className={classNames("px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50", { 'animate-pulse': loading }, { 'text-red-50': primaryDoesNotExist === DATA_TABLE_NO_PRIMARY_EXISTS })}>
      {loading ? (
        <div className='w-full h-3 px-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
      ) : (
        <div className='text-14p'>
          {value}
        </div>
      )}
    </td>
  );
};

const TableValues = ({ srNo, transaction, loading }) => {

  const { changeCurrentTransaction, currentTransaction } = useContext(VizDataHistoryContext)

  const changeTransaction = (value) => {
    changeCurrentTransaction(value)
  }

  return (
    <tr className={classNames('dark:hover:bg-black hover:bg-gray-400 cursor-pointer', { 'dark:bg-black bg-gray-400': transaction.transactionNumber == currentTransaction })} onClick={() => !loading && changeTransaction(transaction.transactionNumber)}>
        <CellValues
          value={srNo}
          loading={loading}
          transaction={transaction}
          primaryDoesNotExist={transaction.primary}
        />
        {Object.keys(transaction).length > 0 && (
          Object.keys(transaction).map((value, idx) => {
            if (value !== 'replicaDetails') return (
              <CellValues
                value={transaction[value]}
                loading={loading}
                primaryDoesNotExist={transaction.primary}
                key={idx}
              />
            )
          })
        )}
      </tr>
  );
}



const SmallTable = () => {
  const { loading, truncatedData } = useContext(VizDataHistoryContext)

  return (
    <>
      <table className="w-full text-sm text-center rtl:text-right dark:text-gray-300 text-gray-700 h-full">
        <thead className="text-xs uppercase dark:text-gray-300 text-gray-700 w-full border-gray-700 dark:border-gray-50 bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
          <tr className='h-50p'>
            {TABLE_HEADERS.map((value, index) => {
              let isReplicaDetailCol = value === 'Replica Details';
              return (
                <th scope="col" className={classNames("px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50 text-10p", { 'border-r-0': isReplicaDetailCol })} rowSpan={!isReplicaDetailCol && '2'} colSpan={isReplicaDetailCol && '4'} key={index}>
                  {value}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <></>
          ) : (
            <>
                {Object.keys(truncatedData).length > 0 && Object.keys(truncatedData).map((transactionKey, index) => {
                  const transaction = truncatedData[transactionKey];
                  return (
                    <TableValues
                      className='cursor-pointer'
                      key={transactionKey}
                      srNo={index + 1}
                      transaction={transaction}
                      loading={loading}
                    />
                  );
                })}
            </>
          )}
        </tbody>
      </table>
    </>
  )
}

export default SmallTable