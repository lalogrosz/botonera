// lib/app.ts

import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from '../routes/routes';
import * as mongoose from "mongoose";
import * as cors from "cors";
import * as path from 'path';

class App {

    public app: express.Application;
    public routesPrv: Routes = new Routes();
    public dbName: string = 'botonera';

    constructor() {
        this.app = express();
        this.config();
        this.routesPrv.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        const staticPath = path.join(__dirname, '../public');
        console.log('Static path',staticPath);
        this.app.use(express.static(staticPath));

        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));

        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            preflightContinue: false
        };
        
        this.app.use(cors());
    }

    private mongoSetup(): void {
        (<any>mongoose).Promise = global.Promise;

        let mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + this.dbName;
     
        mongoose.connect(mongodb_connection_string);
    }
}

export default new App().app;