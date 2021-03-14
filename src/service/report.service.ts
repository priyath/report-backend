import {Report} from '../model/report.interface';
import {v4 as uuidv4} from 'uuid';
import {saveToDatabase, loadFromDatabase, updateInDatabase} from "../repository/report.repository";
import {ICreateRequest, IUpdateRequest} from "../model/request.interface";
import {updateTracts} from "../common/utils";

/**
 * Report service methods
 */
// create a new report based on received payload
export const create = async (createReqObject: ICreateRequest): Promise<string> => {
    const id = uuidv4();
    const currentTimestamp = Date.now().toString();

    const report: Report = {
        id,
        createdTimestamp: currentTimestamp,
        lastUpdatedTimestamp: currentTimestamp,
        ...createReqObject,
    };

    return saveToDatabase(report);
};

// update existing report based on received payload
export const update = async (reportId: string, updateReqObject: IUpdateRequest): Promise<string> => {
    const currentTimestamp = Date.now().toString();

    return loadFromDatabase(reportId).then((report: Report) => {
        if (report) {
            updateTracts(report.tracts, updateReqObject.tracts);
            report.lastUpdatedTimestamp = currentTimestamp;

            return updateInDatabase(reportId, report);
        }
        return `Report not found for ${reportId}`;
    });
};

// load a report by id
export const load = async (id: string): Promise<Report> => {
    return loadFromDatabase(id);
};
