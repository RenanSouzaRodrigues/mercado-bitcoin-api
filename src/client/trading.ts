export class Trading {

    /**
     * List orders from specific market (most recent first)
     * Has a rate limit of 10 requests per second
     * @param symbol Instrument symbol in the form BASE-QUOTE(e.g. BTC-BRL)
     */
    public async listOrders(symbol: string): Promise<any> {

    }

    public async placeOrder(tradeOrder: any): Promise<any> {

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