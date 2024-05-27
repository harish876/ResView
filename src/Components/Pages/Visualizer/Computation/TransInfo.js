import { dummyData } from "../Graphs/data";
import { computeDataDetails } from "./CompPbft";

let FAULTY_REPLICAS_DEFAULT = [false, false, false, false]

const generateReplicaStatus = (data, defaultResult) => {
    for (let [key, _] of Object.entries(data)) {
        defaultResult[key - 1] = true;
    }
    return defaultResult;
};

export const computeTransInfo = (messageHistory, transactionNumber, status) => {
    let currentStatus = status;
    let currentData = messageHistory[transactionNumber];

    if (!currentData) {
        currentData = dummyData[17];
        currentStatus = generateReplicaStatus(currentData, FAULTY_REPLICAS_DEFAULT);
    }

    const { primaryIndex, transactions } =
        computeDataDetails(currentData);

    return {primaryIndex, transactions, currentStatus, currentData};
};