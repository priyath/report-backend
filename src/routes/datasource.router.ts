import express, { Request, Response } from "express";
import * as DataService from "../service/datasource.service";
import { DataSource } from "../model/datasource.interface";

/**
 * Router definition
 */
export const dataSourceRouter = express.Router();

dataSourceRouter.get("/", async (req: Request, res: Response) => {
    console.log('data source load endpoint called');

    try {
        const dataSource: DataSource = await DataService.load();

        res.status(200).send(dataSource);
    } catch (e) {
        res.status(500).send(e.message);
    }
});
