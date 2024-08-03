export class Wallet {
    private bearerToken: string;
    private baseUrl: string;

    constructor(bearerToken: string, url: string) {
        this.bearerToken = `Bearer ${bearerToken}`;
        this.baseUrl = url + "/account";
    }

    
}