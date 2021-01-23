//#region Imports
import "reflect-metadata" ;
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import { notFoundHandler } from "./middlewares/notFound.middleware";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import routes from "./routes";
import { createConnection } from "typeorm";
const conf = require('../ormconfig.js');
//#endregion

//#region Initialization
const app: Application = express();
createConnection(conf).then(async connection => {
    console.log("DB is connected")
 }).catch(error => {
     console.log(error)
 });
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