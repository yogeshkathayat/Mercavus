import express from "express";
import { HobbyController } from "../controllers/hobby.controller";
import validateHobby from "../validations/hobby.validation";

const router = express.Router();
const hobbyController = new HobbyController();


router.route("/")
.get(hobbyController.findAll)
    .post(validateHobby, hobbyController.create)
  
router.route("/:id")
    .get(hobbyController.findOne)
    .put(validateHobby, hobbyController.update)
    .delete(hobbyController.delete);


export default router;