import React from 'react';
import { cancelIcon, tickIcon } from '../../../../Resources/Icons';
import HRline from '../../../Shared/HRline';
import { Icon } from '../../../Shared/Icon';
import { computeDataDetails } from '../Graphs/Computation/CompPbft';
import { dummyData } from '../Graphs/data';

let FAULTY_REPLICAS_DEFAULT = [false, false, false, false]

const generateReplicaStatus = (data, defaultResult) => {
    for(let [key, _] of Object.entries(data)){
        defaultResult[key-1] = true;
    }
    return defaultResult;
};

const BasicInfoTile = ({ title, info }) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='text-20p md:text-16p sm:text-12p font-bold py-1'>
                {info}
            </div>
            <div className='text-16p md:text-14p sm:text-10p pt-1'>
                {title}
            </div>
        </div>
    );
};

const ReplicaStatTile = ({ replica, status }) => {
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className="">
                <Icon path={status ? tickIcon : cancelIcon} viewBox={status ? '0 0 448 512' : '0 0 384 512'} height={'20px'} fill={status ? '#0ac24d' : '#ed1123'} />
            </div>
            <div className='text-16p md:text-14p sm:text-10p pt-2'>
                {replica}
            </div>
        </div>
    );
};

const TransInfo = ({ primary, numberOfReplicas, messageHistory, transactionNumber = 17, status }) => {

    let currentStatus = status;
    let currentData = messageHistory[transactionNumber];

    if (!currentData) {
        currentData = dummyData[17];
        currentStatus = generateReplicaStatus(currentData, FAULTY_REPLICAS_DEFAULT);
    }

    const { primaryIndex, transactions } =
        computeDataDetails(currentData);


    return (
        <div className="h-full w-220p fixed z-1 top-0 left-0 overflow-x-hidden p-2 py-6 flex flex-col items-center justify-around opacity-1 border-r-2p border-solid border-gray-700 dark:border-gray-50 dark:text-gray-300">
            <div className='text-20p md:text-16p sm:text-12p font-bold py-1'>
                Current Transaction
            </div>
            <div>
                <BasicInfoTile title={'Transaction #'} info={transactionNumber ?? `17`} />
            </div>
            <div>
                <BasicInfoTile title={'Primary'} info={primary ?? `Replica ${primaryIndex}`} />
            </div>
            <div>
                <BasicInfoTile title={'# Replicas'} info={'4'} />
            </div>
            <div className='w-full px-4'>
                <HRline />
            </div>
            <div className='text-20p md:text-16p sm:text-12p font-bold py-1'>
                Replica Status
            </div>
            <div className='flex flex-col items-center justify-center gap-y-10'>
                {currentStatus.length > 0 && currentStatus.map((value, index) => (
                    <ReplicaStatTile
                        key={index}
                        replica={`Replica ${index + 1}`}
                        status={value}
                    />
                ))}
            </div>
        </div>
    )
}

export default TransInfo
