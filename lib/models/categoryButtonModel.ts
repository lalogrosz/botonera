//   /lib/models/crmModel.ts

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CategoryButtonSchema = new Schema({
    name: {
        type: String,
        required: 'Enter a first name'
    },
    order: {
        type: Number,
        default: 99999
    },
    user: {
        type: String,
        required: 'Enter el user id',
        index: true
    },
    buttons: [{
        name: {
            type: String,
            required: 'Enter a last name'
        },
        filename: {
            type: String            
        },        
        order: {
            type: Number,
            default: 99999
        },
        created_date: {
            type: Date,
            default: Date.now
        }
    }]
    
});