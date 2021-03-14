import * as Joi from '@hapi/joi';
import { Request, Response, NextFunction } from "express";

export const middleware = (schema: object) => {

    return (request: Request, response: Response, next: NextFunction) => {
        const { error } = Joi.validate(request.body, schema);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');

            console.log("error", message);
            response.status(422).json({ error: true, message })
        }
    }
};


