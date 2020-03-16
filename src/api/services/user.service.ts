
import { IUser } from "../models/user.model";
import { UserModel } from "../../api/models/user.model";



/**
 * UserService class
 * @class
 */
export class UserService {

    constructor() { }

    /**
     * @description function to create
     * new user
     * @param {IUser}  userObject 
     * @returns {object} {}
     */
    public async create(userObject: IUser) {
        const methodName = "[create]";
        try {
            const user = new UserModel(userObject);
            return await user.save();
        }
        catch (error) {
            throw error;
        }
    }


    /**
     * @description function to find
     * user based on id
     * @param {object} query 
     * @returns {object} {}
     */
    public async findOne(query:object) {
        const methodName = "[findOne]";
        try {
            return await UserModel.findOne(query).populate('hobbies');
        }
        catch (error) {
            throw error;
        }
    }



    /**
     * @description function to find 
     * list of users 
     * @param {string}  text 
     * @returns {object} {}
     */
    public async findAll(query: object) {
        const methodName = "[findAll]";
        try {
            return await UserModel.find({}).populate('hobbies').lean();
        }
        catch (error) {
            throw error;
        }
    }


    /**
     * @description function to update
     * user based on id
     * @param {string}  id 
     * @param {IUser}  userObject
     * @returns {object} {}
     */
    public async update(id: string, userObject: IUser) {
        const methodName = "[update]";
        try {
            return await UserModel.findOneAndUpdate({ _id: id }, { $set: userObject }, { new: true });
        }
        catch (error) {
            throw error;
        }
    }


    /**
     * @description function to delete
     * user using user id
     * @param {string}  id 
     * @returns {object} {}
     */
    public async delete(id: string) {
        const methodName = "[delete]";
        try {
            return await UserModel.findOneAndDelete({ _id: id });
        }
        catch (error) {
            throw error;
        }
    }
}