export interface AuthConfig {
  storageTokenKey: string;
  storageRefreshTokenKey: string;
  homeRoute?: string;
  loginRoute?: string;
  userInfo: {
    url: string;
  };
  refreshToken: {
    url: string;
    data: {
      tokenKeyName: string;
      refreshTokenKeyName?: string;
    };
    response: {
      accessTokenKeyName: string;
      refreshTokenKeyName: string;
    };
  };
}
