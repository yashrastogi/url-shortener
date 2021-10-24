"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const URL_1 = require("./models/URL");
const url_1 = __importDefault(require("./validation/url"));
const app = (0, express_1.default)();
const port = 8080;
// middlewares
app.use(express_1.default.json());
// db config
const dbURI = require('./config/keys').mongoURI;
// Connect to MongoDB instance
mongoose_1.default
    .connect(dbURI)
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => {
    console.log(err);
    process.exit(1);
});
// base page
app.get('/', (req, res) => {
    URL_1.URL.findOne({ id: req.query.id }).then((url) => {
        if (url) {
            res.json(url);
        }
        else {
            res.status(400).json({ status: 'Short URL is does not exist' });
        }
    });
});
// @route POST /create
// @desc Create short URL
// @access Public
app.post('/create', (req, res) => {
    console.log(req.body);
    URL_1.URL.findOne({ id: req.body.id }).then((url) => {
        if (url) {
            res.status(400).json({ status: 'Short URL ID exists' });
        }
        else {
            const { errors, isValid } = (0, url_1.default)(req.body);
            if (isValid) {
                const _id = new mongoose_1.default.Types.ObjectId().toString();
                new URL_1.URL({
                    id: req.body.id ? req.body.id : _id,
                    _id: _id,
                    url: req.body.url,
                })
                    .save()
                    .then((newUrl) => res.json(Object.assign(Object.assign({}, newUrl._doc), { status: 'Inserted record' })))
                    .catch((err) => console.log(err));
            }
            else {
                res.status(400).json(Object.assign(Object.assign({}, errors), { status: 'Invalid input' }));
            }
        }
    });
});
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map