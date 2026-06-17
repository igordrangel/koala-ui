import { BuilderBase } from './builder.base';

export class CalendarBuilder extends BuilderBase {
  placeholder(placeholder?: string) {
    this.config.placeholder = placeholder;
    return this;
  }
}
