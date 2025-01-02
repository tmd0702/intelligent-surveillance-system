import {ParkingTicketStatus} from "@softzone/common";
export interface TicketDto {
    id: string;
    plate_number: string;
    face_id: string;
    check_in: string;
    check_out: string;
    status: ParkingTicketStatus;
    plate_checkin_byte_data: Buffer;
    plate_checkout_byte_data: Buffer;
    face_checkin_byte_data: Buffer;
    face_checkout_byte_data: Buffer;
}