//#region Imports
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import routes from "./routes";
//#endregion

//#region Initialization
const app: Application = express();
//#endregion

//#region Configs
app.set("port", process.env.PORT || 3000);
//#endregion

//#region Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//#endregion

//#region Routes
app.use(routes);
app.use(notFoundHandler);
app.use(errorHandler);
//#endregion

//#region Start server
app.listen(app.get("port"), () => {
    console.log(`Server on port ${app.get("port")}`);
});
//#endregion