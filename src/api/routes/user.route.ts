import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import validateUser from "../validations/user.validation";

const router = express.Router();
const userController = new UserController();


router.route("/")
    /**
    *  @swagger
    *  /api/v1/users:
    *  get:
    *      tags:
    *          - User
    *      operationId: getusers
    *      summary: Get list of users 
    *      produces:
    *          - application/json
    *      responses:
    *          '200':
    *              description: User list
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/UserResponseArray'
    *          '400':
    *              description: Bad request
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/ErrorResponse'
    */
    .get(userController.findAll)
    /**
    *  @swagger
    *  /api/v1/users:
    *  post:
    *      tags:
    *          - User
    *      operationId: createUser
    *      summary: Create a new User
    *      requestBody:
    *          description: User data
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      type: object
    *                      properties:
    *                          name:
    *                              type: string
    *                              required: true
    *                          hobbies:
    *                              type: array
    *                              items:
    *                                  type:string  
    *      produces:
    *          - application/json
    *      responses:
    *          '201':
    *              description: Created User
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/UserResponseObj'
    *          '200':
    *              description: User Already Exists
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/UserResponseObj'
    *          '400':
    *              description: Bad request
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/ErrorResponse'
    */
    .post(validateUser, userController.create)

router.route("/:id")
    /**
     *  @swagger
     *  /api/v1/users/{id}:
     *  get:
     *      tags:
     *          - User
     *      operationId: getUser
     *      summary: Get single User
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: string
     *            required: true
     *            description: User ID
     *      produces:
     *          - application/json
     *      responses:
     *          '200':
     *              description: A single User
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/UserResponseObj'
     *          '404':
     *              description: User not found
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ErrorResponse'
     *          '400':
     *              description: Bad request
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ErrorResponse'
     */
    .get(userController.findOne)
    /**
     *  @swagger
     *  /api/v1/users/{id}:
     *  put:
     *      tags:
     *          - User
     *      operationId: updateUser
     *      summary: update a User
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: string
     *            required: true
     *            description: User ID
     *      produces:
     *          - application/json
     *      responses:
     *          '200':
     *              description: updated User
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/UserResponseObj'
     *          '404':
     *              description: User not found
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ErrorResponse'
     *          '400':
     *              description: Bad request
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ErrorResponse'
     */
    .put(validateUser, userController.update)
    /**
     *  @swagger
     *  /api/v1/users/{id}:
     *  delete:
     *      tags:
     *          - User
     *      operationId: deleteUser
     *      summary: delete a User
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: string
     *            required: true
     *            description: User ID
     *      produces:
     *          - application/json
     *      responses:
     *          '200':
     *              description: deleted User
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/UserResponseObj'
     *          '404':
     *              description: User not found
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ErrorResponse'
     *          '400':
     *              description: Bad request
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/ErrorResponse'
     */
    .delete(userController.delete);

export default router;


/**
* @swagger
* components:
*  schemas:
*      User:
*          type: object
*          properties:
*              _id:
*                  type: string
*              name:
*                  type: string
*                  required: true
*              hobbies:
*                  type: array
*                  items:
*                      $ref: '#/components/schemas/Hobby'
*              createdAt:
*                  type: string
*              updatedAt:
*                  type: string
*      UserResponseObj:
*          type: object
*          properties:
*              status:
*                  type: boolean
*              code:
*                  type: number
*                  example: 201
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: object
*                  $ref: '#/components/schemas/User'
*      UserResponseArray:
*          type: object
*          properties:
*              status:
*                  type: boolean
*              code:
*                  type: number
*                  example: 200
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array
*                  items:
*                      $ref: '#/components/schemas/User'
*/