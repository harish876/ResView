import React from 'react';
import Wrapper, { ParticleWrapper } from '../../Shared/Wrapper';
// TODO: Remove the below import and entire components after demo is done
import blockchain from '../../../Resources/Images/blockchain.jpeg';
import pbft from '../../../Resources/Images/pbft.PNG';
import Graphs from './Sections/Graphs';
import WhatIsPbft from './Sections/WhatIsPbft'
import { LinkButton } from '../../Shared/Buttons';

const ResViewOld = () => {

    const cardStyle = {
    backgroundColor: '#333', // Example card color
    color: 'white',
    flex: '1',
    margin: '0 10px',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid white', // Added white border
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    transition: 'transform 0.3s ease-in-out', // Smooth transition for hover effect
  };

  // Define hover style to avoid repetition
  const cardHoverStyle = {
    ...cardStyle,
    transform: 'scale(1.05)', // Scales up the card a little
  };

  // Function to handle mouse enter event
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  // Function to handle mouse leave event
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  const backgroundStyle = {
    backgroundImage: `url(${blockchain})`,
    height: '400px',
  };

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

    <div className="flex justify-around">
      {/* Card 1 */}
      <div className="max-w-md mb-4 m-2 border border-2 border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190">Overview</h2>
        <p className="text-white">ResView visualizes the ResDB architecture, providing an in-depth understanding of consensus operations, replica comparisons and transaction statistics.</p>
      </div>

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

    <div className="flex"> {/* Image on the Left Side */} 
    <div className="w-1/2 p-2">
        <img src={pbft} alt="Example" className="object-cover w-full h-full"/>
      </div> 
      {/* Content on the Right Side */} 
      <div className="w-1/2 p-6 flex items-center">
        <div className="w-full"> {/* Adjusted to take up the full width */} 
        <h1 className="typewriter text-4xl font-bold mb-4 text-blue-190">What is PBFT?</h1>
          <p className="text-white w-full text-justify"> Practical Byzantine Fault Tolerance (PBFT) is a consensus algorithm designed for use in distributed systems, particularly in scenarios where nodes (participants or replicas) may fail or behave maliciously. The primary goal of PBFT is to reach an agreement among nodes on a single, consistent order of transactions, even in the presence of faulty or malicious nodes. </p>
        </div>
      </div>
    </div>
    <div className="flex flex-wrap justify-around"> 
    {/* Card 1 */} 
      <div className="max-w-md mr-2 my-4 border border-2p border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190 ">Pre-Prepare phase</h2>
        <p className="text-white w-full text-justify"> The primary replica, which is selected by all other replicas in the blockchain, receives digitally signed transactions from clients and is in charge of organizing, allocating a sequence number, and distributing the transaction to all other replicas.</p>
      </div> 
      {/* Card 2 */} 
      <div className="max-w-md my-4 border border-2p border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190">Prepare phase</h2>
        <p className="text-white w-full text-justify">The pre-prepare message that each replica received from the primary node is then broadcast to every other replica, including the primary node, during the prepare phase. Good replicas can get ready for the commit after learning that a majority of them received the same transaction during the prepare phase..</p>
      </div> 
      {/* Card 3 */} 
      <div className="max-w-md mr-2 my-4 border border-2p border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190">Commit Phase</h2>
        <p className="text-white w-full text-justify">Non-faulty replicas create a prepare certificate and share it with the primary and all other replicas. If most replicas have the same prepare certificate at the end of the commit phase, then there is agreement on the particular transaction. As a result, replicas carry out the transaction.</p>
      </div> 
      {/* Card 4 */} 
      <div className="max-w-md my-4 border border-2p border-blue-190 text-white p-6 rounded-lg shadow-md hover:scale-105 transition">
        <h2 className="text-2xl font-bold mb-4 text-blue-190">Reply</h2>
        <p className="text-white w-full text-justify">All replicas, primary included, respond to the client by confirming the transaction.</p>
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

                <div class="text-gray-900 dark:text-white font-bold text-6xl md:text-6xl xl:text-7xl">Visualizer for new age blockchain fabrics.</div>

                <p class="mt-8 px-[6em] text-gray-700 dark:text-gray-300 text-20p">Metrics? KPIs? You name it and we have it. Visualize your blockchain like never before. Novel dashboards for novel blockchains.
              {/* A novel dashboard metric of a blockchain database system, offering new users and learners a clear visualization of a complex technology */}
              </p>
                <div class="mt-16 flex items-center justify-center gap-y-4 gap-x-[4em]">
                  <LinkButton title={'Visualizer'} link={'/pages/visualizer'} />
                  <LinkButton title={'Learn More'} link={'https://medium.com/@aunsh/resview-a-pbft-visualizer-based-on-the-resilientdb-blockchain-fabric-3ffaeb2aaee5'} external={true} />
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
            <div className="mt-24">
            <WhatIsPbft />
            </div>
            <div className="mt-24">
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
      {/* <ParticleWrapper>
        <Home />
      </ParticleWrapper> */}
      <Home />
    </>
  );
}

export default index