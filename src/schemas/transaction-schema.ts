import { z } from "zod";

const transactionSchema = z.object({
    amount: z.coerce.number({ message: "Amount must be a number" }).positive("Amount must be positive"),
    description: z.string().optional(),
    transactionType: z.enum(["DEPOSIT", "WITHDRAWAL", "TRANSFER", ""]),
    sender: z.string().optional(),
    reciever: z.string().optional()
}).refine((data) => {
    if (["TRANSFER", ""].includes(data.transactionType)) {
        return !!data.sender;
    }
    if (["WITHDRAWAL"].includes(data.transactionType)) {
        return !!data.reciever;
    }
    console.log({data})
    return true;
}, {
    message: "Sender is required",
    path: ["sender"]
});

export default transactionSchema;
