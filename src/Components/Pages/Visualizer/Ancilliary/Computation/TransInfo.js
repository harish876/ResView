import { DATA_TABLE_NO_PRIMARY_EXISTS, TOTAL_NUMBER_OF_REPLICAS } from "../../../../../Constants";
import { computeDataDetails } from "./CompPbft";

let DEFAULT_REPLICA_STATUS = [false, false, false, false];

const generateReplicaStatus = (data, defaultResult) => {
    for (let [key, _] of Object.entries(data)) {
        defaultResult[key - 1] = true;
    }
    return defaultResult;
};

export const computeTransInfo = (messageHistory, transactionNumber, status) => {
    const currentData = messageHistory[transactionNumber];
    const { primaryIndex, transactions } =
        computeDataDetails(currentData);

    const currentStatus = generateReplicaStatus(currentData, status); 

    const faultReplicas = Math.abs(TOTAL_NUMBER_OF_REPLICAS - transactions.size)

    return { primaryIndex, transactions, currentStatus, currentData, faultReplicas };
};

export const computeTableData = (messageHistory) => {
    let data = {}
    Object.entries(messageHistory).forEach(([key, value]) => {
        const { primaryIndex, faultReplicas } = computeTransInfo(messageHistory, key, DEFAULT_REPLICA_STATUS)

        let primary = primaryIndex === -1 ? DATA_TABLE_NO_PRIMARY_EXISTS : `Replica ${primaryIndex}`

        data[key] = {
            transactionNumber: key,
            primary,
            faultReplicas: `${faultReplicas}`,
            replicaDetails: {}
        }

        for (let replicaId in messageHistory[key]) {
            const entry = messageHistory[key][replicaId];
            data[key].replicaDetails[replicaId] = {
                commitTime: entry.commit_time,
                execTime: entry.execution_time,
                prepTime: entry.prepare_time,
            };
        }
    });

    return { data };
};
