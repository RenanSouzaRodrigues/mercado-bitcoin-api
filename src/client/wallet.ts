import axios, { AxiosResponse } from "axios";

export class Wallet {
    constructor(private bearerToken:string, private baseUrl:string) { }

    /**
     * List the deposits made by a user for a symbol. Fiat deposits not included.
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument asset in the form BASE (e.g. BTC) 
     * @param params The query params to filter the request (Not Required)
     */
    public async listDeposits(accountId:string, symbol:string, params?:{limit?:number, page?:number, from?:number, to?:number}):Promise<MbWalletDeposit[]> {
        const url:string = `${this.baseUrl}/account/${accountId}/wallet/${symbol}/deposits`;
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers, params});
        return <MbWalletDeposit[]> response.data;
    }

    /**
     * Get the deposit addresses (wallet-in) and/or tag/memo. Deposits are only available for the main wallet when using multiwallet.
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument asset in the form BASE (e.g. BTC) 
     * @param params The query params to filter the request (Not Required)
     */
    public async getDepositAddress(accountId:string, symbol:string, params?:{network?:string}):Promise<MbWalletDepositAddressResponse> {
        const url:string = `${this.baseUrl}/account/${accountId}/wallet/${symbol}/deposits/addresses`
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers, params});
        return <MbWalletDepositAddressResponse> response.data;
    }

    

    private buildHeaders():{'Content-Type':string, "Authorization":string} {
        return { 'Content-Type': 'application/json', 'Authorization': this.bearerToken };
    }
}

export type MbWalletDeposit = {
    address:string;
    address_tag:number;
    amount:number;
    coin:string;
    confirmTimes:string;
    createdAt:number;
    network:string;
    origin:string[];
    status:number;
    transaction_id:string;
    transferType:string;
}

export type MbWalletDepositAddressConfig = {
    contract_address:string;
}

export type MbWalletDepositAddressExtra = {
    address_tag:string;
}

export type MbWalletDepositAddressQrCode = {
    base64:string; 
    format:string;
}

export type MbWalletDepositAddress = {
    hash:string;
    extra:MbWalletDepositAddressExtra; 
    qrcode: MbWalletDepositAddressQrCode;
}

export type MbWalletDepositAddressResponse = {
    config:MbWalletDepositAddressConfig;
    addresses:MbWalletDepositAddress[]; 
}