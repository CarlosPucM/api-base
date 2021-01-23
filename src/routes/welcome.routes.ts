import { Router } from "express";
import welcomeController from "./../controllers/welcome.controller";
const router: Router = Router();

router.get("/", welcomeController.welcome);

export default router;