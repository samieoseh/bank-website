import { UserType } from "./user";

export interface TransactionType {
    sender: UserType;
    reciever: UserType;
    amount: number;
    transactionDate: string;
    description: string;
    status: string;
    transactionType: string;
}