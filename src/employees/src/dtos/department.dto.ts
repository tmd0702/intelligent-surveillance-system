import {DepartmentStatus} from "@softzone/common/build/events/enums/department-status";

export interface DepartmentDto {
    id: string;
    name: string;
    description?: string;
    status: DepartmentStatus;
}