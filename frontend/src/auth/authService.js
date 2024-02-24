//Auth0 Service File ./frontend/src/auth/authService.js

import createAuth0Client from '@auth0/auth0-spa-js';

class AuthService {
  auth0Client = null;

  constructor() {
    this.configureClient();
  }

  fetchAuthConfig = () => fetch("/auth_config.json");

  configureClient = async () => {
    const response = await this.fetchAuthConfig();
    const config = await response.json();
  
    this.auth0Client = await createAuth0Client({
      domain: config.domain,
      clientId: config.clientId
    });
  };

  isAuthenticated = async () => {
    return this.auth0Client.isAuthenticated();
  };

  handleRedirectCallback = async () => {
    await this.auth0Client.handleRedirectCallback();
  };

  loginWithRedirect = async () => {
    await this.auth0Client.loginWithRedirect({
      redirect_uri: window.location.origin
    });
  };

  logout = () => {
    this.auth0Client.logout({
      returnTo: window.location.origin
    });
  };
}

export const authService = new AuthService();
