import {IUser} from "../user.interface.ts";
interface IUsersByPage {
    [key: number]: IUser[];
}

interface IUsersState {
    users: IUsersByPage
    total: number
}

export type {IUsersByPage, IUsersState}