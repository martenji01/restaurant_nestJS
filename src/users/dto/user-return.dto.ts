import {Types} from 'mongoose'
export class UserReturnDto {
    username: string
    role: string
    _id: Types.ObjectId
}
