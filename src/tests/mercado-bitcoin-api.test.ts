import { MbAccount, MbAccountBalance } from "../client/account";
import { ClientConfiguration } from "../client/client-configuration";
import { MercadoBitcoinApi } from "../client/mercado-bitcoin-api";
import { MbFeeFromAsset, MbOrderBook, MbSymbol } from "../client/public-data";

const apiPublicKey:string = "";
const apiSecretKey:string = "";

const clientConfig:ClientConfiguration = {apiTokenId: apiPublicKey, apiTokenSecret: apiSecretKey}
const client = new MercadoBitcoinApi(clientConfig);
const auxData:{accountId?:string} = {};

describe("public api", () => {
    it("must get fees from assets", async () => {
        const response:MbFeeFromAsset = await client.publicData.getFeesFromAssets("USDC");
        expect(response.asset).toBe("USDC");
        expect(response.network).toBe("ethereum");
    });

    it("must get order book", async () => {
        const response:MbOrderBook = await client.publicData.getOrderBook("BTC-BRL");
        expect(response.asks.length).toBeGreaterThan(0);
        expect(response.bids.length).toBeGreaterThan(0);
        expect(response.timestamp).not.toBeNull();
    });

    it.only("must list candles", async () => {
        const response = await client.publicData.listCandles();
        console.log(response);
    });

    it("must list networks from asset", async () => {
        const response = await client.publicData.listNetworksFromAsset("BTC");
        console.log(response);
    });

    it("must list all public symbols", async () => {
        const response:MbSymbol = await client.publicData.listSymbols();
        console.log(response);
        expect(response.base_currency.length).toBeGreaterThan(0);
        expect(response.currency.length).toBeGreaterThan(0);
        expect(response.deposit_minimum.length).toBeGreaterThan(0);
        expect(response.description.length).toBeGreaterThan(0);
        expect(response.exchange_listed.length).toBeGreaterThan(0);
        expect(response.exchange_traded.length).toBeGreaterThan(0);
        expect(response.minmovement.length).toBeGreaterThan(0);
        expect(response.pricescale.length).toBeGreaterThan(0);
        expect(response.session_regular.length).toBeGreaterThan(0);
        expect(response.symbol.length).toBeGreaterThan(0);
        expect(response.timezone.length).toBeGreaterThan(0);
        expect(response.type.length).toBeGreaterThan(0);
        expect(response.withdraw_minimum.length).toBeGreaterThan(0);
        expect(response.withdrawal_fee.length).toBeGreaterThan(0);
    });

    it("must list tickers", async () => {
        const response = await client.publicData.listTickers({symbols: "BTC-BRL"});
        console.log(response);
    });

    it("must list trades", async () => {
        const response = await client.publicData.listTrades("BTC-BRL");
        console.log(response);
    });
})