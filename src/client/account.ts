import axios, { AxiosResponse } from "axios";

export class Account { 
    private bearerToken:string;
    private baseUrl:string;

    constructor(bearerToken:string, url:string) {
        this.bearerToken = `Bearer ${bearerToken}`;
        this.baseUrl = url + "/accounts";
    }

    /**
     * Get a list of accounts owned by the user. Usually, MercadoBitcoin works with only one default account.
     */
    public async listAccounts():Promise<MbAccount[]> {
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(this.baseUrl, {headers});
        return <MbAccount[]> response.data;
    }   

    /**
     * Get balances for all markets, including fiat, for an account
     * @param accountId Account identifier. Obtained from List Accounts
     */
    public async listBalances(accountId:string):Promise<MbAccountBalance[]> {
        const url:string = `${this.baseUrl}/${accountId}/balances`;
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers});
        return <MbAccountBalance[]> response.data;
    }

    /**
     * Get tier tax
     * @param accountId Account identifier. Obtained from List Accounts
     */
    public async getTier(accountId:string):Promise<MbAccountTier[]> {
        const url:string = `${this.baseUrl}/${accountId}/tier`;
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers});
        return <MbAccountTier[]> response.data;
    }

    /**
     * Get your trading fees for each symbol
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     */
    public async getTradingFees(accountId:string, symbol:string):Promise<MbAccountTradingFee> {
        const url:string = `${this.baseUrl}/${accountId}/${symbol}/fees`;
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers});
        return <MbAccountTradingFee> response.data;
    }

    /**
     * Get open positions (open orders) for an account.
     * @param accountId Account identifier. Obtained from List Accounts
     * @param params The query params you can send to filter the request (Not Required)
     */
    public async listPositions(accountId:string, params?:{symbol?:string}):Promise<MbAccountPosition> {
        const url:string = `${this.baseUrl}/${accountId}/positions`;
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers, params});
        return <MbAccountPosition> response.data;
    }

    private buildHeaders():{'Content-Type':string, 'Authorization':string} {
        return {
            "Content-Type": "application/json",
            "Authorization": this.bearerToken,
        }
    }
}

export type MbAccount = {
    currency:string;
    currencySign:string;
    id:string;
    name:string;
    type:string;
}

export type MbAccountBalance = {
    available:number;
    on_hold:number;
    symbol:string;
    total:number;
}

export type MbAccountTier = {
    tier:string;
}

export type MbAccountTradingFee = {
    base:string;
    quote:string;
    maker_fee:number;
    taker_fee:number;
}

export type MbAccountPosition = {
    avgPrice:number;
    category:string;
    id:number;
    instrument:string;
    qty:number;
    side:string;
}