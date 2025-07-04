import {
  Component,
  input,
  linkedSignal,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';

export interface OnThisPageLink {
  label: string;
  elementId: string;
}

@Component({
  selector: 'kl-on-this-page',
  templateUrl: './on-this-page.html',
})
export class OnThisPage implements OnInit, OnDestroy {
  links = input.required<OnThisPageLink[]>();
  activeSection = signal<string | null>(null);

  linkSections = linkedSignal(() => {
    const links = this.links();
    const currentSection = this.activeSection();

    return links.map((link) => ({
      label: link.label,
      elementId: link.elementId,
      isActive: link.elementId === currentSection,
    }));
  });

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
  }

  ngOnInit(): void {
    this.activeSection.set(
      location.hash.match(/#[a-zA-Z]+/)?.[0]?.replace(/#/g, '') || null
    );
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  scrollTo(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      this.activeSection.set(elementId);
      const link = location.hash.match(/#[a-zA-Z]+/)
        ? location.hash.replace(/#([^#]*)$/, `#${elementId}`)
        : `${location.hash}#${elementId}`;

      history.pushState({}, '', link);

      const scrollPosition =
        element.getBoundingClientRect().top + window.scrollY - 100;

      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  }

  private onScroll = () => {
    const links = this.links();
    let current: string | null = null;
    for (const link of links) {
      const el = document.getElementById(link.elementId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200) {
          current = link.elementId;
        }
      }
    }
    if (current) {
      this.activeSection.set(current);
    }
  };
}
