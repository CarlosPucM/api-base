import { Router } from "express";
import welcomeRoutes from "./welcome.routes";
const router: Router = Router();

router.use(welcomeRoutes);

export default router;