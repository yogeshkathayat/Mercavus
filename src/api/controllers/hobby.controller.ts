import { Request, Response } from "express";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import isMongoId from 'validator/lib/isMongoId';


import {
    errorMessage,
    version
} from "../../config/constants";
import logger from "../../config/logger";
import { HobbyService } from "../services/hobby.service";

const hobbyService=new HobbyService();
const fileName = "[Hobby.controller.js]";


/**
 * HobbyController class
 * contains methods related to
 * Hobby 
 * @class
 */
export class HobbyController {
 

    constructor() {

    }

    /**
     * @description function to add hobby into database
     * @param {Request} req req object containing text field
     * @param {Response} res response object
     */
    public async create(req: Request, res: Response) {
        const methodName = "[create]";
        try {

            let createdHobby = await hobbyService.create(req.body);

            return ResponseHandler.setResponse(res, true, HttpStatus.CREATED, errorMessage.SUCCESS, version.v1, createdHobby);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }


    /**
    * @description function to get hobby using id
    * @param {Request} req req object containing id as param
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

            let hobbyObject = await hobbyService.findOne(id);

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, hobbyObject);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }



    /**
     * @description function to get all hobbies
     * @param {Request} req req object
     * @param {Response} res response object
     */
    public async findAll(req: Request, res: Response) {
        const methodName = "[findAll]";
        try {

            let hobbies = await hobbyService.findAll({});

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, hobbies);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }



    /**
    * @description function to update hobby into database
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
            let existingHobby = await hobbyService.findOne(id);

            if (!existingHobby) {
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.NOT_FOUND,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'Hobby Not Found'
                    }
                );
            }

            let updateHobbyObject = await hobbyService.update(id, req.body);

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, updateHobbyObject);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }





    /**
     * @description function to delete hobby from database
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
            let existingHobby = await hobbyService.findOne(id);

            if (!existingHobby) {
                return ResponseHandler.setResponse(
                    res,
                    false,
                    HttpStatus.NOT_FOUND,
                    errorMessage.FAILED,
                    version.v1,
                    {
                        error: 'Hobby Not Found'
                    }
                );
            }

            let deleteResult = await hobbyService.delete(id);

            return ResponseHandler.setResponse(res, true, HttpStatus.OK, errorMessage.SUCCESS, version.v1, deleteResult);
        }
        catch (error) {
            logger.error(`${fileName} ${methodName} error in main try block ${error}`);
            return ResponseHandler.setResponse(res, false, HttpStatus.INTERNAL_SERVER_ERROR, `${error}`, version.v1, {});
        }
    }

}