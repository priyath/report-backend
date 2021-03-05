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

Sample CURL: `curl --header "Content-Type: application/json" --request POST --data '{"content":"<h2>New Report!</h2>","createdBy":"Jon Doe", "title": "My new title"}' http://localhost:7000/api/property/report`

Response: 
```
{
    "success":"true",
    "payload":{
        "id":"1b257c33-c6f4-4e6f-844d-d9f9a86fa3f5"
    }
}
```

4. **POST /api/property/report/:id**

Endpoint to update an existing report. The request payload will be processed and merged with the existing record.
New values will overwrite previous data.

Sample CURL: `curl --header "Content-Type: application/json" --request POST --data '{"content": "test content"}' http://localhost:7000/api/property/report/01de698b-53ad-4064-ada8-027438b281b0`

Response: 
```
{
    "success":"true",
    "payload":{
        "id":"01de698b-53ad-4064-ada8-027438b281b0"
    }
}
```


