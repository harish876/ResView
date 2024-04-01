import React, { useEffect, useState } from "react";
import { anglesRightIcon, eyeIcon } from "../../../Resources/Icons";
import { WebSocket } from '../../../Socket';
import { LinkButton } from '../../Shared/Buttons';
import HRline from '../../Shared/HRline';
import { Icon } from '../../Shared/Icon';
import Title, { FontVarTitle, Subtitle } from '../../Shared/Title';
import Wrapper from "../../Shared/Wrapper";
import Mvt from './Graphs/MVT';
import PBFT from './Graphs/PBFT';
import Input from './Input';
import ResizableContainer from './ResizableContainer';
import TransInfo from './TransInfo';


const Dashboard = () => {
    const [messageHistory, setMessageHistory] = useState({});
    const [currentTransaction, setCurrentTransaction] = useState(0);
    const [replicaStatus, setReplicaStatus] = useState([false, false, false, false])


   const onMessage = (newData, txn_number)=>{
        setMessageHistory(JSON.parse(JSON.stringify(newData)));
        setCurrentTransaction(txn_number);
      };

    function fetchWithTimeout(url, options, timeout = 5000) {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Timeout')), timeout)
        )
    ]);
    }
      
    function fetchReplicaStatuses() {
        let promises = [];
        let results = [false, false, false, false];
    
        for (let i = 0; i < 4; i++) {
            let promise = fetchWithTimeout('http://localhost:1850' + String(i + 1) + '/get_status')
                .then(response => {
                    return response.text(); 
                })
                .then(body => {
                    if (body === 'Not Faulty') {
                        results[i] = true;
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
    
            promises.push(promise);
        }
    
        Promise.all(promises)
            .then(() => {
                setReplicaStatus(results);
            });
    }
    useEffect(() => {
        const interval = setInterval(() => {
          fetchReplicaStatuses();
        }, 3000); // 3000 milliseconds = 3 seconds
    
        return () => clearInterval(interval);
      }, []);


    return (
        <Wrapper>
            <div className="mt-6 mb-6">
                <Title title={'Visualizer'} icon={eyeIcon} iconViewBox={'0 0 576 512'} titleFontSize={''} />
            </div>
            <div>
                <Subtitle subtitle={'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat vitae, dolor illo harum consequatur ea, temporibus, corrupti iure veniam esse quisquam ut quidem dignissimos quasi. Quas totam temporibus'} />
            </div>
            {<WebSocket onMessage={onMessage} />}
            {/* TODO: Change the below TransactionSelect Component */}
            <div className="my-8">
                <Input chooseTransaction={setCurrentTransaction} />
            </div>
            <div className="w-full">
                <TransInfo messageHistory={messageHistory} transactionNumber={currentTransaction} status={replicaStatus} />
            </div>
            <div className="my-10 flex items-center jusitfy-center gap-x-16">
                <LinkButton title={'PBFT Graph'} link={'/pages/visualizer'} scrollId={'pbft-graph'} />
                <LinkButton title={'Messages v Time Graph'} link={'/pages/visualizer'} scrollId={'mvt-graph'} />
            </div>
            <div className="my-12 w-full">
                <HRline />
            </div>
            <div className="" id='pbft-graph'>
                <div className="mb-8">
                    <FontVarTitle title={'Practical Byzantine Fault Tolerance Graph'} />
                </div>
                <ResizableContainer>
                    <PBFT
                        messageHistory={messageHistory}
                        realTransactionNumber={currentTransaction}
                    />
                    <div className='absolute bottom-0 right-0 rotate-45'>
                        <Icon path={anglesRightIcon} fill={"gray"} height={"0.8em"} />
                    </div>
                </ResizableContainer>
            </div>
            <div className="mt-24 mb-16 w-full">
                <HRline />
            </div>
            <div className="" id="mvt-graph">
                <Mvt
                    messageHistory={messageHistory}
                    currentTransaction={currentTransaction}
                />
            </div>
        </Wrapper>
    )
}


const index = () => {
    return (
        <>
            {/* <ParticleWrapper>
                <Dashboard />
            </ParticleWrapper> */}
            <Dashboard />
        </>
    );
}


export default index



