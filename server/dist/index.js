"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
//Importing project dependancies that we installed earlier
const dotenv = tslib_1.__importStar(require("dotenv"));
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const validateEnv_1 = tslib_1.__importDefault(require("./utils/validateEnv"));
//App Varaibles 
dotenv.config();
(0, validateEnv_1.default)();
//intializing the express app 
const app = (0, express_1.default)();
//using the dependancies
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello world');
});
//exporting app
module.exports = app;
//# sourceMappingURL=index.js.map