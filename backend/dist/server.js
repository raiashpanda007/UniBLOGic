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
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies, tokens, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'], // Allowed headers
}));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
app.use('/api/auth', auth_routes_1.default);
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use('/api/user', user_routes_1.default);
const community_routes_1 = __importDefault(require("./routes/community.routes"));
app.use('/api/community', community_routes_1.default);
const post_routes_1 = __importDefault(require("./routes/post.routes"));
app.use('/api/post', post_routes_1.default);
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
