// /lib/routes/routes.ts

import {Request, Response} from "express";
import { CategoryButtonController } from '../lib/controllers/categoryButtonController';
import * as multer from 'multer';

export class Routes {      
    
    public categoryButtonController: CategoryButtonController = new CategoryButtonController();

    public routes(app): void {          
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })       
        // POST endpoint
        .post((req: Request, res: Response) => {   
        // Create new button         
            res.status(200).send({
                message: 'POST request successfulll!!!!'
            })
        });

        app.route('/category-button')
        .post(this.categoryButtonController.addCategory)
        .get(this.categoryButtonController.getAll);


        // button detail
        app.route('/category-button/:buttonId')        
        .put((req: Request, res: Response) => {
        // Update a button           
            res.status(200).send({
                message: 'PUT request successfulll!!!!'
            })
        })
        .delete((req: Request, res: Response) => {       
        // Delete a button     
            res.status(200).send({
                message: 'DELETE request successfulll!!!!'
            })
        });

        const upload = multer({
            dest: __dirname + '/../public/sounds/',
          });
        
        app.post('/button/', upload.single('sound'), this.categoryButtonController.addNewButton)
    }
}