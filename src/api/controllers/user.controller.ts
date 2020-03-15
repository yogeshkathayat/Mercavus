import { Request, Response } from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import logger from "../../config/logger";
import { UserService } from "../services/user.service";
import isMongoId from 'validator/lib/isMongoId';

const userService=new UserService();

const fileName = "[user.controller.js]";


/**
 * UserController class
 * contains methods related to
 * User
 * @class
 */
export class UserController {

    constructor() {}

    /**
     * @description function to add user into database
     * @param {Request} req req object containing text field
     * @param {Response} res response object
     */
    public async create(req: Request, res: Response) {
        const methodName = "[create]";
        try {

            let createdHobby = await userService.create(req.body);

            return ResponseHandler.setResponse(res, true, HttpStatus.CREATED, errorMessage.SUCCESS, version.v1, createdHobby);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }


    /**
    * @description function to get user
    * @param {Request} req req object
    * @param {Response} res response object
    */
    public async findOne(req: Request, res: Response) {

        const methodName = "[findOne]";
        try {
            const { id } = req.params;
            if(!isMongoId(id)){
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.BAD_REQUEST,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'Bad Request'
                    }
                );
            }
            let userObject = await userService.findOne(id);

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, userObject);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }



    /**
     * @description function to find all users
     * @param {Request} req req object
     * @param {Response} res response object
     */
    public async findAll(req: Request, res: Response) {

        const methodName = "[findAll]";
        try {

            let hobbies = await userService.findAll({});

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, hobbies);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }
    /**
    * @description function to update User into database
    * @param {Request} req req object
    * @param {Response} res response object
    */
    public async update(req: Request, res: Response) {

        const methodName = "[update]";
        try {
            const { id } = req.params;

            if(!isMongoId(id)){
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.BAD_REQUEST,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'Bad Request'
                    }
                );
            }
            let existingUser = await userService.findOne(id);

            if (!existingUser) {
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.NOT_FOUND,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'User Not Found'
                    }
                );
            }

            let updateHobbyObject = await userService.update(id, req.body);

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, updateHobbyObject);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }
    /**
     * @description function to remove User from database
     * @param {Request} req req object
     * @param {Response} res response object
     */
    public async delete(req: Request, res: Response) {
        const methodName = "[delete]";
        try {
            const { id } = req.params;

            if(!isMongoId(id)){
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.BAD_REQUEST,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'Bad Request'
                    }
                );
            }
            let existingUser = await userService.findOne(id);

            if (!existingUser) {
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.NOT_FOUND,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'User Not Found'
                    }
                );
            }

            let deleteResult = await userService.delete(id);

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, deleteResult);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }

}
