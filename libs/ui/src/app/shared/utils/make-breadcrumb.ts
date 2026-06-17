import { RouteData } from '@/core/utils/routes-registre';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

function makeParents(
  activatedRoute: ActivatedRoute,
  result: BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  const parentData = activatedRoute.snapshot.data as RouteData;

  if (parentData?.name) {
    const parentUrl = activatedRoute.snapshot.url.map((segment) => segment.path).join('/');

    if (parentUrl) {
      result.unshift({ label: parentData.name, url: `/${parentUrl}` });

      if (activatedRoute.parent) {
        return makeParents(activatedRoute.parent, result);
      }
    }
  }

  return result;
}

export function makeBreadcrumb(activatedRoute: ActivatedRoute) {
  return toSignal(
    activatedRoute.data.pipe(
      map((data) => {
        const result: BreadcrumbItem[] = [];
        const routeData = data as RouteData;

        if (activatedRoute.parent) {
          result.unshift(...makeParents(activatedRoute.parent));
        }

        result.push({ label: routeData.name });

        return result;
      }),
    ),
    { initialValue: [] },
  );
}
