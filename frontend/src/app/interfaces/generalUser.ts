import { Account } from "./account"

export interface GeneralUser{
    _id: string,
    firstName: string,
    lastName: string,
    points: number,
    profilePic: string,
    address: string,
    account: Account,
    participatedEvents: any[]
}