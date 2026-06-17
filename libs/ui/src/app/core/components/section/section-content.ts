import { Component, computed, ElementRef, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { randomString } from '@koalarx/utils/KlString';

@Component({
  selector: 'app-section-content',
  templateUrl: './section-content.html',
  imports: [RouterLink],
})
export class SectionContent {
  readonly titleElement = viewChild<ElementRef<HTMLElement>>('titleElement');

  readonly sectionId = computed(() => {
    const titleElement = this.titleElement();

    if (!titleElement) {
      return randomString(8);
    }

    const title = titleElement.nativeElement.textContent?.trim();
    const sectionId = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    return sectionId;
  });
}
