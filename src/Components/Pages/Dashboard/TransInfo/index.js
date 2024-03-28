import React from 'react'

// TODO: Compute the replicas not faulty map here 

const index = ({ primary, numberOfReplicas, messageHistory }) => {
  return (
      <div className='py-3 px-2 shadow-md flex flex-col justify-center items-center rounded-md dark:border-3p dark:border-solid dark:border-gray-50 w-full dark:text-gray-300'>
        <div className="flex items-center justify-around w-full my-2">
            <div className='text-18p'>
                  Primary : {primary ?? 'Replica 2'}
            </div>
            <div className='text-18p'>
                  # Replicas : {numberOfReplicas ?? '4'}
            </div>
        </div>
        <div className="flex items-center justify-around w-full my-2">
            <div className='text-18p'>
                  Primary : {primary ?? 'Replica 2'}
            </div>
            <div className='text-18p'>
                  # Replicas : {numberOfReplicas ?? '4'}
            </div>
        </div>
    </div>
  )
}

export default index