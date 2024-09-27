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

    const faultReplicas = parseInt(Math.abs(TOTAL_NUMBER_OF_REPLICAS - transactions.size))

    const percentFaulty = (faultReplicas / TOTAL_NUMBER_OF_REPLICAS) ?? 0;

    return { primaryIndex, transactions, currentStatus, currentData, faultReplicas, percentFaulty };
};

export const computeTableData = (messageHistory) => {
    let data = {}
    let totalSumFaulty = 0
    let noPrimaryCnt = 0
    Object.entries(messageHistory).forEach(([key, value]) => {
        const { primaryIndex, faultReplicas, percentFaulty } = computeTransInfo(messageHistory, key, DEFAULT_REPLICA_STATUS)

        let primary = '';

        if(primaryIndex === -1) {
            primary = DATA_TABLE_NO_PRIMARY_EXISTS;
            noPrimaryCnt += 1;
        } else primary = `Replica ${primaryIndex}`

        data[key] = {
            transactionNumber: key,
            primary,
            faultReplicas: `${faultReplicas}`,
            replicaDetails: {}, 
        }

        totalSumFaulty += percentFaulty;

        for (let replicaId in messageHistory[key]) {
            const entry = messageHistory[key][replicaId];
            data[key].replicaDetails[replicaId] = {
                commitTime: entry.commit_time,
                execTime: entry.execution_time,
                prepTime: entry.prepare_time,
            };
        }
    });

    const totalHistLength = Object.keys(data).length;

    const totalPctFaulty = (totalSumFaulty / totalHistLength).toFixed(2);

    return { data, totalPctFaulty, totalHistLength, noPrimaryCnt };
};

export const truncData = (data, currentTransaction) => {
    if (data === null || data === undefined) return {};
    const filteredData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
            if (value) {
                const { replicaDetails, ...rest } = value;
                return [key, rest];
            }
            return undefined;
        }).filter(entry => entry !== undefined)
    );

    const entries = Object.entries(filteredData);

    let selectedEntries = [];

    if (filteredData[currentTransaction]) {
        const currentTransactionEntry = entries.find(([key]) => key == currentTransaction);
        selectedEntries.push(currentTransactionEntry);

        const remainingEntries = entries
            .filter(([key]) => key != currentTransaction)
            .sort(([keyA], [keyB]) => parseInt(keyA) - parseInt(keyB))
            .slice(0, 9);

        selectedEntries = selectedEntries.concat(remainingEntries);
    } else {
        selectedEntries = entries
            .sort(([keyA], [keyB]) => parseInt(keyA) - parseInt(keyB))
            .slice(0, 10);
    }
    const result = {};
    selectedEntries.forEach(([key, value]) => {
        result[key] = value;
    });
    return result;
};