import {
  Component,
  inject,
  input,
  linkedSignal,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { AppConfig } from '@koalarx/ui/core/config';

export interface OnThisPageLink {
  label: string;
  elementId: string;
}

@Component({
  selector: 'kl-on-this-page',
  templateUrl: './on-this-page.html',
})
export class OnThisPage implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);

  readonly translations = AppConfig.translation.onThisPage;

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

  private onScroll = () => {
    const links = this.links();
    let current: string | null = null;
    for (const link of links) {
      const el = document.getElementById(link.elementId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 250) {
          current = link.elementId;
        }
      }
    }
    if (current) {
      this.activeSection.set(current);
    }
  };

  constructor() {
    this.activatedRoute.url.pipe(takeUntilDestroyed()).subscribe(() => {
      document.body.scrollTo({ top: 0 });
    });
  }

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
}
