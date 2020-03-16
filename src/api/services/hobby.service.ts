
import { IHobby } from "../models/hobby.model";
import { HobbyModel } from "../../api/models/hobby.model";

/**
 * HobbyService class
 * @class
 */
export class HobbyService {

    constructor() { }

    /**
     * @description function to create
     * new hobby
     * @param {IHobby}  hobbyObject 
     * @returns {object} {}
     */
    public async create(hobbyObject: IHobby) {
        const methodName = "[create]";
        try {
            const hobby = new HobbyModel(hobbyObject);
            return await hobby.save();
        }
        catch (error) {
            throw error;
        }
    }


    /**
     * @description function to find
     * hobby based on id
     * @param {object} query 
     * @returns {object} {}
     */
    public async findOne(query: object) {
        const methodName = "[findOne]";
        try {
            return await HobbyModel.findOne(query);
        }
        catch (error) {
            throw error;
        }
    }



    /**
     * @description function to find 
     * list of hobbies 
     * @param {string}  text 
     * @returns {object} {}
     */
    public async findAll(query: object) {
        const methodName = "[findAll]";
        try {
            return await HobbyModel.find({}).lean();
        }
        catch (error) {
            throw error;
        }
    }


    /**
     * @description function to update
     * hobby based on id
     * @param {string}  id 
     * @param {IHobby}  hobbyObject
     * @returns {object} {}
     */
    public async update(id: string, hobbyObject: IHobby) {
        const methodName = "[update]";
        try {
            return await HobbyModel.findOneAndUpdate({ _id: id }, { $set: hobbyObject }, { new: true });
        }
        catch (error) {
            throw error;
        }
    }


    /**
     * @description function to delete
     * hobby using hobby id
     * @param {string}  id 
     * @returns {object} {}
     */
    public async delete(id: string) {
        const methodName = "[delete]";
        try {
            return await HobbyModel.findOneAndDelete({ _id: id });
        }
        catch (error) {
            throw error;
        }
    }
}