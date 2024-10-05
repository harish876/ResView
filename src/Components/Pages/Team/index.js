import React, { useContext } from 'react';
import { BorderToggleRef } from '../../../App';
import { NavbarToggleContext } from '../../../Context/navbarToggle';
import { teamIcon } from '../../../Resources/Icons';
import Footer from '../../Shared/Footer';
import Loader from '../../Shared/Loader';
import Navbar from '../../Shared/Navbar';
import Title, { Subtitle } from '../../Shared/Title';
import Wrapper from '../../Shared/Wrapper';
import { CurrentTeamCard, PastMembersCard } from './Ancilliary/Components/Card';
import { currentTeam, pastMembers } from './Ancilliary/Data/data';

const Team = () => {
  return (
    <Wrapper>
      <div className="mt-8">
        <Title title={'Team'} icon={teamIcon} iconViewBox={'0 0 640 512'} titleFontSize={''} />
      </div>
      <div className='mt-6 mb-16'>
        <Subtitle subtitle={'Designed and developed at the Exploratory Systems Lab @ UC Davis'} />
      </div>
      <div className='mt-4 mb-4 mx-8 grid grid-cols-2 gap-24 w-full h-full'>
        {currentTeam.length > 0 &&
          currentTeam.map((element, index) => (
            <div key={index} data-aos='fade-in' data-aos-delay={100 * index}>
              <CurrentTeamCard element={element} />
            </div>
          ))}
      </div>
      <div className='my-24 mx-8 grid grid-cols-3 gap-16 w-full h-full'>
        {pastMembers.length > 0 &&
          pastMembers.map((element, index) => (
            <div key={index} data-aos='fade-in' data-aos-delay={100 * index}>
              {index === 1 ? (
                <PastMembersCard element={element} />
              ) : (
                <></>
              )}
            </div>
          ))}
      </div>
    </Wrapper>
  );
}

const Index = ({ loading }) => {
  const { borderToggle } = useContext(NavbarToggleContext);

  return (
    <>
      <Navbar borderToggle = { borderToggle } />
      <BorderToggleRef />
      <Team />
      <Footer />
    </>
  );
}

export default Index
