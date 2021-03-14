import {Tract} from "./report.interface";
import 'joi-extract-type';

export interface ICreateRequest {
    title: string;
    createdBy: string;
    tracts: { [key: string]: Tract };
}

export interface IUpdateRequest {
    tracts: { [key: string]: Tract }
}

export type IRequests = IUpdateRequest | ICreateRequest;
