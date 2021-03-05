# Getting Started with the Report Editor Backend

This project serves as the backend API for the report-frontend. The project has been bootstrapped with webpack
to support Hot Module Replacement for local development.

## Project Structure
* data - Temporary folder to persist sample data
* model - Typed interfaces for data representation
* repository - Layer to retrieve data from persistent data store
* routes - Controller layer to handle API routes
* service - Logic layer to bridge controllers and repositories

Note: The project structure may be broken down into a modular structure as the repository grows to keep things more
organized.

## Available Scripts

In the project directory, you can run:

### `npm install` and `npm start`

Initializes the server on port 7000. To enable Hot Module Replacement, open a different terminal and run
`npm run webpack` and then run `npm start`.

## API Endpoints

1. GET /api/property/data-source

Endpoint to retrieve source data in JSON format.

Sample CURL: `curl localhost:7000/api/property/data-source`

2. GET /api/property/report/:id

Sample CURL: `curl localhost:7000/api/property/report/01de698b-53ad-4064-ada8-027438b281b0`

Endpoint to retrieve report data. Specify the report id as a URL parameter.

3. POST /api/property/report

Endpoint to create a new report. Request payload should contain the report content. Returns the report id
upon successful persisence

Sample CURL: `curl --header "Content-Type: application/json" --request POST --data '{"content":"<h2>New Report!</h2>","createdBy":"Jon Doe", "title": "My new title"}' http://localhost:7000/api/property/report`

4. POST /api/property/report/:id

Endpoint to update an existing report. The request payload will be processed and merged with the existing record.
New values will overwrite previous data.

Sample CURL: `curl --header "Content-Type: application/json" --request POST --data '{"content": "test content"}' http://localhost:7000/api/property/report/01de698b-53ad-4064-ada8-027438b281b0`



