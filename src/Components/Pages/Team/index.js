import React from 'react'
import Wrapper, { ParticleWrapper } from '../../Shared/Wrapper';
import { currentTeam, pastMembers } from './data';
import { CurrentTeamCard, PastMembersCard } from './Card';
import Title from '../../Shared/Title';

const Team = () => {
  return (
    <Wrapper>
      <div className="mt-8">
        <Title title={'Current Team'} />
      </div>
      <div className='mb-4 mx-8 grid grid-cols-2 gap-16 w-full h-full'>
        {currentTeam.length > 0 &&
          currentTeam.map((element, index) => (
            <div key={index} data-aos='fade-in' data-aos-delay={100*index}>
              <CurrentTeamCard element={element} />
            </div>
          ))}
      </div>
      <div className="mt-24">
        <Title title={'Past Members'} />
      </div>
      <div className='mb-4 mx-8 grid grid-cols-3 gap-16 w-full h-full'>
        {pastMembers.length > 0 &&
          pastMembers.map((element, index) => (
            <div key={index} data-aos='fade-in' data-aos-delay={100*index}>
              <PastMembersCard element={element} />
            </div>
        ))}
      </div>
    </Wrapper>
  );
}

const index = () => {
  return (
    // <ParticleWrapper>
      <Team />
    // </ParticleWrapper>
  );
}

export default index;