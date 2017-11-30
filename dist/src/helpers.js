"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
//# sourceMappingURL=helpers.js.map