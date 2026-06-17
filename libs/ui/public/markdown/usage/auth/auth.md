This resource provides interceptor, guard and service for authentication in your application. It can be used to protect routes, manage user sessions, and handle authentication-related tasks.

## API

### Signals and Properties

- **loggedUser**: Signal holding the currently authenticated user (or undefined).
- **event**: Signal that emits authentication events (login, failure, loading, etc).
- **hasToken**: Computed signal indicating if an access token is present.
- **accessToken**: Getter for the current access token.
- **refreshToken**: Getter for the current refresh token.
- **isAuthenticated**: Computed signal indicating if a user is authenticated.

### Methods

- **auth(credentials: Credentials)**: Performs login with the provided credentials.
- **logout()**: Logs out, clearing tokens and user state.
- **updateToken()**: Updates the access token using the refresh token.
- **isExpired()**: Returns true if the access token is expired.

## Usage

See usage examples in the [Login Block](./login.md).
