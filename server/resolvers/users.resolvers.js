"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginResolver = exports.signUpResolver = void 0;
const users_models_1 = require("../models/users.models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signUpResolver = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.User.findOne({ email: args.email });
        if (user) {
            throw new Error('User already exists. Please Login to your account');
        }
        else {
            const salt = bcryptjs_1.default.genSaltSync(10);
            const hash = bcryptjs_1.default.hashSync(args.password, salt);
            args.password = hash;
            const newUser = yield users_models_1.User.create(Object.assign({}, args));
            return newUser;
        }
    }
    catch (error) {
        return error;
    }
});
exports.signUpResolver = signUpResolver;
const loginResolver = (parent, args) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.User.findOne({ email: args.email });
        if (!user || user.comparePassword(args.password) === false) {
            throw new Error('Wrong email or password, Please check credentials.');
        }
        return { token: user.jwtGenerateToken(), id: user._id };
    }
    catch (error) {
        return error;
    }
});
exports.loginResolver = loginResolver;
