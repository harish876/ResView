import React, { useState } from 'react';
import { cancelIcon, tickIcon } from '../../../../Resources/Icons';
import HRline from '../../../Shared/HRline';
import { Icon } from '../../../Shared/Icon';
import { FontVarTitle } from '../../../Shared/Title';
import { computeDataDetails } from '../Graphs/Computation/CompPbft';
import { dummyData } from '../Graphs/data';


// TODO: Change the below computation
let FAULTY_REPLICAS_DEFAULT = [true, true, true, true]

const TransInfo = ({ primary, numberOfReplicas, messageHistory, transactionNumber = 17, status }) => {

    let currentStatus = status;
    let currentData = messageHistory[transactionNumber];

    if (!currentData) {
        currentData = dummyData[17];
        currentStatus = FAULTY_REPLICAS_DEFAULT;
    }

    const { primaryIndex, transactions } =
        computeDataDetails(currentData);


    return (
        <div className='py-4 px-2 flex flex-col justify-center items-center rounded-md border-3p border-solid border-gray-700 dark:border-gray-50 w-full dark:text-gray-300 bg-blue-10 dark:bg-blue-450 opacity-1'>
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
                        # Replicas : {'4'}
                    </div>
                    {/* TODO: Change the below */}
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
                    {currentStatus.length > 0 && currentStatus.map((value, index) => (
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

export default TransInfo
