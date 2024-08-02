import axios from "axios";

export class Trading {
    private bearerToken: string;
    private baseUrl: string;

    constructor(bearerToken: string, url: string) {
        this.bearerToken = `Bearer ${bearerToken}`;
        this.baseUrl = url + "/account";
    }

    /**
     * List orders from specific market (most recent first)
     * Has a rate limit of 10 requests per second
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     * @param params The query params to filter the request (Not Required)
     */
    public async listOrders(accountId: string, symbol: string, params?: {
        has_executions?: string,
        side?: 'buy' | 'sell',
        status?: 'created' | 'working' | 'cancelled' | 'filled',
        id_from?: number,
        id_to?: number,
        created_at_from?: number,
        created_at_to?: number,
        executed_at_from?: number,
        executed_at_to?: number
    }): Promise<MbTradingOrder[]> {
        const url = `${this.baseUrl}/${accountId}/${symbol}/orders`
        const headers = this.buildHeaders();
        const response = await axios.get(url, {headers, params});
        return <MbTradingOrder[]> response.data;
    }

    public async placeOrder(accountId: string, tradeOrder: any): Promise<any> {

    } 

    public async cancelOrder(): Promise<any> {

    }

    public async getOrders(): Promise<any> {
        
    }

    public async cancelAllOpenOrders(): Promise<any> {

    }

    public async listAllOrders(): Promise<any> {

    }

    private buildHeaders(): {'Content-Type': string, 'Authorization': string} {
        return {
            "Content-Type": "application/json",
            "Authorization": this.bearerToken,
        }
    }
}

export type MbTradingExecutionOrder = {
    executed_at: number;
    fee_rate: number;
    id: number;
    instrument: string;
    price: number;
    qty: number;
    side: string;
    liquidity: string;
}

export type MbTradingOrder = {
    avgPrice: number;
    cost: number;
    created_at: number;
    executions: MbTradingExecutionOrder[];
    externalId: number;
    fee: number;
    filledQty: number;
    id: string;
    instrument: string;
    limitPrice: number;
    qty: number;
    side: string;
    status: string;
    stopPrice: number;
    triggerOrderId: number;
    type: string;
    updated_at: number;
}