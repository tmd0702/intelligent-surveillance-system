export interface TransactionDto {
    id: string;
    user_id: string;
    description: string;
    transaction_type: "deposit" | "withdraw",
    amount: number;
    balance_after: number;
    status: "pending" | "completed" | "failed"
}