ListBase is an abstraction resource for datatable lists, providing a default structure and functionalities for listing data. It serves as a base component that can be extended to create specific list implementations, such as user lists, product lists, etc.

## API

### Attributes

- **currentPage**: Signal that holds the current page number (pagination).
- **pageSize**: Signal that holds the number of items per page.
- **totalItems**: Signal that holds the total number of items.
- **orderedBy**: Signal that holds the ordering criteria.
- **filter**: Signal that holds the applied filter.
- **skeletonItems**: Computed signal for displaying placeholders while loading.
- **defaultList**: Default response for use in datalist.
- **filterPayload**: Payload for filters.
- **filterParams**: Parameters for filters.
- **datalist**: Abstract reference to the data resource.
- **reload**: Signal to reload the list.

### Methods

- **reloadList**: Triggers list reload.

### Filter Definitions

Define filters in the constructor of the class that extends ListBase.

## Usage

See usage examples in the [Database Block](./database.md).
