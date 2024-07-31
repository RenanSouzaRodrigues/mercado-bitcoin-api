import axios from "axios";
import { Account } from "./account";
import { ClientConfiguration } from "./client-configuration";
import { Trading } from "./trading";
import { PublicData } from "./public-data";

export class MercadoBitcoinApi {
    public publicData!: PublicData;
    public account!: Account;
    public trading!: Trading;

    private clientConfig: ClientConfiguration;
    private baseUrl: string;
    private bearerToken: string = "";
    
    constructor(clientConfig: ClientConfiguration) {
        this.clientConfig = clientConfig;
        this.baseUrl = "https://api.mercadobitcoin.net/api/v4"
    }

    public async authenticate(): Promise<void> {
        const url = `${this.baseUrl}/authorize`
        const body = { login: this.clientConfig.apiTokenId, password: this.clientConfig.apiTokenSecret };
        const response = await axios.post(url, body);
        this.bearerToken = response.data.access_token;
        this.buildReferences()        
    }

    private buildReferences(): void {
        this.publicData = new PublicData(this.baseUrl);
        this.account = new Account(this.bearerToken, this.baseUrl);
        this.trading = new Trading(this.bearerToken, this.baseUrl);
    }
}