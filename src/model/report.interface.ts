export interface Page {
    pageNumber: number;
    content: string;
}

export interface Tract {
    id: string,
    pages: Page[],
}

export interface Report {
    id: string;
    title: string;
    createdBy: string;
    createdTimestamp: string;
    lastUpdatedTimestamp: string;
    tracts: { [key: string]: Tract };
}
