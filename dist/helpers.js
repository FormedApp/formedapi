"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = function (headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return undefined;
        }
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=helpers.js.map