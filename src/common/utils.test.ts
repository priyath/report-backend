import {updateTracts} from './utils';
import {Report} from "../model/report.interface";
import {UpdateRequest} from "../model/request.interface";

const testReport: Report = {
    id: "abcd",
    createdTimestamp: "1234567890",
    lastUpdatedTimestamp: "1234567891",
    title: "My First Report",
    createdBy: "Gregory",
    tracts: new Map([
        ["abcd", [{pageNumber: 1, content: "<h2>Report Title</h2>"}]],
    ])
};

const testReqObject: UpdateRequest = {
    payload: new Map([
        ["abcd", {
            newPages: [{pageNumber: 2, content: "<h2>New page for report</h2>"}],
            modifiedPages: [{pageNumber: 1, content: "<h2>Report Title Updated</h2>"}]
            }
        ],
    ])
};

describe('Update existing report pages with 1 modified page and 1 new page',
    () => {
        updateTracts(testReport, testReqObject);
        const updatedTract = testReport.tracts.get("abcd");

        it('updated tract should have two new pages', () => {

            // @ts-ignore
            const pageCount = updatedTract.length;

            expect(pageCount).toEqual(2);
        });
        it('Page 1 content should be modified with updated request data', () => {
            // @ts-ignore
            expect(updatedTract[0].content).toEqual("<h2>Report Title Updated</h2>");
        });
});
