import { Router } from "express";
import userController from "./../controllers/user.controller";
const router: Router = Router();

router.get("/", userController.getAll);
router.get("/:id", userController.findById);
router.post("/", userController.insert);
router.delete("/:id", userController.delete);
router.put("/:id", userController.update);

export default router;