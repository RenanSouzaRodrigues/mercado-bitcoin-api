import { MbAccount, MbAccountBalance } from "../client/account";
import { ClientConfiguration } from "../client/client-configuration";
import { MercadoBitcoinApi } from "../client/mercado-bitcoin-api";

const apiPublicKey:string = "";
const apiSecretKey:string = "";

const clientConfig:ClientConfiguration = {apiTokenId: apiPublicKey, apiTokenSecret: apiSecretKey}
const client = new MercadoBitcoinApi(clientConfig);
const auxData:{accountId?:string} = {};

describe("Mercado bitcoin package tests", () => {
    it("", async () => {
        const reponse = client.publicData.listSymbols()
    })

    it("Must perform the authentication on mercado bitcoin api", () => {
        expect(async () => await client.authenticate()).not.toThrow();
    });

    it("Must return the list of accounts", async () => {
        const response:MbAccount[] = await client.account.listAccounts();
        expect(response.length).toBeGreaterThan(0);
        if (response.length > 0) auxData.accountId = response[0].id; 
    });

    it("", async () => {
        const response:MbAccountBalance[] = await client.account.listBalances(auxData.accountId!);
        expect(response.length).toBeGreaterThan(0);
    })
})