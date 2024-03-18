import { Account } from "./account"

export interface GeneralUser{
    _id: String,
    firstName: String,
    lastName: String,
    points: number,
    profilePic: String,
    address: String,
    account: Account
}