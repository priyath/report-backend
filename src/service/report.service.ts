import {Report} from '../model/report.interface';

/**
 * Service methods
 */
export const save = async (report: Report): Promise<null | void> => {

};

export const load = async (id: string): Promise<Report> => {
    return {
        id: "",
        name: "",
        createdBy: "",
        createdTimestamp: "",
        lastUpdatedTimestamp: "",
        content: "",
    };
};
