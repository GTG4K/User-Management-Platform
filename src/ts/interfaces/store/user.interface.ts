import {IUser} from "../user.interface.ts";

export interface IUsersByPage {
    [key: number]: IUser[];
}

export interface IUserState {
    users: IUsersByPage
    total: number
}
