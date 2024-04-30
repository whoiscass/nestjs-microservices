import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Transaction } from './schema/transaction.schema';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get()
  getTransactions(@Query('id') id: string) {
    if (!id) {
      return this.appService.getAll();
    }
    return this.appService.getTransaction(id);
  }

  @Post()
  async createOrder(@Body() transacion: Transaction) {
    return await this.appService.createTransaction(transacion);
  }

  @EventPattern('transaction_updated')
  handleTransactionCreated(data: any) {
    this.appService.updateTransaction(data.value);
  }
}
