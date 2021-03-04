import { BaseReport, Report } from '../model/report.interface';
import { v4 as uuidv4 } from 'uuid';
import { saveToDatabase, loadFromDatabase } from "../repository/report.repository";

/**
 * Report service methods
 */

// create a new report based on received payload
export const create = async (baseReport: BaseReport): Promise<string> => {
    const id = uuidv4();
    const currentTimestamp = Date.now().toString();

    const report: Report = {
        id,
        createdTimestamp: currentTimestamp,
        lastUpdatedTimestamp: currentTimestamp,
        ...baseReport,
    };

    return saveToDatabase(report);
};

// update existing report based on received payload
export const update = async (id: string, baseReport: BaseReport): Promise<string> => {
    const currentTimestamp = Date.now().toString();

    return loadFromDatabase(id).then((report: Report) => {
        if (report) {
            report.content = baseReport.content;
            report.lastUpdatedTimestamp = currentTimestamp;

            return saveToDatabase(report);
        }
        return `Report not found for ${id}`;
    });
};

// load a report by id
export const load = async (id: string): Promise<Report> => {
    return loadFromDatabase(id);
};
