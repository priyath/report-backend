import express, { Request, Response } from "express";
import * as ReportService from "../service/report.service";
import {BaseReport, Report} from "../model/report.interface";

/**
 * Router definition
 */
export const reportRouter = express.Router();

// GET report/:id to retrieve a report by id
reportRouter.get("/:id", async (req: Request, res: Response) => {
    console.log('retrieve report endpoint called');

    const id: string = req.params.id;

    try {
        const report: Report = await ReportService.load(id);

        res.status(200).send({
            success: 'true',
            payload: report,
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST report to save a new report
reportRouter.post("/", async (req: Request, res: Response) => {
    console.log('save new report endpoint called');

    try {
        const baseReport: BaseReport = req.body;
        const id: string = await ReportService.create(baseReport);

        res.status(200).send({
            success: 'true',
            payload: id,
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// POST report to update an existing report
reportRouter.post("/:id", async (req: Request, res: Response) => {
    console.log('update existing report endpoint called');

    const id: string = req.params.id;

    try {
        const baseReport: BaseReport = req.body;
        const result: string = await ReportService.update(id, baseReport);

        res.status(200).send({
            success: 'true',
            payload: result,
        });
    } catch (e) {
        res.status(500).send(e.message);
    }
});
