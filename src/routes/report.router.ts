import express, { Request, Response } from "express";
import * as ReportService from "../service/report.service";
import { Report } from "../model/report.interface";

/**
 * Router definition
 */
export const reportRouter = express.Router();

reportRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const report: Report = await ReportService.load("");

        res.status(200).send(report);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
