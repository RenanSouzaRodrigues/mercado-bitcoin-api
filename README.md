# Mercado Bitcoin API
This package aims to facilitate integration with the Mercado Bitcoin API, 
in an easy way and properly separating all the responsabilities of the API.

## Installing the package
the installation process is eazy and just need a single package to handle everything
```
npm install mercado-bitcoin-api
```

## Configuration
In order to configure the client you just need to provide your Mercado Bitcoin `Public` and `Secret` API keys.
Rembember to always store then in a safe location of your code.

After getting your API keys, use then in the following way:
```ts
import {MercadoBitcoinApi, ClientConfiguration} from "mercado-bitcoin-api";

const clientConfiguration: ClientConfiguration = {
    apiTokenId: "YOUR PUBLIC API TOKEN",
    apiTokenSecret: "YOUR SECRET API TOKEN"
}

const mercadoBitcoinClient: MercadoBitcoinApi = new MercadoBitcoinApi(clientConfiguration);
```

## Getting public data
With your client ready to go, you can perform a lot of actions inside the Mercado Bitcoin API.
One of then is getting public data.

Public data can be acessed using the following method:
```ts
const response = await mercadoBitcoinClient.publicData.listSymbols();
// or you can use callbacks
mercadoBitcoinClient.publicData.listSymbols().then(response);
```

The public data propertie of the `MercadoBitcoinClient` class handles all the Mercado Bitcoin public data
endpoints

## Authentication
All the endpoints follow the same logic as the public data endpoints.
But, in order for you to use the marjority of Mercado Bitcoin API, you must be Authenticated.

In order to authenticate your application, you must do the following:
```ts
import {MercadoBitcoinApi, ClientConfiguration} from "mercado-bitcoin-api";

const clientConfiguration: ClientConfiguration = {
    apiTokenId: "YOUR PUBLIC API TOKEN",
    apiTokenSecret: "YOUR SECRET API TOKEN"
}

const mercadoBitcoinClient: MercadoBitcoinApi = new MercadoBitcoinApi(clientConfiguration);

mercadoBitcoinClient.authenticate();
```
