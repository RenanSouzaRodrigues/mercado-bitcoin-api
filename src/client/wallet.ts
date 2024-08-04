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
        const url:string = `${this.baseUrl}/${accountId}/wallet/${symbol}/deposits`;
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
        const url:string = `${this.baseUrl}/${accountId}/wallet/${symbol}/deposits/addresses`
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers, params});
        return <MbWalletDepositAddressResponse> response.data;
    }

    /**
     * List fiat deposits made by a user for a symbol. Only BRL supported.
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument asset in the form BASE (e.g. BTC) 
     * @param params The query params to filter the request (Not Required)
     */
    public async listFiatDeposits(accountId:string, symbol:string, params?:{limit?:number, page?:number, from?:number, to?:number}):Promise<MbWalletFiatDeposit> {
        const url:string = `${this.baseUrl}/${accountId}/wallet/fiat/${symbol}/deposits`
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers, params});
        return <MbWalletFiatDeposit> response.data;
    }

    /**
     * Request for cryptocurrency or Brazilian Real currency transfer. So, if the coin field is filled with "BRL", 
     * a withdraw will be made to the informed banking account. If the coin field is filled with a cryptocurrency, 
     * a withdraw will be made to the informed wallet address.
     * IMPORTANT: It's only allowed the transfer to "reliable" destinations. The need to mark as safe a wallet address or 
     * banking account is a security measure. For cryptocurrency transfer, it's also needed email approval for the transfer. 
     * To mark a wallet address or banking account as "reliable", you need to have activates the "Two-Factor Authentication (2FA)" 
     * and have a "Security PIN". This feature is available for all users that have an active API Trade Key. 
     * You can configure reliable destinations at "Address Register" and/or "Banking Accounts".
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument asset in the form BASE (e.g. BTC)
     * @param payload The payload to send
     * @returns 
     */
    public async withdrawCoin(accountId:string, symbol:string, payload: MbWalletWithdrawCoinRequest):Promise<MbWalletWithdrawCoin> {
        const url:string = `${this.baseUrl}/${accountId}/wallet/${symbol}/withdraw`
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.post(url, payload, {headers});
        return <MbWalletWithdrawCoin> response.data;
    }

    public async listWthdrawCoin(accountId:string, symbol:string, params?:{page?:number, page_size?:number, from?:number}):Promise<MbWalletWithdrawCoin[]> {
        const url:string = `${this.baseUrl}/${accountId}/wallet/${symbol}/withdraw`
        const headers:{'Content-Type':string, 'Authorization':string} = this.buildHeaders();
        const response:AxiosResponse = await axios.get(url, {headers, params});
        return <MbWalletWithdrawCoin[]> response.data;
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

export type MbWalletFiatDepoitBankSource = {
    bank_code: number,
    bank_name: string,
    account_branch: string,
    account_number: string
}

export type MbWalletFiatDeposit = {
    id:number;
    amount:number;
    coin:string;
    status:string;
    transferType:string;
    source:MbWalletFiatDepoitBankSource;
    created_at:number;
    updated_at:number;
}

export type MbWalletWithdrawCoinRequest = {
    account_ref:number;
    address:string;
    description:string;
    destination_tag:string;
    network:string;
    quantity:number;
    tx_fee:number;
}

export type MbWalletWithdrawCoin = {
    account:number;
    address:string;
    coin:string;
    created_at:number;
    description:string;
    destination_tag:string;
    fee:number;
    id:number;
    net_quantity:number;
    network:string;
    quantity:number;
    status:number;
    tx:number;
    updated_at:number;
}

