import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @Prop()
  accountExternalIdDebit: string;

  @Prop()
  accountExternalIdCredit: string;

  @Prop()
  tranferTypeId: number;

  @Prop()
  value: number;

  @Prop(
    {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default : 'pending'
      }
  )
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);