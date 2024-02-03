import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  async initiateAuth(username: string, password: string) {
    const cognitoIDPURL = 'https://cognito-idp.eu-west-2.amazonaws.com';
    const apiGatewayURL = 'https://ax2jtj9sp8.execute-api.eu-west-2.amazonaws.com/sam/';

    const headers = {
      'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
      'Content-Type': 'application/x-amz-json-1.1',
    };
    const data = {
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
      },
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: '698ebro9nbi13svoreh9oqu01l',
    };

    try {
      const response = await axios.post(cognitoIDPURL, data, { headers });

 
      const responseApiGateway = await axios.get(apiGatewayURL, {
        headers: {
          'Authorization': `Bearer ${response.data.AuthenticationResult.AccessToken}` ,
          'Content-Type': 'application/json',
        } 
      });

      return responseApiGateway.data;
    } catch (error) {
      console.error('Error:', error.response.data);
    return error.response.data;
    }
  }
  
}
