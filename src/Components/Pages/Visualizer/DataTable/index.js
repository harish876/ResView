import React, { useEffect, useState } from 'react';
import { computeTableData, computeTransInfo } from '../Computation/TransInfo';
import { dummyData } from '../Graphs/data';

const CompoundCellValues = () => {

}

const TableValues = ({ transNumber = 17, primary = 2, faultyReplicaCount = 1, commitTime = 10, execTime = 10, prepareTime = 10, replicaNumber = 1 }) => {
    return (
        <tr className="border-t hover:bg-gray-50 dark:hover:bg-blue-700 cursor-pointer">
            <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap dark:text-gray-300 text-gray-700">
                {transNumber}
            </th>
            <td className="px-6 py-4">
                {primary}
            </td>
            <td className="px-6 py-4">
                {faultyReplicaCount}
            </td>
            <td className="px-6 py-4">
                {replicaNumber}
            </td>
            <td className="px-6 py-4">
                {commitTime}
            </td>
            <td className="px-6 py-4">
                {execTime}
            </td>
            <td className="px-6 py-4">
                {prepareTime}
            </td>
        </tr>
    );
}

const DataTable = ({ messageHistory, transactionNumber, status, delay=5000 }) => {

    let defaultData = Object.keys(messageHistory).length > 0 ? messageHistory : dummyData;

    const [currentHistory, setCurrentHistory] = useState(defaultData);

    const [tableData, setTableData] = useState();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (Object.keys(messageHistory).length > 0) {
                setCurrentHistory(messageHistory);
                const currentData = computeTableData(messageHistory);
                setTableData(currentData)
            } else {
                setCurrentHistory(dummyData);
                const currentData = computeTableData(dummyData);
                setTableData(currentData)
            }
        }, delay);
        return () => clearTimeout(timeoutId);
    }, [messageHistory, delay]);

    const { primaryIndex, transactions, currentStatus, faultReplicas } = computeTransInfo(currentHistory, transactionNumber, status)


  return (
      <div className="relative overflow-x-auto rounded-md border-3p bg-blue-10 dark:border-solid  border-gray-700 dark:border-gray-50">
          <table className="w-full text-sm text-center rtl:text-right dark:text-gray-300 text-gray-700" style={{ border: '1px solid green' }}>
              <thead className="text-xs uppercase dark:text-gray-300 text-gray-700 w-full">
                  <tr>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Transaction #
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Primary
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50" rowSpan="2">
                          Faulty Replicas
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-b-1p border-gray-700 dark:border-gray-50" colSpan="4">
                          Replica Details
                      </th>
                  </tr>
                  <tr>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Replica Number
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Commit Time
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Execution Time
                      </th>
                      <th scope="col" className="px-6 py-3 border-r-1p border-gray-700 dark:border-gray-50">
                          Prepare Time
                      </th>
                  </tr>
              </thead>
              <tbody>
                  {/* {Object.keys(tableData).length > 0 && (
                      Object.entries(tableData).forEach(([key, value]) => {

                      })
                  )} */}
              </tbody>
              
          </table>
          <div className="flex items-center justify-between px-8" aria-label="Table navigation">
              <div>
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of <span className="font-semibold text-gray-900 dark:text-white">20</span></span>
              </div>
              <div className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                  <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</div>
                  <div className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</div>
              </div>
          </div>
      </div>

  )
}

export default DataTable