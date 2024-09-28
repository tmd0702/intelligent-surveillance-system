import {StoreStatus} from "@softzone/common";

export interface StoreDto {
    id: string;
    name: string;
    contactNumber: string;
    status: StoreStatus;
}