import React from 'react'
import { atomIcon } from '../../../../../Resources/Icons'
import Title, { Subtitle } from '../../../../Shared/Title'
import Timeline from './Timeline'
import { WHAT_IST_PBFT_SUBTITLE } from '../../../../../Constants'

const index = () => {
    return (
        <div className="flex flex-col items-center jusitfy-center">
            <div className="mb-8">
                <Title title={'What is PBFT?'} icon={atomIcon} />
            </div>
            <div>
                <Subtitle subtitle={WHAT_IST_PBFT_SUBTITLE} />
            </div>
            <div className='mt-16'>
                <Timeline />
            </div>
        </div>
    )
}

export default index