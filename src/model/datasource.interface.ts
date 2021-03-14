import { Tract } from "./property.interface";

export interface DataSource {
    tracts: { [key: string]: Tract }
}
