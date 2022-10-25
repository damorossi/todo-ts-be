import { response } from "express";
import { validationResult } from "express-validator";

const validate = (req: any, res = response, next: any) => {
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
