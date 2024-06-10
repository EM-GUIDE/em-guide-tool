"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.truncateText = void 0;
const truncateText = ({ text, characterlLimit = 32 }) => {
    if (text.length <= characterlLimit) {
        return text;
    }
    return text.slice(0, characterlLimit) + '...';
};
exports.truncateText = truncateText;
