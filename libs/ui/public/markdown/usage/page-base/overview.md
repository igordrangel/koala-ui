PageBase is an abstraction resource for page components. It provides breadcrumb navigation and a reload signal to refresh child lists or tables.

## API

### Signals

- **reload**: Signal used to trigger a reload in child components.

### Methods

- **reloadList()**: Sets `reload` to `true` briefly so bound children can react.

### Properties

- **breadcrumbs**: Computed breadcrumb trail from the current `ActivatedRoute`.

## Usage

Use with the [Breadcrumb](./breadcrumb.md) component in your template.
