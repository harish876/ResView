import React from 'react'
import { dummyData } from '../Graphs/data';
import { computeDataDetails } from '../Graphs/PBFT/Computation/Skeleton';
import { FontVarTitle } from '../../../Shared/Title';
import HRline from '../../../Shared/HRline';
import { Icon } from '../../../Shared/Icon';
import { cancelIcon, circleIcon, tickIcon } from '../../../../Resources/Icons';

// TODO: Compute the replicas not faulty map here 
//  TODO: Change the messageHistory and transactionNumbers and pass the real values

// TODO: Change the below computation
const FAULTY_REPLICAS = [true, true, true, false]

const index = ({ primary, numberOfReplicas, messageHistory, transactionNumber=17 }) => {
    // TODO: Change the below from dummyData to messageHistory
    const currentData = dummyData[transactionNumber];

    const { primaryIndex, transactions } =
        computeDataDetails(currentData);


  return (
      <div className='py-4 px-2 shadow-md flex flex-col justify-center items-center rounded-md dark:border-3p dark:border-solid dark:border-gray-50 w-full dark:text-gray-300'>
        <div className="flex flex-col w-full my-3 gap-y-4">
            <FontVarTitle title={'Basic Transaction Info:'} fontClass={'text-18p'} />
            <div className="flex items-center justify-around">
                  <div className='text-18p'>
                      Transaction # : {transactionNumber ?? `17`}
                  </div>
                  <div className='text-18p'>
                      Primary : {primary ?? `Replica ${primaryIndex}`}
                  </div>
                  <div className='text-18p'>
                      # Replicas : {transactions.size ?? '0'}
                  </div>
                  {/* TODO: CHange the below */}
                  <div className='text-18p'>
                      Some Info : {'0'}
                  </div>
            </div>
        </div>
        <div className="px-28 w-full my-3">
              <HRline />
        </div>
        <div className="flex flex-col w-full my-3 gap-y-4">
            <FontVarTitle title={'Faultiness:'} fontClass={'text-18p'} />
            <div className="flex items-center justify-around">
                  {FAULTY_REPLICAS.length > 0 && FAULTY_REPLICAS.map((value, index) => (
                      <div className='text-18p flex items-center justify-center gap-x-3' key={index}>
                          <div>
                              {`Replica ${index + 1}`} :
                          </div>
                          <div className="mt-[2px]">
                              <Icon path={value ? tickIcon : cancelIcon} viewBox={value ? '0 0 448 512' : '0 0 384 512'} height={'20px'} fill={value ? '#0ac24d' : '#ed1123'} />
                          </div>
                      </div>
                  ))}
            </div>
        </div>
    </div>
  )
}

export default index