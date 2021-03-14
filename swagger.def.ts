const swReportRouter = {
    "/api/property/data-source": {
        "get": {
            "summary": "Retrieve the data source",
            "tags": [
                "source"
            ],
            "responses": {
                "200": {
                    "description": "Data source in JSON format"
                },
                "404": {
                    "description": "Data source not found"
                },
                "500": {
                    "description": "Internal Server Error"
                }
            },
        },
    },
    "/api/property/report": {
        "post": {
            "summary": "Create a new report",
            "tags": [
                "report"
            ],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                            "example": { "tracts": {"tract1": {"id": "tract1id", "pages": [{"pageNumber": "1", "content": "<h2>Hello World</h2>"}]}}, "createdBy":"Jon Doe", "title": "My new title"}
                        }
                    }
                }
            },
            "responses": {
                "200": {
                    "description": "User created"
                },
                "404": {
                    "description": "Report not found"
                },
                "500": {
                    "description": "Internal Server Error"
                }
            }
        }
    },
    "/api/property/report/{id}": {
        "get": {
            "summary": "Retrieve a report using the report id",
            "tags": [
                "report"
            ],
            "responses": {
                "200": {
                    "description": "Report in JSON format for specified id"
                },
                "404": {
                    "description": "Report not found"
                },
                "500": {
                    "description": "Internal Server Error"
                }
            },
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "type": "string",
                    "required": true,
                    "example": "5f711363-78bb-4c17-b1a8-698dd274ba44",
                }
            ]
        },
        "patch": {
            "summary": "Update existing report using provided report id",
            "tags": [
                "report"
            ],
            "parameters": [
                {
                    "name": "id",
                    "in": "path",
                    "type": "string",
                    "required": true,
                    "example": "5f711363-78bb-4c17-b1a8-698dd274ba44",
                }
            ],
            "requestBody": {
                "content": {
                    "application/json": {
                        "schema": {
                        },
                        "example": {"tracts":{"tractId1":{"id": "tractId1", "pages":[{"pageNumber":"1","content":"<h2>Hello World Test</h2>"}]}}}
                    },
                },
            },
            "responses": {
                "200": {
                    "description": "User created"
                },
                "404": {
                    "description": "Report not found"
                },
                "500": {
                    "description": "Internal Server Error"
                }
            }
        }
    },
};

const swagger = {
    openapi: '3.0.0',
    info: {
        title: 'Express API',
        version: '1.0.0',
        description: 'Reports API'
    },
    servers: [
        {
            url: 'http://localhost:7000',
            description: 'Development server'
        }
    ],
    paths: {
        ...swReportRouter
    }
};

export default swagger
