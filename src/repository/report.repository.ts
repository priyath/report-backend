import {Report} from "../model/report.interface";
import * as util from "util";

const reportsData = require('../data/reports.json');
const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// save a Report to database
export const saveToDatabase = (report: Report): Promise<any> => {
    const id = report.id;

    reportsData[id] = report;

    // promisify callback based writeFile function
    const writeFilePromise = util.promisify(fs.writeFile);

    return writeFilePromise('src/data/reports.json', JSON.stringify(reportsData))
        .then( () => id )
        .catch( (err: object) => { throw err } );
};

export const loadFromDatabase = (id: string): Promise<any> => {
    return Promise.resolve(reportsData[id]);
}
