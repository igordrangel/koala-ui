import { InlineFilterField } from '../config';

export function optionsToQueryParams(options: InlineFilterField[]) {
  return options.reduce(
    (acc, option) => {
      const value = option.value();

      if (value) {
        acc[option.name] = value;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
}
