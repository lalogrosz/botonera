import * as mongoose from 'mongoose';
import { CategoryButtonSchema } from '../models/categoryButtonModel';
import { Request, Response } from 'express';
import * as FfmpegCommand from 'fluent-ffmpeg';
import * as fs from 'fs';
import config from '../config/config';

const CategoryButton = mongoose.model('CategoryButton', CategoryButtonSchema);

export class CategoryButtonController {

    public getAll(req: Request, res: Response) {
        const user = req.headers.username;

        CategoryButton.find({ user: 'alan' }, (err, categories) => {
            if (err) {
                res.send(err);
            }
            res.json(categories);
        });
    }

    public addCategory(req: Request, res: Response) {
        const user = req.headers.username;

        let newCategory = new CategoryButton(req.body);
        newCategory.set('user', user);

        newCategory.save((err, category) => {
            if (err) {
                res.send(err);
            }
            res.json(category);
        });
    }

    public updateCategory(req: Request, res: Response) {

        /*let Category = new CategoryButton(req.body);       
        
        newCategory.save((err, category) => {
            if(err){
                res.send(err);
            }    
            res.json(category);
        });*/
    }

    public addNewButton(req: Request, res: Response) {

        const user = req.headers.username;

        const category = req.body.category_id;
        const name = req.body.name;
        const filename = req.file.filename;
        const regionStart = req.body.region_start;
        const regionEnd = req.body.region_end;

        CategoryButton.findById(category, (err, categoryButton) => {
            if (err) {
                res.send(err);
            }
            if (categoryButton && categoryButton.get('user') === user) {
                const buttons = categoryButton.get('buttons');

                buttons.push({
                    name: name,
                    filename: filename
                });

                this.cutSound(regionStart, regionEnd, filename);

                categoryButton.update({ buttons: buttons }, (err, categoryButton) => {
                    if (err) {
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

    public cutSound(regionStart, regionEnd, filename) {
        regionStart = parseFloat(regionStart).toFixed(2);
        const duration = (parseFloat(regionEnd) - regionStart).toFixed(2);
        regionEnd = parseFloat(regionEnd).toFixed(2);
        console.log('region start', regionStart);
        console.log('region duration', duration);

        const inputFile = config.SOUND_PATH + '/' + filename;

        const command = FfmpegCommand(inputFile)
            .on('start', function (cmd) {
                console.log('Started ' + cmd);
            })
            .on('error', function (err) {
                console.log('An error occurred: ' + err.message);
            })
            .on('end', function () {
                console.log('Finished encoding');
                fs.unlinkSync(inputFile);
            });

        if (regionStart && regionEnd) {
            command.inputOptions([
                `-ss ${regionStart}`,
                `-t ${duration}`
            ]); // 2s
        }

        command.output(inputFile + '.mp3')
            .run();

        
    }


    public deleteButton(req: Request, res: Response) {
        const user = req.headers.username;

        const category = req.params.categoryId;
        const buttonId = req.params.buttonId;

        CategoryButton.findById(category, (err, categoryButton) => {
            if (err) {
                res.send(err);
            }
            if (categoryButton && categoryButton.get('user') === user) {
                let button;
                const buttons = categoryButton.get('buttons').filter(item => {
                    if (item._id.toString() !== buttonId) {
                        return true;
                    }
                    button = item;
                });
                categoryButton.update({ buttons: buttons }, (err) => {
                    if (err) {
                        res.send(err);
                    }
                    res.json(button);
                });
            } else {
                res.status(404);
                res.send('Category not found');
            }
        });
    }
}