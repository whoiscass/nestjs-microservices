import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @EventPattern('transaction_created')
  handleTransactionCreated(data: any) {
    this.appService.handleTransactionCreated(data.value);
  }
}
