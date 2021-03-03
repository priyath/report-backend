import { DataSource } from '../model/datasource.interface';

const source = require('../data/source.json');

/**
 * Service methods
 */
export const load = async (): Promise<DataSource> => {
    return source as DataSource;
};

