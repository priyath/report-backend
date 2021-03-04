import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { reportRouter } from "./routes/report.router";
import { dataSourceRouter } from "./routes/datasource.router";

dotenv.config();

/**
 * Application variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
console.log(process.env.PORT);
console.log(process.env.DB_PATH);
const app = express();

/**
 *  Middleware configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/property/report', reportRouter);
app.use('/api/property/data-source', dataSourceRouter);

/**
 * Server initialization
 */
const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

/**
 * Webpack HMR activation
 */
type ModuleId = string | number;

interface WebpackHotModule {
    hot?: {
        data: any;
        accept(
            dependencies: string[],
            callback?: (updatedDependencies: ModuleId[]) => void,
        ): void;
        accept(dependency: string, callback?: () => void): void;
        accept(errHandler?: (err: Error) => void): void;
        dispose(callback: (data: any) => void): void;
    };
}

declare const module: WebpackHotModule;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}
