import { useWindowSize } from "@react-hook/window-size";
import React from "react";
import { DATA_TABLE_DELAY } from "../../../Constants";
import { WebSocket } from "../../../Socket";
import Footer from "../../Shared/Footer";
import HRline from '../../Shared/HRline';
import Mvt from "./Graphs/Mvt";
import Pbft from "./Graphs/Pbft";
import DataTable from './Table';
import TransInfo from './TransComps';
import Overview from "./TransComps/Components/Overview";
import Analytics from "./TransComps/Components/AnalyticsItem";


const Visualizer = () => {
    const [_, height] = useWindowSize()

    let concurrentHeight = Math.floor(height / 2) + 200

    const goToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    };

    return (
        <div className="py-6 h-full">
            <TransInfo />
            <WebSocket />
            <div className="ml-[220px] px-8 pt-6 h-full">
                <div className="grid grid-cols-3.5f-1f gap-x-6 w-full h-full" id="pbft-graph" >
                    <Pbft />
                    <div 
                        className="grid grid-rows-2 gap-y-4"
                        style={{
                            height: concurrentHeight
                        }}
                    >
                        <Overview goToElement={goToElement} />
                        <Analytics />
                    </div>
                </div>
                <div className="my-8 px-24 w-full">
                    <HRline />
                </div>
                <Mvt />
                <div className="my-10 px-24 w-full">
                    <HRline />
                </div>
                <div className="px-24" id="transaction-table">
                    <DataTable goToPbftGraph={() => goToElement('pbft-graph')} delay={DATA_TABLE_DELAY} />
                </div>
                <div className="mt-10 mb-24 px-24 w-full">
                    <HRline />
                </div>
                <div className="mb-[-2em]">
                    <Footer />
                </div>
            </div>
        </div>
    )
}


const index = () => {
    return (
        <Visualizer />
    );
}


export default index