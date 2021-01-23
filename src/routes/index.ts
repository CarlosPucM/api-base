import { Router } from "express";
import welcomeRoutes from "./welcome.routes";
import userRoutes from "./user.routes";
const router: Router = Router();

router.use(welcomeRoutes);
router.use("/User", userRoutes);

export default router;