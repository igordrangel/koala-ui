/**
 * Applies a mask to a given string based on the provided mask pattern.
 *
 * The mask pattern can include the following characters:
 * - '0': Represents a digit (0-9)
 * - 'A': Represents an uppercase letter (A-Z)
 * - 'S': Represents an alphanumeric character (a-z, A-Z, 0-9)
 * - 'U': Represents an uppercase letter (A-Z)
 * - 'L': Represents a lowercase letter (a-z)
 *
 * Any other characters in the mask pattern will be treated as literals and included in the output.
 *
 * @param value The input string to be masked.
 * @param mask The mask pattern to apply to the input string.
 * @returns The masked string based on the provided mask pattern.
 */
export function stringMask(value: string, mask: string): string {
  const formatTable = {
    '0': /\d/,
    A: /[a-zA-Z]/,
    S: /[a-zA-Z0-9]/,
    U: /[A-Z]/,
    L: /[a-z]/,
  };

  let maskedValue = '';
  let valueIndex = 0;

  for (let i = 0; i < mask.length; i++) {
    const maskChar = mask[i];
    const format = formatTable[maskChar as keyof typeof formatTable];

    if (format) {
      while (valueIndex < value.length) {
        const valueChar = value[valueIndex];
        valueIndex++;

        if (format.test(valueChar)) {
          maskedValue += valueChar;
          break;
        }
      }
    } else {
      if (valueIndex < value.length) {
        maskedValue += maskChar;
      }
    }
  }

  return maskedValue;
}
