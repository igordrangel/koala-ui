import { AlertTriggerSample } from '@/features/components/alert/alert-trigger.sample';
import { BreadcrumbSample } from '@/features/components/breadcrumb/breadcrumb.sample';
import { CalendarDateSample } from '@/features/components/calendar/calendar-date.sample';
import { ComboboxLocalSample } from '@/features/components/combobox/combobox-local.sample';
import { FieldsetLoginSample } from '@/features/components/fieldset/fieldset-login.sample';
import { FieldsetSample } from '@/features/components/fieldset/fieldset.sample';
import { InputCpfSample } from '@/features/components/input-cpf/input-cpf.sample';
import { ModalTriggerSample } from '@/features/components/modal/modal-trigger.sample';
import { SelectSingleSample } from '@/features/components/select/select-single.sample';
import { SideWindowTriggerSample } from '@/features/components/side-window/side-window-trigger.sample';
import { SkeletonRectSample } from '@/features/components/skeleton/skeleton-rect.sample';
import { StepperSample } from '@/features/components/stepper/stepper.sample';
import { TableBasicSample } from '@/features/components/table/table-basic.sample';
import { ToastTriggerSample } from '@/features/components/toast/toast-trigger.sample';
import { ValidatorSample } from '@/features/components/validator/validator.sample';
import { Component } from '@angular/core';
import { ShowcaseCard } from './showcase-card';

@Component({
  selector: 'app-examples-showcase',
  host: { class: 'block w-full min-w-0' },
  templateUrl: './examples-showcase.html',
  imports: [
    ShowcaseCard,
    BreadcrumbSample,
    AlertTriggerSample,
    ToastTriggerSample,
    ModalTriggerSample,
    CalendarDateSample,
    SelectSingleSample,
    ComboboxLocalSample,
    StepperSample,
    SkeletonRectSample,
    TableBasicSample,
    SideWindowTriggerSample,
    InputCpfSample,
    FieldsetSample,
    FieldsetLoginSample,
    ValidatorSample,
  ],
})
export class ExamplesShowcase {}
