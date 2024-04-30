import { Transaction } from "./transaction.schema";

export class TransactionResponse {
    public transactionExternalId: string;
    public transactionStatus: any;
    public value: number;
    public createdAt: Date;
    constructor(transaction: any) {
        this.transactionExternalId = transaction._id;
        this.transactionStatus = { name: transaction.status };
        this.value = transaction.value;
        this.createdAt = transaction.createdAt;
    }
}