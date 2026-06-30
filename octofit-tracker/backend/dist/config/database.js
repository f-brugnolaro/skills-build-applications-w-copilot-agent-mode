"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = exports.DATABASE_NAME = void 0;
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
exports.DATABASE_NAME = 'octofit_db';
exports.MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${exports.DATABASE_NAME}`;
async function connectToDatabase() {
    return mongoose_1.default.connect(exports.MONGODB_URI, {
        dbName: exports.DATABASE_NAME,
    });
}
