export class PaymentDTO {
  // Payment data:
  identifier: string;
    user_uid: string;
  amount: number;
  memo: string; // a string provided by the developer, shown to the user
  metadata: Object; // an object provided by the developer for their own usage
  from_address: string; // sender address of the blockchain transaction
  to_address: string; // recipient address of the blockchain transaction
  direction: any; // direction of the payment
  created_at: Date; // the payment's creation timestamp

  // Status flags representing the current state of this payment
  status: {
  developer_approved: boolean; // Server-Side Approval
    transaction_verified: boolean; // blockchain transaction verified
    developer_completed: boolean; // Server-Side Completion
    cancelled: boolean, // cancelled by the developer or by Pi Network
    user_cancelled: boolean, // cancelled by the user
};

  // Blockchain transaction data:
  transaction?: { // This is null if no transaction has been made yet
    txid: string, // id of the blockchain transaction
    verified: boolean, // true if the transaction matches the payment, false otherwise
    _link: string, // a link to the operation on the Blockchain API
  }
};