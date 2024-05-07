import {Role} from "../enums/role.enum";

export interface IJWTPayload {
    userId: string;
    role: Role;
}