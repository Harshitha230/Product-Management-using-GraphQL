"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
const TOKEN_KEY = process.env.TOKEN_KEY;
const Userschema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String }
});
Userschema.methods.comparePassword = function (userpwd) {
    const res = bcryptjs_1.default.compareSync(userpwd, this.password);
    if (res === false) {
        console.log("Passwords dont match");
        return false;
    }
    else {
        console.log("Passwords match");
        return true;
    }
};
Userschema.methods.jwtGenerateToken = function (data, req, res) {
    return jsonwebtoken_1.default.sign({ email: this.email }, TOKEN_KEY, { expiresIn: 3600 });
};
exports.User = (0, mongoose_1.model)('User', Userschema);
