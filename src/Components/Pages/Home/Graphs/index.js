import React, { useContext } from 'react'
import { homePageCardDetails } from './data'
import Card from './Card'
import Title from '../../../Shared/Title'
import { linearGraphIcon } from '../../../../Resources/Icons'
import { ThemeContext } from '../../../../Context/theme'

const Graphs = () => {
  const { theme } = useContext(ThemeContext);

  const iconFill = theme ? 'white' : '#2e2e2e';

  return (
    <div className="flex flex-col items-center jusitfy-center">
        <Title title={'Graphs'} icon={linearGraphIcon} iconFill={iconFill} />
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