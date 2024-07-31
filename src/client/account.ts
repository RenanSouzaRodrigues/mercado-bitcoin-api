import fetch, { HeadersInit, RequestInfo } from "node-fetch";

export class Account { 
    private bearerToken: string;
    private baseMbUrl: string;

    constructor(bearerToken: string, url: string) {
        this.bearerToken = bearerToken;
        this.baseMbUrl = url;
    }

    /**
     * Get a list of accounts owned by the user. Usually, MercadoBitcoin works with only one default account.
     */
    public async listAccounts(): Promise<MbAccount[]> {
        const headers = this.buildHeaders();
        const url = `${this.baseMbUrl}/accounts`;
        const response = await fetch(url, { method: "get", headers });
        if (response.status != 200) throw new Error("Invalid request to account list");
        const json = await response.json();
        return JSON.parse(<string> json);
    }

    /**
     * Get balances for all markets, including fiat, for an account
     * Has a rate limit of 3 requests per second
     */
    public async listBalances(): Promise<any> {

    }

    public async getTier(): Promise<any> {

    }

    public async listPositions(): Promise<any> {

    }

    private buildHeaders(): { 'Content-Type' : string, 'Authorization': string } {
        return { 'Content-Type': 'application/json', 'Authorization': this.bearerToken };
    }
}

export type MbAccount = {
    currency: string;
    currencySign: string;
    id: string;
    name: string;
    type: string;
}