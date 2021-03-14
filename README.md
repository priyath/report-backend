# Getting Started with the Report Editor Backend

This project serves as the backend API for the report-frontend. The project has been bootstrapped with webpack
to support Hot Module Replacement for local development.

## Project Structure
* data - Temporary folder to persist sample data
* model - Typed interfaces for data representation and schema for API request validation
* repository - Layer to retrieve data from persistent data store
* routes - Controller layer to handle API routes
* service - Logic layer to bridge controllers and repositories
* middleware - middleware chain to process request object
* common - common utility functions 

Note: The project structure may be broken down into a modular structure as the repository grows to keep things more
organized.

## Available Scripts

In the project directory, you can run:

### App Initialization

`npm install` and `npm run start` to initialize server on port 7000.

### Test Coverage
`npm run test` to run jest based testing for business logic within the application.

## API Endpoints

To interact with available endpoints, initialize the application and visit `http://localhost:7000/api-docs/` for swagger documentation.

1. **GET /api/property/data-source**

Endpoint to retrieve source data.

Sample CURL: `curl localhost:7000/api/property/data-source`

Response: 
```
{
    "success":"true",
    "payload":{"tracts:{}}
}

```

2. **GET /api/property/report/:id**

Endpoint to retrieve report data. Specify the report id as a URL parameter.

Sample CURL: `curl localhost:7000/api/property/report/01de698b-53ad-4064-ada8-027438b281b0`

Response: 
```
{
    "success":"true",
    "payload":{
        "id:"01de698b-53ad-4064-ada8-027438b281b0",
        "createdTimestamp":"1614832218897",
        "lastUpdatedTimestamp":"1614940985814",
        "content":"<h2>This is my first report</h2>"
    }
}
```

3. **POST /api/property/report**

Endpoint to create a new report. Request payload should contain the report content. Returns the report id
upon successful persistence

Sample CURL: `curl --header "Content-Type: application/json" --request POST --data '{ "tracts": {"tract1": {"id": "tract1id", "pages": [{"pageNumber": "1", "content": "<h2>Hello World</h2>"}]}}, "createdBy":"Jon Doe", "title": "My new title"}' http://localhost:7000/api/property/report`

Response: 
```
{
    "success":"true",
    "payload":{
        "id":"1b257c33-c6f4-4e6f-844d-d9f9a86fa3f5"
    }
}
```

4. **PATCH /api/property/report/:id**

Endpoint to update an existing report. The request payload will be processed and the corresponding tract content will be overwritten.
New values will overwrite previous data.

Sample CURL: `curl --header "Content-Type: application/json" --request PATCH --data '{"tracts":{"tract1":{"id": "tractId1", "pages":[{"pageNumber":"1","content":"<h2>Hello World Test</h2>"}]}}}' http://localhost:7000/api/property/report/01de698b-53ad-4064-ada8-027438b281b0`

Response: 
```
{
    "success":"true",
    "payload":{
        "id":"01de698b-53ad-4064-ada8-027438b281b0"
    }
}
```
