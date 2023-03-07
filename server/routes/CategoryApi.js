import { Router } from "express";
import * as CategoryConroller from "../controller/CategoryController.js";
const router = Router();

router.delete("/:id", CategoryConroller.destroy);
router.patch("/:id", CategoryConroller.update);
router.post("/", CategoryConroller.create);

export default router;
