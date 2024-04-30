import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.schema';
import { Model } from 'mongoose';
import { TransactionResponse } from './schema/transaction.response';

@Injectable()
export class AppService {
  constructor(
    @Inject('BILLING_SERVICE') private readonly billingClient: ClientKafka,
    @InjectModel(Transaction.name) private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getAll() {
    return await this.transactionModel.find({});
  }

  async getTransaction(_id: string) {
    const rawTransaction = await this.transactionModel.findOne({ _id });
    return new TransactionResponse(rawTransaction);
  }

  async createTransaction(transacion: Transaction) {
    const created = await this.transactionModel.create(transacion);
    this.billingClient.emit(
      'transaction_created',
      JSON.stringify({ transaction: created }),
    );
    return created;
  }

  async updateTransaction(data: any) {
    const id = data?.transaction?._id;
    const dataToUpdate = { status: data?.status };
    return await this.transactionModel.findOneAndUpdate({ _id: id }, dataToUpdate);
  }
}
