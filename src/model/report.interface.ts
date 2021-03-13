export interface Page {
    pageNumber: number;
    content: string;
}

export interface BaseReport {
    title: string;
    createdBy: string;
    tracts: Map<string, Page[]>;
}

export interface Report extends BaseReport {
    id: string;
    createdTimestamp: string;
    lastUpdatedTimestamp: string;
}
