import { Tooltip } from '@/shared/components/tooltip';
import {
  booleanAttribute,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  resource,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { delay } from '@koalarx/utils/KlDelay';
import { DocsVersionService } from '../../docs-version/docs-version.service';

@Component({
  selector: 'app-section-container',
  templateUrl: './section-container.html',
  imports: [Tooltip, RouterLink],
})
export class SectionContainer implements OnDestroy {
  private readonly elementRef = inject(ElementRef);
  private readonly router = inject(Router);
  private readonly docsVersion = inject(DocsVersionService);
  private observer!: IntersectionObserver;

  readonly ignoreAIDoc = input(false, { transform: booleanAttribute });

  readonly copied = signal(false);

  readonly aiDocUrl = computed(() => {
    const segments = this.router.url
      .split(/[?#]/)[0]
      .split('/')
      .filter(Boolean);
    const slug = segments.at(-1) ?? '';
    return this.docsVersion.assetUrl(`docs/${slug}.md`);
  });

  readonly activeSectionId = signal<string>('');
  readonly onThisPage = resource({
    defaultValue: [],
    loader: async () => {
      await delay(100);

      const element = this.elementRef.nativeElement as HTMLElement;
      const links = element.querySelectorAll<HTMLAnchorElement>('.scroll-hash-link');

      const onThisPage: { label: string; fragment: string }[] = [];

      links.forEach((link) => {
        const label = link.textContent?.trim();
        const fragment = link.id;

        if (label && fragment) {
          onThisPage.push({ label, fragment });
        }
      });

      return onThisPage;
    },
  });

  constructor() {
    effect(() => {
      const onThisPage = this.onThisPage.value();

      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '-80px 0px -65% 0px', // Ativa quando a seção entra na área do topo
        threshold: 0,
      };

      this.observer?.disconnect();

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSectionId.set(entry.target.id);
          }
        });
      }, options);

      setTimeout(() => {
        onThisPage.forEach((item) => {
          const target = this.elementRef.nativeElement.querySelector(`#${item.fragment}`);
          if (target) this.observer.observe(target);
        });
      }, 100);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  copyAiDocUrl() {
    navigator.clipboard.writeText(this.aiDocUrl()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }
}
