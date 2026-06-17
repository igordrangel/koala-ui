import { OrderedBodyCol } from './ordered-body-col';
import { OrderedHeaderCol } from './ordered-header-col';
import { TableContainer } from './table-container';

export * from './ordered-body-col';
export * from './ordered-header-col';
export * from './table-container';

export const Table = [OrderedBodyCol, OrderedHeaderCol, TableContainer] as const;
