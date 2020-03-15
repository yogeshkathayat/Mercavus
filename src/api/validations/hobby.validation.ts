
import { Request, Response, NextFunction } from "express";
import logger from "../../config/logger";
import ResponseHandler from "../../util/responseHandler";
import * as HttpStatus from "http-status";
import {
    errorMessage,
    version
} from "../../config/constants";
import { HobbyValidationSchema } from "../../api/models/hobby.model";

const fileName = "[hobby.validation.js]";


/**
 * validateHobby method
 * to validate hobby schema
 * Hobby 
 * @method
 */
const validateHobby = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const methodName = "[validateHobby]";
    const { error } = HobbyValidationSchema.validate(
        req.body
    );

    if (!error) return next();

    logger.error(`${fileName} ${methodName} Validation Error ${error}`);

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


export default validateHobby;