import {Report} from "../model/report.interface";
import * as util from "util";

const reportsData = require('../data/reports.json');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || 'src/data';


// save a Report to database
export const saveToDatabase = (report: Report): Promise<any> => {
    const id = report.id;

    reportsData[id] = report;

    // promisify callback based writeFile function
    const writeFilePromise = util.promisify(fs.writeFile);

    return writeFilePromise(`${DB_PATH}/reports.json`, JSON.stringify(reportsData))
        .then( () => id )
        .catch( (err: object) => { throw err } );
};

export const loadFromDatabase = (id: string): Promise<any> => {
    return Promise.resolve(reportsData[id]);
}
