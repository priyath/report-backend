import * as Joi from "@hapi/joi";

const pageSchema = Joi.object({
    pageNumber: Joi.number().required(),
    content: Joi.string().required(),
});

export const updateRequestSchema = Joi.object({
    tracts: Joi.array().items(Joi.object({
        id: Joi.string().required(),
        pages: Joi.array().items(pageSchema).required()
    }).required())
});
