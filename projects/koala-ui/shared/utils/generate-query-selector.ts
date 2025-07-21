export function generateQuerySelector(elem: HTMLElement): string {
  const { tagName, id, className, parentElement } = elem;

  let str = '';

  if (id !== '' && id.match(/^[a-z].*/)) {
    str += `#${id}`;
    return str;
  }

  str = tagName.toLowerCase();

  if (className) {
    str +=
      '.' +
      className
        .replace(/(^\s)/gm, '')
        .replace(/(\s{2,})/gm, ' ')
        .split(/\s/)
        .filter((c) => !/[[,\],:]/.test(c))
        .join('.');
  }

  const needNthPart = (el: HTMLElement): boolean => {
    let sib = el.previousElementSibling;

    if (!el.className) {
      return true;
    }

    while (sib) {
      if (el.className !== sib.className) {
        return false;
      }

      sib = sib.previousElementSibling;
    }

    return false;
  };

  const getNthPart = (el: HTMLElement): string => {
    let childIndex = 1;

    let sib = el.previousElementSibling;
    while (sib) {
      childIndex++;
      sib = sib.previousElementSibling;
    }

    return `:nth-child(${childIndex})`;
  };

  if (needNthPart(elem)) {
    str += getNthPart(elem);
  }

  if (!parentElement) {
    return str;
  }

  return `${generateQuerySelector(parentElement)} > ${str}`;
}
