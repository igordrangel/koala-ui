import type { Locale } from '../../locale.types';
import { INSTALLATION_PAGE } from './installation';
import { INTRODUCTION_PAGE } from './introduction';
import { ALERT_PAGE } from './alert';
import { BOTTOM_SHEET_PAGE } from './bottom-sheet';
import { BREADCRUMB_PAGE } from './breadcrumb';
import { BUTTON_PAGE } from './button';
import { CALENDAR_PAGE } from './calendar';
import { CHECKBOX_PAGE } from './checkbox';
import { COLLAPSE_PAGE } from './collapse';
import { COMBOBOX_PAGE } from './combobox';
import { CONFIRM_PAGE } from './confirm';
import { DROPDOWN_PAGE } from './dropdown';
import { FIELDSET_PAGE } from './fieldset';
import { INLINE_FILTER_PAGE } from './inline-filter';
import { INPUT_CNPJ_PAGE } from './input-cnpj';
import { INPUT_COLOR_PAGE } from './input-color';
import { INPUT_CPF_PAGE } from './input-cpf';
import { INPUT_CURRENCY_PAGE } from './input-currency';
import { INPUT_FIELD_PAGE } from './input-field';
import { LOADING_PAGE } from './loading';
import { MODAL_PAGE } from './modal';
import { PAGINATION_PAGE } from './pagination';
import { RADIO_PAGE } from './radio';
import { RANGE_PAGE } from './range';
import { SELECT_PAGE } from './select';
import { SIDE_WINDOW_PAGE } from './side-window';
import { SKELETON_PAGE } from './skeleton';
import { STEPPER_PAGE } from './stepper';
import { TABLE_PAGE } from './table';
import { TABS_PAGE } from './tabs';
import { TEXT_EDITOR_PAGE } from './text-editor';
import { TEXTAREA_PAGE } from './textarea';
import { TOAST_PAGE } from './toast';
import { TOGGLE_PAGE } from './toggle';
import { TOOLTIP_PAGE } from './tooltip';
import { VALIDATOR_PAGE } from './validator';
import { DATATABLE_PAGE } from './datatable';
import { LOGIN_PAGE } from './login';
import { AUTH_PAGE } from './auth';
import { GLOBAL_ERRORS_PAGE } from './global-errors';
import { HTTP_BASE_PAGE } from './http-base';
import { LIST_BASE_PAGE } from './list-base';
import { PAGE_BASE_PAGE } from './page-base';
import { RULES_PAGE } from './rules';

export { INSTALLATION_PAGE, type InstallationPageCopy } from './installation';
export { INTRODUCTION_PAGE, type IntroductionPageCopy } from './introduction';
export { ALERT_PAGE, type AlertPageCopy } from './alert';
export { BOTTOM_SHEET_PAGE, type BottomSheetPageCopy } from './bottom-sheet';
export { BREADCRUMB_PAGE, type BreadcrumbPageCopy } from './breadcrumb';
export { BUTTON_PAGE, type ButtonPageCopy } from './button';
export { CALENDAR_PAGE, type CalendarPageCopy } from './calendar';
export { CHECKBOX_PAGE, type CheckboxPageCopy } from './checkbox';
export { COLLAPSE_PAGE, type CollapsePageCopy } from './collapse';
export { COMBOBOX_PAGE, type ComboboxPageCopy } from './combobox';
export { CONFIRM_PAGE, type ConfirmPageCopy } from './confirm';
export { DROPDOWN_PAGE, type DropdownPageCopy } from './dropdown';
export { FIELDSET_PAGE, type FieldsetPageCopy } from './fieldset';
export { INLINE_FILTER_PAGE, type InlineFilterPageCopy } from './inline-filter';
export { INPUT_CNPJ_PAGE, type InputCnpjPageCopy } from './input-cnpj';
export { INPUT_COLOR_PAGE, type InputColorPageCopy } from './input-color';
export { INPUT_CPF_PAGE, type InputCpfPageCopy } from './input-cpf';
export { INPUT_CURRENCY_PAGE, type InputCurrencyPageCopy } from './input-currency';
export { INPUT_FIELD_PAGE, type InputFieldPageCopy } from './input-field';
export { LOADING_PAGE, type LoadingPageCopy } from './loading';
export { MODAL_PAGE, type ModalPageCopy } from './modal';
export { PAGINATION_PAGE, type PaginationPageCopy } from './pagination';
export { RADIO_PAGE, type RadioPageCopy } from './radio';
export { RANGE_PAGE, type RangePageCopy } from './range';
export { SELECT_PAGE, type SelectPageCopy } from './select';
export { SIDE_WINDOW_PAGE, type SideWindowPageCopy } from './side-window';
export { SKELETON_PAGE, type SkeletonPageCopy } from './skeleton';
export { STEPPER_PAGE, type StepperPageCopy } from './stepper';
export { TABLE_PAGE, type TablePageCopy } from './table';
export { TABS_PAGE, type TabsPageCopy } from './tabs';
export { TEXT_EDITOR_PAGE, type TextEditorPageCopy } from './text-editor';
export { TEXTAREA_PAGE, type TextareaPageCopy } from './textarea';
export { TOAST_PAGE, type ToastPageCopy } from './toast';
export { TOGGLE_PAGE, type TogglePageCopy } from './toggle';
export { TOOLTIP_PAGE, type TooltipPageCopy } from './tooltip';
export { VALIDATOR_PAGE, type ValidatorPageCopy } from './validator';
export { DATATABLE_PAGE, type DatatablePageCopy } from './datatable';
export { LOGIN_PAGE, type LoginPageCopy } from './login';
export { AUTH_PAGE, type AuthPageCopy } from './auth';
export { GLOBAL_ERRORS_PAGE, type GlobalErrorsPageCopy } from './global-errors';
export { HTTP_BASE_PAGE, type HttpBasePageCopy } from './http-base';
export { LIST_BASE_PAGE, type ListBasePageCopy } from './list-base';
export { PAGE_BASE_PAGE, type PageBasePageCopy } from './page-base';
export { RULES_PAGE, type RulesPageCopy } from './rules';

export const DOCS_PAGES = {
  installation: INSTALLATION_PAGE,
  introduction: INTRODUCTION_PAGE,
  alert: ALERT_PAGE,
  'bottom-sheet': BOTTOM_SHEET_PAGE,
  breadcrumb: BREADCRUMB_PAGE,
  button: BUTTON_PAGE,
  calendar: CALENDAR_PAGE,
  checkbox: CHECKBOX_PAGE,
  collapse: COLLAPSE_PAGE,
  combobox: COMBOBOX_PAGE,
  confirm: CONFIRM_PAGE,
  dropdown: DROPDOWN_PAGE,
  fieldset: FIELDSET_PAGE,
  'inline-filter': INLINE_FILTER_PAGE,
  'input-cnpj': INPUT_CNPJ_PAGE,
  'input-color': INPUT_COLOR_PAGE,
  'input-cpf': INPUT_CPF_PAGE,
  'input-currency': INPUT_CURRENCY_PAGE,
  'input-field': INPUT_FIELD_PAGE,
  loading: LOADING_PAGE,
  modal: MODAL_PAGE,
  pagination: PAGINATION_PAGE,
  radio: RADIO_PAGE,
  range: RANGE_PAGE,
  select: SELECT_PAGE,
  'side-window': SIDE_WINDOW_PAGE,
  skeleton: SKELETON_PAGE,
  stepper: STEPPER_PAGE,
  table: TABLE_PAGE,
  tabs: TABS_PAGE,
  'text-editor': TEXT_EDITOR_PAGE,
  textarea: TEXTAREA_PAGE,
  toast: TOAST_PAGE,
  toggle: TOGGLE_PAGE,
  tooltip: TOOLTIP_PAGE,
  validator: VALIDATOR_PAGE,
  datatable: DATATABLE_PAGE,
  login: LOGIN_PAGE,
  auth: AUTH_PAGE,
  'global-errors': GLOBAL_ERRORS_PAGE,
  'http-base': HTTP_BASE_PAGE,
  'list-base': LIST_BASE_PAGE,
  'page-base': PAGE_BASE_PAGE,
  rules: RULES_PAGE,
} as const;

export type DocsPageSlug = keyof typeof DOCS_PAGES;

export function docsPage<S extends DocsPageSlug>(slug: S, locale: Locale) {
  return DOCS_PAGES[slug][locale];
}
