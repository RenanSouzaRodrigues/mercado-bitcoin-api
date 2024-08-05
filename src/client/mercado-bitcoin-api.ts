import axios, { AxiosResponse } from "axios";
import { Account } from "./account";
import { ClientConfiguration } from "./client-configuration";
import { Trading } from "./trading";
import { PublicData } from "./public-data";
import { Wallet } from "./wallet";

export class MercadoBitcoinApi {
    public publicData!:PublicData;
    public account!:Account;
    public trading!:Trading;
    public wallet!:Wallet;

    private clientConfig:ClientConfiguration;
    private readonly baseUrl!:string;
    private bearerToken!:string;
    
    constructor(clientConfig: ClientConfiguration) {
        this.clientConfig = clientConfig;
        this.baseUrl = "https://api.mercadobitcoin.net/api/v4";
        this.publicData = new PublicData(this.baseUrl);
    }

    public async authenticate():Promise<void> {
        try {
            const url:string = `${this.baseUrl}/authorize`;
            const body:{login:string, password:string} = {login: this.clientConfig.apiTokenId, password: this.clientConfig.apiTokenSecret};
            const response:AxiosResponse = await axios.post(url, body);
            const authenticatedSession:MbAuthenticatedSession = <MbAuthenticatedSession> response.data;
            this.bearerToken = authenticatedSession.access_token;
            this.buildReferences()
        } catch (error) {
            throw new Error("Provided public key and/or secret key are invalid. Authentication was not completed")
        }
    }

    private buildReferences():void {
        this.account = new Account("Bearer " + this.bearerToken, this.baseUrl + "/accounts");
        this.trading = new Trading("Bearer " + this.bearerToken, this.baseUrl + "/accounts");
        this.wallet = new Wallet("Bearer " + this.bearerToken, this.baseUrl + "/accounts");
    }
}

type MbAuthenticatedSession = {
    access_token:string;
    expiration:number;
}