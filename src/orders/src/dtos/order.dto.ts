import {OrderStatus} from '@softzone/common';

export interface OrderDto {
    id: string;
    user_id: string;
    store_id: string;
    status: OrderStatus;
    total_amount: number;
}