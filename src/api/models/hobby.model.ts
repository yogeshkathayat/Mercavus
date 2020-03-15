import { Schema, Document, model } from 'mongoose'
import * as Joi from '@hapi/joi';

export const HobbyValidationSchema = Joi.object().keys({
    _id: Joi.string(),
    name: Joi.string().required(),
    passionLevel: Joi.string().valid('low', 'medium', 'high', 'very-high').required(),
    year: Joi.string().alphanum().default('')
});

export interface IHobby extends Document {
    _id: string;
    name: string;
    passionLevel: string;
    year: string;
}

const hobbySchema = new Schema({
    passionLevel: { type: String, required: true, enum: ['low', 'medium', 'high', 'very-high'] },
    name: { type: String, required: true },
    year: { type: String }
}, { timestamps: true });

export const HobbyModel = model<IHobby>("Hobby", hobbySchema);