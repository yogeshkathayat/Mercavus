import express from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../services/user.service";
import validateUser from "../validations/user.validation";

const router = express.Router();
const hobbyController = new UserController();


router.route("/")
.get(hobbyController.findAll)
    .post(validateUser, hobbyController.create)
    
router.route("/:id")
    .get(hobbyController.findOne)
    .put(validateUser, hobbyController.update)
    .delete(hobbyController.delete);

export default router;