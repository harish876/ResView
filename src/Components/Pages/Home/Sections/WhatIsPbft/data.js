export const data  = [
    {
        title: 'Request',
        subTitle: 'Place one to Place two',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione consequatur inventore doloremque nesciunt ipsum ullam perspiciatis quae qui adipisci quod.',
    },
    {
        title: 'Pre Prepare',
        subTitle: 'Place one to Place two',
        description: 'The primary replica, which is selected by all other replicas in the blockchain, receives digitally signed transactions from clients and is in charge of organizing, allocating a sequence number, and distributing the transaction to all other replicas.'
    },
    {
        title: 'Prepare',
        subTitle: 'Place one to Place two',
        description: 'The pre-prepare message that each replica received from the primary node is then broadcast to every other replica, including the primary node, during the prepare phase. Good replicas can get ready for the commit after learning that a majority of them received the same transaction during the prepare phase.'
    },
    {
        title: 'Commit',
        subTitle: 'Place one to Place two',
        description: 'Non-faulty replicas create a prepare certificate and share it with the primary and all other replicas. If most replicas have the same prepare certificate at the end of the commit phase, then there is agreement on the particular transaction. As a result, replicas carry out the transaction.'
    },
    {
        title: 'Reply',
        subTitle: 'Place one to Place two',
        description: 'All replicas, primary included, respond to the client by confirming the transaction.'
    },
]