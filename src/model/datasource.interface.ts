import { Tract } from "./property.interface";

export interface DataSource {
    tracts: Map<number, Tract>
}
