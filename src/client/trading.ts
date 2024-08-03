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

    /**
     * Place a new order.
     * Has a rate limit of 3 requests per second
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     * @param payload The request payload
     */
    public async placeOrder(accountId: string, symbol: string, payload: MbPlaceOrderPayload): Promise<MbPlaceOrderResponse> {
        const url = `${this.baseUrl}/${accountId}/${symbol}/orders`
        const headers = this.buildHeaders();
        const response = await axios.post(url, payload, {headers});
        return <MbPlaceOrderResponse> response.data;
    } 

    /**
     * Cancel an existing order. 
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     * @param orderId Unique order identifier
     * @param params The query params to filter the request (Not Required)
     */
    public async cancelOrder(accountId: string, symbol: string, orderId: string, params?: {async?: boolean}): Promise<MbCancelOrderResponse> {
        const url = `${this.baseUrl}/${accountId}/${symbol}/orders/${orderId}`;
        const headers = this.buildHeaders();
        const response = await axios.delete(url, {headers});
        return <MbCancelOrderResponse> response.data;
    }

    /**
     * Get unique order by identifier
     * @param accountId Account identifier. Obtained from List Accounts
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     * @param orderId Unique order identifier
     */
    public async getOrders(accountId: string, symbol: string, orderId: string): Promise<MbTradingOrder> {
        const url = `${this.baseUrl}/${accountId}/${symbol}/orders/${orderId}`;
        const headers = this.buildHeaders();
        const response = await axios.get(url, {headers});
        return <MbTradingOrder> response.data;
    }

    /**
     * Cancel all open orders for an account.
     * @param accountId Account identifier. Obtained from List Accounts
     * @param params The query params to filter the request (Not Required)
     */
    public async cancelAllOpenOrders(accountId: string, params?: {has_executions?: boolean, symbol?: string}): Promise<MbCancelAllOrdersResponse> {
        const url: string = `${this.baseUrl}/${accountId}/cancel_all_open_orders`
        const headers = this.buildHeaders();
        const response = await axios.delete(url, {headers, params});
        return <MbCancelAllOrdersResponse> response.data;
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

export type MbPlaceOrderPayload = {
    async: boolean,
    cost: number,
    externalId: number,
    limitPrice: number,
    qty: number,
    side: "buy" | "sell",
    stopPrice: number,
    type: "market" | "limit" | "stoplimit" | "post-only"
}

export type MbPlaceOrderResponse = {
    orderId: string;
}

export type MbCancelOrderResponse = {
    status: string
}

export type MbCancelAllOrdersResponse = {
    crypto: string;
    fiat: string;
    order_id: string;
    order_type: string;
    side: string;
    status: string;
}