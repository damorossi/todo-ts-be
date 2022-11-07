import { response, request, NextFunction } from "express";
import { validationResult } from "express-validator";

const validate = (req = request, res = response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
    return;
}

export default validate;
