import express from "express";
import hobbyRoute from "./hobby.route";
import userRoute from "./user.route";
import swaggerUi from "swagger-ui-express";

import {specs} from "../../config/swagger";

const router = express.Router();

/**
 * GET v1/health
 */


router.get("/health", (req, res) => res.status(200).send("OK"));
/**
 * GET v1/docs
 */
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

router.use("/hobbies", hobbyRoute);
router.use("/users", userRoute);




export default router;
