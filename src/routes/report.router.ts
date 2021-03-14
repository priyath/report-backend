import express, {NextFunction, Request, Response} from "express";
import * as ReportService from "../service/report.service";
import {Report} from "../model/report.interface";
import {ICreateRequest, IUpdateRequest} from "../model/request.interface";
import {requestValidator} from "../middleware/validator.middleware";
import {updateRequestSchema, createRequestSchema} from "../model/request.schema";

export const reportRouter = express.Router();

// GET report/:id to retrieve a report by id
reportRouter.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    console.log('retrieve report endpoint called');

    const id: string = req.params.id;

    try {
        const report: Report = await ReportService.load(id);

        res.status(200).send({
            success: 'true',
            payload: report,
        });

    } catch (e) {
        next(e); // forward to error handling middleware
    }
});

// POST report to save a new report
reportRouter.post("/", requestValidator(createRequestSchema), async(req: Request, res: Response, next: NextFunction) => {
    console.log('save new report endpoint called');

    try {
        const createObject: ICreateRequest = req.body;
        const id: string = await ReportService.create(createObject);

        res.status(200).send({
            success: 'true',
            payload: {
                id: id,
            },
        });
    } catch (e) {
        next(e); // forward to error handling middleware
    }
});

// PATCH report to update an existing report
reportRouter.patch("/:id", requestValidator(updateRequestSchema), async (req: Request, res: Response, next: NextFunction) => {
    console.log('update existing report endpoint called');

    const id: string = req.params.id;

    try {
        const reqObject: IUpdateRequest = {tracts: req.body.tracts};
        const result: string = await ReportService.update(id, reqObject);

        res.status(200).send({
            success: 'true',
            payload: {
                id: result,
            },
        });
    } catch (e) {
        next(e); // forward to error handling middleware
    }
});
