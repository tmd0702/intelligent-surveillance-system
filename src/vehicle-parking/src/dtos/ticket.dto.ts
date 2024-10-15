import {ParkingTicketStatus} from "@softzone/common";
export interface TicketDto {
    id: string;
    plate_number: string;
    face_id: string;
    check_in: string;
    check_out: string;
    status: ParkingTicketStatus;
}