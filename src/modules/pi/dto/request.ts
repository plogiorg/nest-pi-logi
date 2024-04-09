import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsObject, IsOptional, IsString, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
export class PaymentStatus{

  @ApiProperty()
  @IsBoolean()
  developer_approved: boolean; // Server-Side Approval

  @ApiProperty()
  @IsBoolean()
  transaction_verified: boolean; // blockchain transaction verified

  @ApiProperty()
  @IsBoolean()
  developer_completed: boolean; // Server-Side Completion

  @ApiProperty()
  @IsBoolean()
  cancelled: boolean// cancelled by the developer or by Pi Network

  @ApiProperty()
  @IsBoolean()
  user_cancelled: boolean // cancelled by the user

}


export class PaymentTransaction {
  // This is null if no transaction has been made yet
  @ApiProperty()
  @IsString()
  txid: string // id of the blockchain transaction

  @ApiProperty()
  @IsBoolean()
  verified: boolean // true if the transaction matches the payment, false otherwise

  @ApiProperty()
  @IsString()
  _link: string // a link to the operation on the Blockchain API
}
export class PaymentDTO {
  // Payment data:
  @ApiProperty()
  @IsString()
  identifier: string;

  @ApiProperty()
  @IsString()
    user_uid: string;

  @ApiProperty()
  @IsString()
  amount: number;

  @ApiProperty()
  @IsString()
  memo: string; // a string provided by the developer, shown to the user


  @ApiProperty()
  @IsObject()
  metadata: any; // an object provided by the developer for their own usage

  @ApiProperty()
  @IsString()
  from_address: string; // sender address of the blockchain transaction

  @ApiProperty()
  @IsString()
  to_address: string; // recipient address of the blockchain transaction

  @ApiProperty()
  @IsString()
  direction: any; // direction of the payment

  @ApiProperty()
  @IsString()
  created_at: Date; // the payment's creation timestamp

  // Status flags representing the current state of this payment
  @ApiProperty()
  @ValidateNested()
  @Type(() => PaymentStatus)
  status: PaymentStatus;

  // Blockchain transaction data:
  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => PaymentTransaction)
  transaction?: PaymentTransaction
}

