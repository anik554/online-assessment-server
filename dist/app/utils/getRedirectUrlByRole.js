"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedirectUrlByRole = void 0;
const getRedirectUrlByRole = (role) => {
    switch (role) {
        case "EMPLOYER":
            return "/employer/dashboard";
        case "CANDIDATE":
            return "/candidate/dashboard";
        default:
            return "/";
    }
};
exports.getRedirectUrlByRole = getRedirectUrlByRole;
