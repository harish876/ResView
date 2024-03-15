import React from 'react'
import Card from './Card'
import { homePageCardDetails } from './data'
import Title from '../../../../Shared/Title'
import { linearGraphIcon } from '../../../../../Resources/Icons'

const Graphs = () => {

  return (
    <div className="flex flex-col items-center jusitfy-center">
      <div className='mb-16'>
        <Title title={'Graphs'} icon={linearGraphIcon} />
        </div>
        <div class="flex flex-col items-center justify-center gap-y-24">
            {homePageCardDetails.length > 0 && (
            homePageCardDetails.map(({image, alt, title, description, link}, index) => (
                <Card
                key={index}
                image={image}
                alt={alt}
                title={title}
                link={link}
                description={description}
                inverted={index%2 !== 0}
                />
            ))
            )}
        </div>
    </div>
  )
}

export default Graphs