import {Account} from "./account"

export interface PRC {
  _id: String,
  PRCName: String,
  PRCBusinessRegNumber: String,
  District: String,
  Address: String,
  PRCStatus: String,
  account: Account
}
