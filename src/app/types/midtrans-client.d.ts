declare module "midtrans-client" {
  interface SnapOptions {
    isProduction: boolean;
    serverKey: string;
    clientKey: string;
  }

  interface TransactionParameter {
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    expiry?: {
      start_time: string;
      unit: string;
      duration: number;
    };
  }

  class Snap {
    constructor(options: SnapOptions);
    createTransaction(param: TransactionParameter): Promise<{ redirect_url: string }>;
  }

  export { Snap };
}
