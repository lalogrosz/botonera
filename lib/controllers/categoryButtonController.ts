import * as mongoose from 'mongoose';
import { CategoryButtonSchema } from '../models/categoryButtonModel';
import { Request, Response } from 'express';

const CategoryButton = mongoose.model('CategoryButton', CategoryButtonSchema);

export class CategoryButtonController {

    public addCategory (req: Request, res: Response) {  
                
        let newCategory = new CategoryButton(req.body);       
        
        newCategory.save((err, category) => {
            if(err){
                res.send(err);
            }    
            res.json(category);
        });
    }

    public addNewButton (req: Request, res: Response) {  
        
        const category = req.body.category_id;
        const name =  req.body.name;
        const filename = req.file.filename;
        
        CategoryButton.findById(category, (err, categoryButton) => {
            if(err){
                res.send(err);
            }
            const buttons = categoryButton.get('buttons');
            buttons.push({
                name: name,
                filename: filename
            });
            categoryButton.update({buttons: buttons}, (err, categoryButton) => {
                if(err){
                    res.send(err);
                }    
                res.json(categoryButton);
            });
        });
        /*
        
        newContact.save((err, contact) => {
            if(err){
                res.send(err);
            }    
            res.json(contact);
        });*/
    }
}