import { ClientConfiguration } from "../client/client-configuration";
import { MercadoBitcoinApi } from "../client/mercado-bitcoin-api";
import { MbCandle, MbFeeFromAsset, MbNetworkFromAsset, MbOrder, MbOrderBook, MbSymbol, MbTicker } from "../client/public-data";
import 'dotenv/config'
import {MbAccount, MbAccountBalance, MbAccountTradingFee} from "../client/account";

const clientConfig:ClientConfiguration = {apiTokenId: <string>process.env.PUBLIC_KEY, apiTokenSecret: <string>process.env.SECRET_KEY}
const client:MercadoBitcoinApi = new MercadoBitcoinApi(clientConfig);
let accountId:string = "";
const getAccountId = async ():Promise<void> => {
    await client.authenticate();
    const response:MbAccount[] = await client.account.listAccounts();
    accountId = response[0].id;
}

describe("public api", ():void => {
    it("must get fees from assets", async ():Promise<void> => {
        const response:MbFeeFromAsset = await client.publicData.getFeesFromAssets("USDC");
        expect(response.asset).toBe("USDC");
        expect(response.network).toBe("ethereum");
    });

    it("must get order book", async ():Promise<void> => {
        const response:MbOrderBook = await client.publicData.getOrderBook("BTC-BRL");
        expect(response.asks.length).toBeGreaterThan(0);
        expect(response.bids.length).toBeGreaterThan(0);
        expect(response.timestamp).not.toBeNull();
    });

    it("must list candles", async ():Promise<void> => {
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

    it("must list networks from asset", async ():Promise<void> => {
        const response:MbNetworkFromAsset[] = await client.publicData.listNetworksFromAsset("BTC");
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].coin).toBe("BTC");
    });

    it("must list all public symbols", async ():Promise<void> => {
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

    it("must list tickers", async ():Promise<void> => {
        const response:MbTicker[] = await client.publicData.listTickers({symbols: "BTC-BRL"});
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].pair).toBe("BTC-BRL");
    });

    it("must list trades", async ():Promise<void> => {
        const response:MbOrder[] = await client.publicData.listTrades("BTC-BRL");
        expect(response.length).toBeGreaterThan(0);
    });
});

describe("mercado bitcoin authentication process", ():void => {
    it("must throw error if the public key or secret key is invalid", async ():Promise<void> => {
        const config:ClientConfiguration = {apiTokenId: "test", apiTokenSecret: "test"};
        const errorClient:MercadoBitcoinApi = new MercadoBitcoinApi(config);
        await expect(errorClient.authenticate())
            .rejects
            .toThrow("Provided public key and/or secret key are invalid. Authentication was not completed")
    });

    it("must complete authentication if public key and secret key are valid", async ():Promise<void> => {
        await expect(client.authenticate()).resolves
    });
});

describe("account tests", ():void => {
    it("must list accounts", async ():Promise<void> => {
        await client.authenticate();
        const response:MbAccount[] = await client.account.listAccounts();
        expect(response.length).toBeGreaterThan(0);
        expect(response[0].id).not.toBeNull();
        accountId = response[0].id;
    });

    it("must return account balances", async ():Promise<void> => {
        if (!accountId) await getAccountId();
        const response:MbAccountBalance[] = await client.account.listBalances(accountId);
        expect(response.length).toBeGreaterThan(0);
    });

    it("must return trading fees", async ():Promise<void> => {
        if (!accountId) await getAccountId();
        const response:MbAccountTradingFee = await client.account.getTradingFees(accountId, "BTC");
        console.log(response);
    });

    it("must", async ():Promise<void> => {
        if (!accountId) await getAccountId();
        const response = await client.account.listPositions(accountId);
        expect(response).not.toBeNull()
    });
});

describe("trading tests", ():void => {
    it("", async ():Promise<void> => {
        if (!accountId) await getAccountId();
        const response = await client.trading.listAllOrders(accountId);
        console.log(response);
    })
})