"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
app.use('/api/auth', auth_routes_1.default);
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
