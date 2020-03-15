import express from "express";
import hobbyRoute from "./hobby.route";
import userRoute from "./user.route";


const router = express.Router();

/**
 * GET v1/health
 */
router.get("/health", (req, res) => res.status(200).send("OK"));
/**
 * GET v1/docs
 */
// router.use("/docs", express.static("docs"));

router.use("/hobbies", hobbyRoute);
router.use("/users", userRoute);




export default router;
