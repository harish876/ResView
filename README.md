# ResView - (ResDB Visualizer)

![Logo](https://i.postimg.cc/C59hDQ4v/Res-View-Logo.jpg)

ResView is a visualizer based on the Resilient Db fabric to show transaction visualizations.

## Get Prepared

Before running the ResView application, there are a few other services which need to be ran.

Git clone the ResView backend repository and follow the instructions to set it up:
```bash
git clone https://github.com/Saipranav-Kotamreddy/ResView
```
Setup KV Service:
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

With these 2 services running, the ResView front end can now send transactions to the ResDB framework

## Installation

Clone the repo and open in a new folder.

```bash
npm install
```

Run the below code to start the app and load the script.

```bash
npm run start
```

Restart the KV Service when on the Visualizer page to connect the Websockets

Warning: View Change is currently inconsistent on the backend, so do not set 2 replicas to be faulty at the same time

## Contributing

Pull requests are welcome.

ALWAYS update your changes to a branch and drop a PR.

DO NOT MERGE unless approved by me.

## Authors

[aunshx](https://github.com/aunshx/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
