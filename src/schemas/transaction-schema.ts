import { z } from "zod";

const transactionSchema = z.object({
    amount: z.coerce.number().positive("Amount must be positive"),
    description: z.string().optional(),
    transactionType: z.string(),
    transactionDate: z.string(),
    sender: z.string().length(10, "Sender account number must be 10 characters"),
    receiver: z.string().length(10, "Reciever account number must be 10 characters")
})

export default transactionSchema;