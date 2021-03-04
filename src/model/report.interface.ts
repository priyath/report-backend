export interface BaseReport {
    title: string;
    createdBy: string;
    content: string;
}

export interface Report extends BaseReport {
    id: string;
    createdTimestamp: string;
    lastUpdatedTimestamp: string;
}
