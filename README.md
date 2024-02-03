# SAM Challenge
### Serverless Application Documentation


## Overview

This document provides an overview and documentation for the serverless application developed using AWS Lambda, API Gateway, and Cognito.


![alt-image](https://i.ibb.co/qYLbjLv/SAM-Challenge-drawio.png)

# Getting Started

To run and test the serverless application along with the NestJS integration, follow these steps:

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (Node Package Manager) installed

## Installation

1. Clone the repository:

```bash
git clone git@github.com:ahmed1amen/SAM-Challenge.git
```
   
2. Navigate to the project directory & Install dependencies:

```bash
cd SAM-Challenge
npm install
```

3. Run the Application:

```bash
npm start
```

This command will start the serverless application and launch the NestJS project to test the integration.


## Testing with NestJS

Modify the `username` and `password` parameters in the `initiateAuth` method inside `app.service.ts` to test different scenarios.

```typescript
// Example: Test with username 'john_doe' and password 'secure_password'
const response = await this.initiateAuth('john_doe', 'secure_password');
```

Feel free to explore and modify the code to suit your specific use case.

This section provides users with the necessary steps to install dependencies, run the application, and test it using NestJS. Customize it according to your project structure and requirements.

<br>

## Table of Contents

1. [Serverless Function (AWS Lambda)](#serverless-function)
2. [API Configuration (AWS API Gateway)](#api-configuration)
3. [User Authentication (AWS Cognito)](#user-authentication)
4. [NestJS Integration](#nestjs-integration)
5. [Success Message](#success-message)
 
## Serverless Function (AWS Lambda) <a name="serverless-function"></a>

### Lambda Function

The Lambda function is designed to perform a simple operation, taking input from the API Gateway and providing a response.

```javascript
export const handler = async (event, context) => {
    return {
        statusCode: 200,
        headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
            message: "Hello! , Welcome to the Serverless Application.",
        })
    };
};
```

## API Configuration (AWS API Gateway) <a name="api-configuration"></a>

1. Create a New API:
 - Created a new API in API Gateway.

2. Resource and Method Setup:

 - Added a resource and a method (POST) to the resource.
 - Configured the integration with the Lambda function.

3. Request and Response Types:
- Defined request and response types in API Gateway.

### Open API JSON
```json
{
  "openapi" : "3.0.1",
  "info" : {
    "title" : "SAM-Challenge-Api-Gateway",
    "version" : "2024-02-02 14:22:44UTC"
  },
  "servers" : [ {
    "url" : "https://ax2jtj9sp8.execute-api.eu-west-2.amazonaws.com/{basePath}",
    "variables" : {
      "basePath" : {
        "default" : "sam"
      }
    }
  } ],
  "paths" : {
    "/" : {
      "get" : {
        "responses" : {
          "default" : {
            "description" : "Default response for GET /"
          }
        },
        "security" : [ {
          "SAM-Authorizer" : [ ]
        } ],
        "x-amazon-apigateway-integration" : {
          "payloadFormatVersion" : "2.0",
          "type" : "aws_proxy",
          "httpMethod" : "POST",
          "uri" : "arn:aws:apigateway:eu-west-2:lambda:path/2015-03-31/functions/arn:aws:lambda:eu-west-2:523348691065:function:SAM-Challenge-Function/invocations",
          "connectionType" : "INTERNET"
        }
      }
    }
  },
  "components" : {
    "securitySchemes" : {
      "SAM-Authorizer" : {
        "type" : "oauth2",
        "flows" : { },
        "x-amazon-apigateway-authorizer" : {
          "identitySource" : "$request.header.Authorization",
          "jwtConfiguration" : {
            "audience" : [ "698ebro9nbi13svoreh9oqu01l" ],
            "issuer" : "https://cognito-idp.eu-west-2.amazonaws.com/eu-west-2_nIxdPOF0B"
          },
          "type" : "jwt"
        }
      }
    }
  },
  "x-amazon-apigateway-importexport-version" : "1.0"
}
```

## User Authentication (AWS Cognito) <a name="user-authentication"></a>

1. Cognito User Pool:
- Created a new Cognito User Pool and configured necessary settings.
2. App Client:
- Set up an App Client within the User Pool.
3. Authorizer Setup:
- Created an Authorizer in API Gateway using the Cognito User Pool.
 
 ## Protecting API Endpoints
 1. Configured the method request in API Gateway to require an Authorization header.
2. Attached the Cognito Authorizer to the method.

## NestJS Integration <a name="nestjs-integration"></a>

To test and interact with the API, the NestJS framework was used. relevant code in this file `src/app.services.ts`


## Success Message <a name="success-message"></a>

When the request is authenticated, and Lambda is triggered successfully, the following success message will be returned:

```json
{
  "message": "Hello! , Welcome to the Serverless Application."
}

```


## Conclusion
This documentation provides an overview of the serverless application, its components, the integration between AWS Lambda, API Gateway, and Cognito, how NestJS was used to test and interact with the API, and the success message returned upon successful authentication and Lambda execution.

 
