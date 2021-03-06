import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { reportRouter } from "./routes/report.router";
import { dataSourceRouter } from "./routes/datasource.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

import swaggerUI from 'swagger-ui-express';
import swDocument from '../swagger.def';

dotenv.config();

/**
 * Application variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

/**
 *  Middleware configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(swDocument));

app.use('/api/property/report', reportRouter);
app.use('/api/property/data-source', dataSourceRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 * Server initialization
 */
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
