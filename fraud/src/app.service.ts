import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('GATEWAY_SERVICE') private readonly gatewayClient: ClientKafka,
  ) {}

  handleTransactionCreated(transactionCreatedData: any) {
    let status = 'rejected';
    const { transaction } = transactionCreatedData;
    const value = +transaction?.value;
    if (value <= 1000) {
      status = 'approved'
    }
    this.gatewayClient.emit(
      'transaction_updated',
      JSON.stringify({ status, transaction }),
    );
  }
}
