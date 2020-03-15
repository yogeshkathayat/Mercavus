import { Schema, Document, model } from 'mongoose';
import * as Joi from '@hapi/joi';
import { IHobby } from './hobby.model';

export const UserValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    hobbies:  Joi.array()
});
export interface IUser extends Document {
    _id: string;
    name: string;
    hobbies?: IHobby[];
}

const userSchema = new Schema({
    name: { type: String, required: true },
    hobbies: [{
        type: Schema.Types.ObjectId,
        ref: 'Hobby'
    }]
}, { timestamps: true });

export const UserModel = model<IUser>("User", userSchema);