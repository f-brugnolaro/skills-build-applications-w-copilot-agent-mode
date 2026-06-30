"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const health_1 = __importDefault(require("./routes/health"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', health_1.default);
app.get('/', (_req, res) => {
    const codespaceName = process.env.CODESPACE_NAME;
    const baseUrl = codespaceName
        ? `https://${codespaceName}-8000.app.github.dev`
        : 'http://localhost:8000';
    res.json({
        name: 'OctoFit Tracker API',
        baseUrl,
        apiRoot: '/api',
    });
});
async function startServer() {
    try {
        await mongoose_1.default.connect(MONGODB_URI, {
            dbName: 'octofit_db',
        });
        app.listen(PORT, () => {
            console.log(`OctoFit backend listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
