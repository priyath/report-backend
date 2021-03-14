const Joi = require('joi');

const pageSchema = Joi.object({
    pageNumber: Joi.number().required(),
    content: Joi.string().required(),
});

const tractSchema = Joi.object({
    id: Joi.string().required(),
    pages: Joi.array().items(pageSchema).required()
});

const tractsSchema = Joi.object().pattern(Joi.string().required(), tractSchema.required());

export const createRequestSchema = Joi.object({
    title: Joi.string().required(),
    createdBy: Joi.string().required(),
    tracts: tractsSchema.required(),
});

export const updateRequestSchema = Joi.object({
    tracts: tractsSchema.required(),
});
