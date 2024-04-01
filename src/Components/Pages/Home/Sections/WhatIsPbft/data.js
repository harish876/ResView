export const data  = [
    {
        title: 'Request',
        subTitle: 'Client To Primary',
        description: 'The client sends the transaction request to the primary replicas in the blockchain',
    },
    {
        title: 'Pre Prepare',
        subTitle: 'Primary to Replicas',
        description: 'The primary replica selected by all other replicas in the blockchain, receives digitally signed transactions from clients and is in charge of organizing, allocating a sequence number, and distributing the transaction to all other replicas.'
    },
    {
        title: 'Prepare',
        subTitle: 'All Replicas to Each Other',
        description: 'The pre-prepare message that each replica received from the primary node is then broadcast to every other replica, including the primary node, during the prepare phase. Good replicas can get ready for the commit after learning that a majority of them received the same transaction during the prepare phase.'
    },
    {
        title: 'Commit',
        subTitle: 'All Replicas to Each Other',
        description: 'Non-faulty replicas create a prepare certificate and share it with the primary and all other replicas. If most replicas have the same prepare certificate at the end of the commit phase, then there is agreement on the particular transaction. As a result, replicas carry out the transaction.'
    },
    {
        title: 'Reply',
        subTitle: 'Replicas to Client',
        description: 'All replicas, primary included, respond to the client by confirming the transaction.'
    },
]