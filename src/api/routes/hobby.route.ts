import express from "express";
import { HobbyController } from "../controllers/hobby.controller";
import validateHobby from "../validations/hobby.validation";

const router = express.Router();
const hobbyController = new HobbyController();


router.route("/")
    /**
    *  @swagger
    *  /api/v1/hobbies:
    *  get:
    *      tags:
    *          - Hobby
    *      operationId: gethobbies
    *      summary: Get list of hobbies 
    *      produces:
    *          - application/json
    *      responses:
    *          '200':
    *              description: Hobby list
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/HobbyResponseArray'
    *          '400':
    *              description: Bad request
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/ErrorResponse'
    */
    .get(hobbyController.findAll)

    /**
    *  @swagger
    *  /api/v1/hobbies:
    *  post:
    *      tags:
    *          - Hobby
    *      operationId: createHobby
    *      summary: Create a new hobby
    *      requestBody:
    *          description: Hobby data
    *          required: true
    *          content:
    *              application/json:
    *                  schema:
    *                      type: object
    *                      properties:
    *                          name:
    *                              type: string
    *                          passionLevel:
    *                              type: string
    *                              enum: [Low, Medium, High, Very-High]
    *                              required: true
    *                          year:
    *                              type: string
    *                          user:
    *                              type: string
    *                              required: true      
    *      produces:
    *          - application/json
    *      responses:
    *          '201':
    *              description: Created hobby
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/HobbyResponseObj'
    *          '200':
    *              description: Hobby Already Exists
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/HobbyResponseObj'
    *          '400':
    *              description: Bad request
    *              content:
    *                  application/json:
    *                      schema:
    *                          $ref: '#/components/schemas/ErrorResponse'
    */
    .post(validateHobby, hobbyController.create)

router.route("/:id")

    /**
     *  @swagger
     *  /api/v1/hobbies/{id}:
     *  get:
     *      tags:
     *          - Hobby
     *      operationId: getHobby
     *      summary: Get single hobby
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: string
     *            required: true
     *            description: Hobby ID
     *      produces:
     *          - application/json
     *      responses:
     *          '200':
     *              description: A single hobby
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/HobbyResponseObj'
     *          '404':
     *              description: Hobby not found
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
    .get(hobbyController.findOne)

    /**
     *  @swagger
     *  /api/v1/hobbies/{id}:
     *  put:
     *      tags:
     *          - Hobby
     *      operationId: updateHobby
     *      summary: update a hobby
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: string
     *            required: true
     *            description: Hobby ID
     *      produces:
     *          - application/json
     *      responses:
     *          '200':
     *              description: updated hobby
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/HobbyResponseObj'
     *          '404':
     *              description: Hobby not found
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
    .put(validateHobby, hobbyController.update)

    /**
     *  @swagger
     *  /api/v1/hobbies/{id}:
     *  delete:
     *      tags:
     *          - Hobby
     *      operationId: deleteHobby
     *      summary: delete a hobby
     *      parameters:
     *          - in: path
     *            name: id
     *            schema:
     *              type: string
     *            required: true
     *            description: Hobby ID
     *      produces:
     *          - application/json
     *      responses:
     *          '200':
     *              description: deleted hobby
     *              content:
     *                  application/json:
     *                      schema:
     *                          $ref: '#/components/schemas/HobbyResponseObj'
     *          '404':
     *              description: Hobby not found
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
    .delete(hobbyController.delete);


export default router;


/**
* @swagger
* components:
*  schemas:
*      Hobby:
*          type: object
*          properties:
*              _id:
*                  type: string
*              name:
*                  type: string
*                  required: true
*              passionLevel:
*                  type: string
*                  enum: [low, medium, high, very-high]
*                  required: true
*              year:
*                  type: string
*              createdAt:
*                  type: string
*              updatedAt:
*                  type: string
*      HobbyResponseObj:
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
*                  $ref: '#/components/schemas/Hobby'
*      HobbyResponseArray:
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
*                      $ref: '#/components/schemas/Hobby'
*      ErrorResponse:
*          type: object
*          properties:
*              status:
*                  type: boolean
*              code:
*                  type: number
*                  example: 404
*              message:
*                  type: string
*              appVersion:
*                  type: string
*              data:
*                  type: array |object
*/