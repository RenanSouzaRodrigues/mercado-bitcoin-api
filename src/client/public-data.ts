import axios from "axios";

export class PublicData {
    constructor(private baseUrl: string) { }

    /**
     * Request for asset's withdraw fee (network fee charge)
     * Has a request limit of 1 request per second
     * @param asset Instrument asset in the form BASE(e.g. USDC)
     */
    public async getFeesFromAssets(asset: string, params?: {network: string}): Promise<MbFeeFromAsset> {
        const url = `${this.baseUrl}/${asset}/fees`;
        const headers = { "Content-Type": "application/json" };
        const response = await axios.get(url, {headers, params});
        return <MbFeeFromAsset> response.data;
    }

    /**
     * Get current orderbook (depth of market) for the instrument.
     * Has a request limit of 1 request per second
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     */
    public async getOrderBook(symbol: string, params?: {limit: number}): Promise<MbOrderBook> {
        const url = `${this.baseUrl}/${symbol}/orderbook`;
        const headers = {"Content-Type": "application/json"};
        const response = await axios.get(url, {headers, params});
        return <MbOrderBook> response.data;
    }

    /**
     * List trades (executions).
     * Has a request limit of 1 request per second
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     */
    public async listTrades(symbol: string, params?: {tid: number, since: number, from: number, to: number, limit: number}): Promise<MbOrder[]> {
        const url = `${this.baseUrl}/${symbol}/trades`;
        const headers = {"Content-Type": "application/json"};
        const response = await axios.get(url, {headers, params});
        return <MbOrder[]> response.data;
    }

    /**
     * Request for history bars (candles).
     * Has a request limit of 1 request per second
     */
    public async listCandles(params?: {symbol: string, resolution: string, to: number, from: number, countback: number}): Promise<MbCandle> {
        const url = `${this.baseUrl}/candles`;
        const headers = {"Content-Type": "application/json"};
        const response = await axios.get(url, {headers, params});
        return <MbCandle> response.data; 
    }

    /**
     * Get a list of all instruments.
     * Has a request limit of 1 request per second
     */
    public async listSymbols(params?: {symbols: string}): Promise<MbSymbol> {
        const url = `${this.baseUrl}/symbols`;
        const headers = {"Content-Type": "application/json"};
        const response = await axios.get(url, {headers, params});
        const payload: MbSymbol = <MbSymbol> response.data;
        payload.base_currency = response.data["base-currency"];
        payload.deposit_minimum = response.data["deposit-minumun"];
        payload.exchange_listed = response.data["exchange-listed"];
        payload.exchange_traded = response.data["exchange-traded"];
        payload.session_regular = response.data["session-regular"];
        return payload;
    }

    /**
     * Get current prices of the instrument.
     * Has a request limit of 1 request per second
     */
    public async listTickers(params: {symbols: string}): Promise<MbCandle> {
        const url = `${this.baseUrl}/tickers`;
        const headers = {"Content-Type": "application/json"};
        const response = await axios.get(url, {headers, params});
        return <MbCandle> response.data; 
    }

    /**
     * Retrieves the networks associated with a specific asset (networks available for withdrawal).
     * Please note that assets in pre-listing or delisted status do not provide network information.
     * Has a request limit of 1 request per second
     * @param asset Instrument asset in the form BASE(e.g. BTC)
     */
    public async listNetworksFromAsset(asset: string): Promise<MbNetworkFromAsset[]> {
        const url = `${this.baseUrl}/${asset}/networks`;
        const headers = {"Content-Type": "application/json"};
        const response = await axios.get(url, {headers});
        return <MbNetworkFromAsset[]> response.data;
    }
}

export type MbFeeFromAsset = {
    asset: string;
    network: string;
    deposit_minimum: number;
    deposit_confirmations_required: number;
    withdraw_minimum: number;
    withdrawal_fee: number;
}

export type MbOrderBook = {
    asks: number[];
    bids: number[];
    timestamp: number;
}

export type MbOrder = {
    amount: number;
    date: number;
    price: number;
    tid: number;
    type: string;
}

export type MbCandle = {
    c: number[];
    h: number[];
    l: number[];
    o: number[];
    t: number[];
    v: number[];
}

export type MbSymbol = {
    base_currency: string[];
    currency: string[];
    deposit_minimum: number[];
    description: string[];
    exchange_listed: boolean[];
    exchange_traded: boolean[];
    minmovement: number[];
    pricescale: number[];
    session_regular: string[];
    symbol: string[];
    timezone: string[];
    type: string[];
    withdraw_minimum: number[];
    withdrawal_fee: number[];
}

export type MbNetworkFromAsset = {
    coin: string;
    network: string;
}