export class Trading {
    private bearerToken: string;
    private baseUrl: string;

    constructor(bearerToken: string, baseUrl: string) {
        this.bearerToken = bearerToken;
        this.baseUrl = baseUrl;
    }

    /**
     * List orders from specific market (most recent first)
     * Has a rate limit of 10 requests per second
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     */
    public async listOrders(accountId: string, symbol: string): Promise<any> {
        
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
}