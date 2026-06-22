HttpBase is an abstraction resource for HTTP services. It provides a default structure for REST calls, file downloads, and reactive data loading via `rxResource`.

## API

### Constructor

- **baseUrl**: API base URL (e.g. `environment.apiUrl`).
- **endpoint**: Resource endpoint segment (e.g. `'users'`).

### Protected methods

- **url(resourcePath?)**: Builds the full request URL.
- **get(queryParams?, resourcePath?)**: HTTP GET.
- **post(data, resourcePath?)**: HTTP POST.
- **put(data, resourcePath?)**: HTTP PUT.
- **patch(data, resourcePath?)**: HTTP PATCH.
- **delete(resourcePath?)**: HTTP DELETE.
- **getFile(queryParams?, resourcePath?)**: GET with `arraybuffer` response.
- **downloadFile(filename, resourcePath?, queryParams?)**: Triggers a browser file download.
- **resource(options?, resourcePath?)**: Returns an `rxResource` for reactive GET with optional `mapFn`.

## Usage

Pair with [Global Errors](./global-errors.md) for automatic HTTP error feedback.
