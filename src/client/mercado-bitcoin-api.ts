import { Account } from "./account";
import { ClientConfiguration } from "./client-configuration";
import { Trading } from "./trading";

export class MercadoBitcoinApi {
    public account: Account
    public trading: Trading;

    private mercadoBitcoinApiKey: string;
    
    constructor(clientConfig: ClientConfiguration) {
        this.account = new Account();
        this.trading = new Trading();

    }

    
}