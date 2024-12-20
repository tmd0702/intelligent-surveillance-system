import {StoreStatus} from "@softzone/common";

export interface StoreDto {
    id: string;
    name: string;
    contact_number: string;
    category_id: string;
    status: StoreStatus;
}