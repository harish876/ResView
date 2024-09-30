import { COMMIT_GRAPH_HOME, DEFAULT_IMAGE, PBFT_GRAPH_HOME, PREPARE_GRAPH_HOME, TOGGLE_CHANGE_HOME } from "../../../../../Constants";

// ------ HOME PAGE CARD IMAGES -------
export const homePageCardDetails = [
    {
        image: PBFT_GRAPH_HOME ?? DEFAULT_IMAGE, 
        alt: 'PBFT Graph Image',
        title: 'PBFT Graph',
        description: 'Novel PBFT visualizer with bespoke animations, speed ups and replays',
        link: '/pages/visualizer',
    },
    {
        image: COMMIT_GRAPH_HOME ?? DEFAULT_IMAGE, 
        alt: 'Messages v Time',
        title: 'Messages v Time',
        description: 'Check out the commit messages over time for different replicas',
        link: '/pages/visualizer',
    },
    {
        image: PREPARE_GRAPH_HOME ?? DEFAULT_IMAGE, 
        alt: 'Messages v Time',
        title: 'Messages v Time',
        description: 'Check out the prepare messages over time for different replicas',
        link: '/pages/visualizer',
    },
    {
        image: TOGGLE_CHANGE_HOME ?? DEFAULT_IMAGE, 
        alt: 'Simulate Fualtiness',
        title: 'Simulate Fualtiness',
        description: 'Toggle faultiness to simulate different consensus situations',
        link: '/pages/visualizer',
    },
]