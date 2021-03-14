import { Request, Response, NextFunction } from "express";
import {Schema} from "joi";

export const requestValidator = (schema: Schema) => {

    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = schema.validate(request.body);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            let message = "Schema validation error";

            if (error) {
                const {details} = error;
                message = details.map(i => i.message).join(',');
            }

            console.log("error", message);
            response.status(422).json({ error: true, message })
        }
    }
};


