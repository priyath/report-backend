import {Page, Report} from "../model/report.interface";
import {UpdateContent, UpdateRequest} from "../model/request.interface";

export const updateTractPages = (currentPages: Page[], modifiedPages: Page[], newPages: Page[]): Page[] => {
    // update modified pages in the persisted report
    const updatedPages = currentPages.map(currPage => {
        const modPage = modifiedPages.find(modPage => modPage.pageNumber === currPage.pageNumber);
        return modPage ? modPage : currPage;
    });

    // append new pages at the end and return
    return [...updatedPages, ...newPages];
};

export const updateTracts = (persistedReport: Report, reqObject: UpdateRequest) => {
    // loop reqObject. For each tract id, update the persistedReport's page content

    reqObject.payload.forEach((pageObject: UpdateContent, tractIdToUpdate: string) => {
        const currPages = persistedReport.tracts.get(tractIdToUpdate) || [];

        persistedReport.tracts.set(tractIdToUpdate, updateTractPages(currPages,
            pageObject.modifiedPages, pageObject.newPages));
    });
};
