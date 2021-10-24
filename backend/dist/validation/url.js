"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const is_empty_1 = __importDefault(require("is-empty"));
const validator_1 = __importDefault(require("validator"));
function validateURL(data) {
    let errors = {};
    // Convert empty fields to empty string to use validator functions (validator only works on strings)
    data.id = (0, is_empty_1.default)(data.id) ? '' : data.id;
    data.url = (0, is_empty_1.default)(data.url) ? '' : data.url;
    // URL check
    if (validator_1.default.isEmpty(data.url))
        errors.url = 'URL is empty';
    else if (!validator_1.default.isURL(data.url))
        errors.url = 'Invalid URL';
    return { errors, isValid: (0, is_empty_1.default)(errors) };
}
exports.default = validateURL;
//# sourceMappingURL=url.js.map