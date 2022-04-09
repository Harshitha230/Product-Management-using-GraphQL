import { model, Schema, Model, Document } from 'mongoose';

export interface Product extends Document {
    name: string;
    price: number;
    quantity: number;
}

const Productschema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

export const Product: Model<Product> = model('Product', Productschema);