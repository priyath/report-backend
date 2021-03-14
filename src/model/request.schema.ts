import * as Joi from "@hapi/joi";

const pageSchema = Joi.object({
    pageNumber: Joi.number().required(),
    content: Joi.string().required(),
});

export const updateRequestSchema = Joi.object({
    tracts: Joi.object().pattern(Joi.string().required(), Joi.object({
        id: Joi.string().required(),
        pages: Joi.array().items(pageSchema).required()
    }).required())
});

export const createRequestSchema = Joi.object({
    title: Joi.string().required(),
    createdBy: Joi.string().required(),
    tracts: Joi.object().pattern(Joi.string().required(), Joi.object({
        id: Joi.string().required(),
        pages: Joi.array().items(pageSchema).required()
    }).required())
});
