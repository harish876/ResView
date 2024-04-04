import React from 'react';
import Wrapper from '../../Shared/Wrapper';
// TODO: Remove the below import and entire components after demo is done
import { BLOG_LINK } from '../../../Constants';
import blockchain from '../../../Resources/Images/blockchain.jpeg';
import { LinkButton } from '../../Shared/Buttons';
import Graphs from './Sections/Graphs';
import PbftIntro from './Sections/PbftIntro';
import ResViewIntro from './Sections/ResViewIntro';

const ResViewOld = () => {
  return (
    <>
      <div className="flex"> {/* Image on the Left Side */} 
      <div className="w-1/2 p-2">
          <img src={blockchain} alt="Example" className="object-cover w-full h-full"/>
        </div> 
        {/* Content on the Right Side */} 
        <div className="w-1/2 p-6 flex items-center">
          <div className="w-full"> {/* Adjusted to take up the full width */} 
          <h1 className="titlewriter text-4xl font-bold mb-4 text-blue-190">What is ResView?</h1>
            <p className="text-white w-full text-justify">  ResView provides a detailed understanding of consensus operations, replica comparisons during transactions, and transaction statistics by visualizing the architecture of ResDB.</p>
          </div>
        </div>
      </div>
      {/* TODO: Rmeove this later on: PSQL MAC relative path export PATH=/Applications/Postgres.app/Contents/Versions/15/bin:$PATH
 */}
    <div className="flex justify-around">

      {/* Card 2 */}
      <div className="max-w-md mb-4 m-2 border border-2 border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190">Interactive Features</h2>
        <p className="text-white"> Experience the power of ResView with its interactive features that allow users to set/get transactins, toggle between transactions, simulate faulty replicas, and explore..</p>
      </div>

      {/* Card 3 */}
      <div className="max-w-sm mb-4 m-2 border border-2 border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190">Easy Insights</h2>
        <p className="text-white">ResView serves as a practical example of a blockchain database system, offering new users and learners a clear visualization of a complex technology. Get a comprehensive understanding of consensus, replica comparisons, and transaction statistics with ResView's detailed visualizations.</p>
      </div>
    </div>

    </>
  );
};



const Home = () => {
  
  return (
    <Wrapper>
      <div aria-hidden="true" class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div class="blur-[200px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div class="blur-[200px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
      </div>
      <div className='flex flex-col items-center justify-center text-gray dark:text-white'>
      <div class="relative pt-20 ml-auto">
            <div class="lg:w-2/3 text-center mx-auto">

                <div class="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Visualizer for a new age blockchain fabric.</div>

            <p class="mt-8 px-[6em] text-gray-700 dark:text-gray-300 text-20p">A novel dashboard metric of a blockchain database system, offering new users and learners a clear visualization of a complex technology.
              </p>
                <div class="mt-16 flex items-center justify-center gap-y-4 gap-x-[4em]">
                  <LinkButton title={'Visualizer'} link={'/pages/visualizer'} external={true} />
                  <LinkButton title={'Learn More'} link={BLOG_LINK} external={true} />
                </div>
                <div class="py-8 mt-16 px-2 border-y-3p border-gray-900 dark:border-white sm:flex flex items-center justify-between">
                    <div class="text-center">
                        <h6 class="text-lg font-semibold text-gray-700 dark:text-white">Super Fast & Cheap</h6>
                        <p class="mt-2 text-gray-500">Intensively optimiazed computation</p>
                    </div>
                    <div class="text-center">
                        <h6 class="text-lg font-semibold text-gray-700 dark:text-white">Wide range integration</h6>
                        <p class="mt-2 text-gray-500">All the blocks no fuss!</p>
                    </div>
                    <div class="text-center">
                        <h6 class="text-lg font-semibold text-gray-700 dark:text-white">Seeing is believing</h6>
                        <p class="mt-2 text-gray-500">Check out all BC actions</p>
                    </div>
                </div>
            </div>
          <div className="mt-28">
            <ResViewIntro />
          </div>
            <div className="mt-28">
            <PbftIntro />
            </div>
            <div className="mt-28">
              <Graphs />
            </div>
        </div>
    </div>
    </Wrapper>
  );
};

const index = () => {
  return (
    <>
      <Home />
    </>
  );
}

export default index