import {Report} from "../model/report.interface";

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);


// Set some defaults (required if database JSON file is empty)
db.defaults({ reports: [], count: 0 })
    .write();

// save a Report to database
export const saveToDatabase = (report: Report): Promise<any> => {

    db.get('reports')
        .push(report)
        .write();

    return Promise.resolve(report.id);
};

export const updateInDatabase = (reportId: string, updatedReport: Report): Promise<any> => {

    db.get('reports')
        .find({id: reportId})
        .assign(updatedReport)
        .write();

    return Promise.resolve(reportId);
};

export const loadFromDatabase = (reportId: string): Promise<Report> => {

    const report = db.get('reports')
        .find({id: reportId})
        .value();

    let testReport: Report = {
        id: report.id,
        createdTimestamp: report.createdTimestamp,
        lastUpdatedTimestamp: report.lastUpdatedTimestamp,
        title: report.title,
        createdBy: report.createdBy,
        tracts: report.tracts,
    };
    return Promise.resolve(testReport);
};
