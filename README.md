# ResView - (ResilientDB Visualizer)

![Logo](https://i.postimg.cc/jd6PkhDs/Res-View-Logo-Dark.png)

ResView is a visualizer based on the Resilient Db fabric to show transaction visualizations.

#### Check out the [blog](https://aunsh.medium.com/resview-a-pbft-visualizer-based-on-the-resilientdb-blockchain-fabric-3ffaeb2aaee5) to know more!

## Get Prepared

Before running the ResView application, there are a few other services which need to be ran.

Git clone the ResilientDB backend repository and follow the instructions to set it up:
```bash
git clone https://github.com/apache/incubator-resilientdb
```

To enable different ResView api endpoints and view change service locally, go to service/tools/config/server/server.config in the ResilientDB repository and set: 
```bash
enable_resview:true
enable_faulty_switch:true
enable_viewchange:true
```

Setup KV Service to run the backend:
```bash
./service/tools/kv/server_tools/start_kv_service.sh
```

Git clone the GraphQL Repository and follow the instructions on the ReadMe to set it up:

Install GraphQL:
```bash
git clone https://github.com/ResilientApp/ResilientDB-GraphQL
```

Setup SDK:
```bash
bazel build service/http_server:crow_service_main

bazel-bin/service/http_server/crow_service_main service/tools/config/interface/service.config service/http_server/server_config.config
```

With these 2 services running, the ResView front end can now send transactions to the ResilientDB framework.

## Installation

Clone the repo and open in a new folder.

Create a .env file in the root directory with the following contents.

```bash
REACT_APP_SEND_POST_URL = "http://127.0.0.1:18000/v1/transactions/commit"
REACT_APP_SEND_GET_URL = "http://127.0.0.1:18000/v1/transactions/"
REACT_APP_DEFAULT_LOCAL = "http://localhost:"
REACT_APP_DEFAULT_LOCAL_PORT = 18501
REACT_APP_SOCKET_URL_EP = "/consensus_data"
REACT_APP_REPLICA_STATUS_EP = "/get_status"
```

Run the below command to install all required packages

```bash
npm install
```

Run the below code to start the app and load the script.

```bash
npm run start
```

Send transactions to backend using Set and Get fields, display a transaction's consensus data in the graphs, choose which transaction to view using choose transaction field.

## Contributing

Pull requests are welcome.

ALWAYS update your changes to a branch and drop a PR.

DO NOT MERGE unless approved by me.

## Authors

[aunshx](https://github.com/aunshx/)

[saipranav](https://github.com/Saipranav-Kotamreddy/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
