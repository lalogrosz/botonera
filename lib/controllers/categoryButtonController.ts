import * as mongoose from 'mongoose';
import { CategoryButtonSchema } from '../models/categoryButtonModel';
import { Request, Response } from 'express';

const CategoryButton = mongoose.model('CategoryButton', CategoryButtonSchema);

export class CategoryButtonController {

    public getAll(req: Request, res: Response) {
        const user = req.headers.username;

        CategoryButton.find({user: 'alan'}, (err, categories) => {
            if(err){
                res.send(err);
            }
           res.json(categories);
        });
    }

    public addCategory (req: Request, res: Response) {  
        const user = req.headers.username;
                
        let newCategory = new CategoryButton(req.body);  
        newCategory.set('user', user);     
        
        newCategory.save((err, category) => {
            if(err){
                res.send(err);
            }    
            res.json(category);
        });
    }

    public updateCategory (req: Request, res: Response) {  
                
        /*let Category = new CategoryButton(req.body);       
        
        newCategory.save((err, category) => {
            if(err){
                res.send(err);
            }    
            res.json(category);
        });*/
    }

    public addNewButton (req: Request, res: Response) {  

        const user = req.headers.username;
        
        const category = req.body.category_id;
        const name =  req.body.name;
        const filename = req.file.filename;
        
        CategoryButton.findById(category, (err, categoryButton) => {
            if(err){
                res.send(err);
            }
            if (categoryButton && categoryButton.get('user') === user) {
                const buttons = categoryButton.get('buttons');
                buttons.push({
                    name: name,
                    filename: filename
                });
                categoryButton.update({buttons: buttons}, (err, categoryButton) => {
                    if(err){
                        res.send(err);
                    }    
                    res.json(buttons[buttons.length - 1]);
                });
            } else {
                res.status(404);
                res.send('Category not found'); 
            }
        });
    }
}