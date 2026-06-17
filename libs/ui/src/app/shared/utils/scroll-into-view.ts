export function scrollIntoView(element: HTMLElement) {
  const parent = element.parentElement;

  if (!parent) {
    return;
  }

  const parentHasScroll = parent.scrollHeight > parent.clientHeight;

  if (!parentHasScroll) {
    return;
  }

  element.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}
