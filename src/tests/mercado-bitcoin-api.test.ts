import { MbAccount, MbAccountBalance } from "../client/account";
import { ClientConfiguration } from "../client/client-configuration";
import { MercadoBitcoinApi } from "../client/mercado-bitcoin-api";
import { MbCandle, MbFeeFromAsset, MbNetworkFromAsset, MbOrder, MbOrderBook, MbSymbol, MbTicker } from "../client/public-data";

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

    it("must list candles", async () => {
        const to:Date = new Date()
        to.setHours(to.getHours() + 3);

        const from:Date = new Date(); 
        from.setHours(from.getHours() - 10);
        
        const response:MbCandle = await client.publicData.listCandles({
            symbol: "BTC-BRL", 
            resolution: "15m", 
            to: Math.floor(to.getTime() / 1000), 
            from: Math.floor(from.getTime() / 1000)
        });

        expect(response.c.length).toBeGreaterThan(0);
        expect(response.h.length).toBeGreaterThan(0);
        expect(response.l.length).toBeGreaterThan(0);
        expect(response.o.length).toBeGreaterThan(0);
        expect(response.t.length).toBeGreaterThan(0);
        expect(response.v.length).toBeGreaterThan(0);
    });

    it("must list networks from asset", async () => {
        const response:MbNetworkFromAsset[] = await client.publicData.listNetworksFromAsset("BTC");
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].coin).toBe("BTC");
    });

    it("must list all public symbols", async () => {
        const response:MbSymbol = await client.publicData.listSymbols();
        expect(response.base_currency.length).toBeGreaterThan(0);
        expect(response.currency.length).toBeGreaterThan(0);
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
    });

    it("must list tickers", async () => {
        const response:MbTicker[] = await client.publicData.listTickers({symbols: "BTC-BRL"});
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].pair).toBe("BTC-BRL");
    });

    it("must list trades", async () => {
        const response:MbOrder[] = await client.publicData.listTrades("BTC-BRL");
        expect(response.length).toBeGreaterThan(0);
    });
});

describe("Account API", () => {
    
})