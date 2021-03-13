import {Page} from "./report.interface";

export interface UpdateContent {
    newPages: Page[],
    modifiedPages: Page[],
}

export interface UpdateRequest {
    payload: Map<string, UpdateContent>
}
