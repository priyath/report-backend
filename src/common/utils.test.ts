import {updateTracts} from './utils';
import {Report} from "../model/report.interface";
import {IUpdateRequest} from "../model/request.interface";

const testReport: Report = {
    id: "abcd",
    createdTimestamp: "1234567890",
    lastUpdatedTimestamp: "1234567891",
    title: "My First Report",
    createdBy: "Gregory",
    tracts: {"tract1": {id: "tract1", pages: [{pageNumber: 1, content: "<h2>Report Title</h2>"}]}},

};

const testReportMultipleTracts: Report = {
    id: "abcd",
    createdTimestamp: "1234567890",
    lastUpdatedTimestamp: "1234567891",
    title: "My First Report",
    createdBy: "Gregory",
    tracts: {
        "tract1": {id: "tract1", pages: [{pageNumber: 1, content: "<h2>Report Tract1</h2>"}]},
        "tract2": {id: "tract2", pages: [
                {pageNumber: 1, content: "<h2>Report Tract2</h2>"},
                {pageNumber: 2, content: "<h2>Report Tract2 Page 2</h2>"},
                {pageNumber: 3, content: "<h2>Report Tract2 Page 3</h2>"}]},
        "tract3": {id: "tract3", pages: [{pageNumber: 1, content: "<h2>Report Tract3</h2>"}]},
        "tract4": {id: "tract4", pages: [{pageNumber: 1, content: "<h2>Report Tract4</h2>"}]},
        "tract5": {id: "tract5", pages: [{pageNumber: 1, content: "<h2>Report Tract5</h2>"}]},
    },

};

const testReqObject: IUpdateRequest = {
    tracts: {
        "tract1": {
            id: "tract1",
            pages: [
                {pageNumber: 1, content: "<h2>Report Title Updated</h2>"},
                {pageNumber: 2, content: "<h2>New page for report</h2>"}
            ],
        }
    }
};

const testReqObjectMultipleTracts: IUpdateRequest = {
    tracts: {
        "tract2": {
            id: "tract2",
            pages: [
                {pageNumber: 1, content: "<h2>Report Tract2 Updated</h2>"},
            ],
        },
        "tract1": {
            id: "tract1",
            pages: [
                {pageNumber: 1, content: "<h2>Report Tract1 Updated Content Page 1</h2>"},
                {pageNumber: 2, content: "<h2>Report Tract1 Updated Content Page 2</h2>"}
            ],
        },
        "tract6": {
            id: "tract6",
            pages: [
                {pageNumber: 1, content: "<h2>Report Tract6 Updated</h2>"},
            ],
        }
    }
};

describe('Update single report tract with new page content',
    () => {

        updateTracts(testReport.tracts, testReqObject.tracts);
        const updatedTractPages = testReport.tracts["tract1"].pages;

        it('updated tract should have two new pages', () => {

            // @ts-ignore
            const pageCount = updatedTractPages.length;

            expect(pageCount).toEqual(2);
        });
        it('Page 1 content should be modified with updated request data', () => {
            // @ts-ignore
            expect(updatedTractPages[0].content).toEqual("<h2>Report Title Updated</h2>");
        });
});

describe('Do not update single report tract if new tract content is empty',
    () => {
        const tractPages = testReport.tracts["tract1"].pages;
        const initialPageCount = tractPages.length;
        const initialPageContent = tractPages[0].content;

        updateTracts(testReport.tracts, {});
        const updatedTractPages = testReport.tracts["tract1"].pages;

        it('updated tract should have one page', () => {

            // @ts-ignore
            const pageCount = updatedTractPages.length;

            expect(pageCount).toEqual(initialPageCount);
        });
        it('Page 1 content should not be modified', () => {
            // @ts-ignore
            expect(updatedTractPages[0].content).toEqual(initialPageContent);
        });
    });


describe('Update multi report tract with new page content',
    () => {
        // initial page content
        const tract3Page1Content = testReportMultipleTracts.tracts['tract3'].pages[0].content.slice();
        const tract4Page1Content = testReportMultipleTracts.tracts['tract4'].pages[0].content.slice();
        const tract5Page1Content = testReportMultipleTracts.tracts['tract5'].pages[0].content.slice();

        updateTracts(testReportMultipleTracts.tracts, testReqObjectMultipleTracts.tracts);

        it ('Should contain 6 new tracts', () => {
            const tractCount = Object.keys(testReportMultipleTracts).length;
            expect(tractCount).toEqual(6);
        });

        it('Should contain 1 page for tract2', () => {
            const updatedTractPages2 = testReportMultipleTracts.tracts["tract2"].pages;

            // @ts-ignore
            const pageCountTract2 = updatedTractPages2.length;
            expect(pageCountTract2).toEqual(testReqObjectMultipleTracts.tracts['tract2'].pages.length);
        });
        it('Should contain 2 pages for tract1', () => {
            const updatedTractPages1 = testReportMultipleTracts.tracts["tract1"].pages;

            // @ts-ignore
            const pageCountTract1 = updatedTractPages1.length;
            expect(pageCountTract1).toEqual(testReqObjectMultipleTracts.tracts['tract1'].pages.length);
        });
        it('Should not modify pages not specified in update object', () => {

            // updated page content
            const tract3Page1ContentUpdated = testReportMultipleTracts.tracts['tract3'].pages[0].content;
            const tract4Page1ContentUpdated = testReportMultipleTracts.tracts['tract4'].pages[0].content;
            const tract5Page1ContentUpdated = testReportMultipleTracts.tracts['tract5'].pages[0].content;

            // @ts-ignore
            expect(tract3Page1Content).toEqual(tract3Page1ContentUpdated);
            expect(tract4Page1Content).toEqual(tract4Page1ContentUpdated);
            expect(tract5Page1Content).toEqual(tract5Page1ContentUpdated);
        });
    });
