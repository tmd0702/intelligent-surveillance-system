import {PaymentStatus} from "@softzone/common";

export interface PaymentDto {
    id: string;
    user_id: string;
    order_id: string;
    total_amount: number;
    payment_method: string;
    status: PaymentStatus;
}