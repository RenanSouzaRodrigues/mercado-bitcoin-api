import axios from "axios";

export class Account { 
    private bearerToken: string;
    private baseMbUrl: string;

    constructor(bearerToken: string, url: string) {
        this.bearerToken = bearerToken;
        this.baseMbUrl = url + "/accounts";
    }

    private buildHeaders() {
        return {
            "Content-Type": "application/json",
            "Authorization": this.bearerToken,
        }
    }
}

export type MbAccount = {
    currency: string;
    currencySign: string;
    id: string;
    name: string;
    type: string;
}