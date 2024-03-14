import React from 'react'
import { atomIcon } from '../../../../../Resources/Icons'
import Title from '../../../../Shared/Title'
import Timeline from './Timeline'

const index = () => {
    return (
        <div className="flex flex-col items-center jusitfy-center">
            <div className="mb-16">
                <Title title={'Why ResView?'} icon={atomIcon} />
            </div>
            <div class="flex flex-col items-center justify-center gap-y-24">
                Some details
            </div>
            <div>
                <Timeline />
            </div>
        </div>
    )
}

export default index