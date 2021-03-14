import {Report} from "../model/report.interface";

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


// Set some defaults (required if database JSON file is empty)
db.defaults({ reports: [], count: 0 })
    .write();

// save a report to database
export const saveToDatabase = (report: Report): Promise<any> => {

    db.get('reports')
        .push(report)
        .write();

    db.update('count', (n: number) => n + 1)
        .write();

    return Promise.resolve(report.id);
};

// update a report in the database
export const updateInDatabase = (reportId: string, updatedReport: Report): Promise<any> => {

    db.get('reports')
        .find({id: reportId})
        .assign(updatedReport)
        .write();

    return Promise.resolve(reportId);
};

// load report from database
export const loadFromDatabase = (reportId: string): Promise<Report | null> => {

    const report = db.get('reports')
        .find({id: reportId})
        .value();

    if (report) {
        let testReport: Report = {
            id: report.id,
            createdTimestamp: report.createdTimestamp,
            lastUpdatedTimestamp: report.lastUpdatedTimestamp,
            title: report.title,
            createdBy: report.createdBy,
            tracts: report.tracts,
        };
        return Promise.resolve(testReport);
    }

    throw ({
        status: 404,
        message: `Report not found for ${reportId}`
    });
};
