"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductResolver = exports.updateProductResolver = exports.createProductResolver = exports.productResolver = exports.productsResolver = void 0;
const products_models_1 = require("../models/products.models");
const productsResolver = (parent, args) => {
    return products_models_1.Product.find({});
};
exports.productsResolver = productsResolver;
const productResolver = (parent, args) => {
    return products_models_1.Product.findById(args.id);
};
exports.productResolver = productResolver;
const createProductResolver = (parent, args) => {
    const newProduct = new products_models_1.Product({
        name: args.name,
        price: args.price,
        quantity: args.quantity
    });
    return newProduct.save();
};
exports.createProductResolver = createProductResolver;
const updateProductResolver = (parent, args) => {
    try {
        if (!args.id) {
            console.log('Product does not exist');
        }
        return products_models_1.Product.findOneAndUpdate({
            _id: args.id
        }, {
            $set: {
                name: args.name,
                price: args.price,
                quantity: args.quantity
            }
        });
    }
    catch (error) {
        return error;
    }
};
exports.updateProductResolver = updateProductResolver;
const deleteProductResolver = (parent, args) => {
    try {
        if (!args.id) {
            console.log('Product does not exist');
        }
        return products_models_1.Product.findByIdAndDelete(args.id);
        console.log('Product deleted');
    }
    catch (error) {
        return error;
    }
};
exports.deleteProductResolver = deleteProductResolver;
