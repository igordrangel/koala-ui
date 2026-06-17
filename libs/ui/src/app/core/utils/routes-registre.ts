import { Type } from '@angular/core';
import { Route, Routes } from '@angular/router';
import { RouteAccessGuard } from '../guards/route-access.guard';
import { RouteRule } from '../models/logged-user';

export interface RouteData {
  name: string;
  rule: RouteRule;
  iconClass?: string;
  parent?: string;
}

export interface RouteConfig {
  path: string;
  name?: string;
  iconClass?: string;
  rule?: RouteRule;
  redirectTo?: string;
  pathMatch?: 'full' | 'prefix';
  component?: Type<any>;
  children?: Routes;
  data?: RouteData;
  loadChildren?: () => Promise<any>;
  loadComponent?: () => Promise<any>;
}

export const ROUTES_CONFIG: RouteConfig[] = [];

export function routesRegistre(routes: RouteConfig[]): Routes {
  ROUTES_CONFIG.push(...routes);

  return routes.map((r) => {
    const route: Route = {
      path: r.path,
    };

    if (r.redirectTo) {
      route.redirectTo = r.redirectTo;
      route.pathMatch = r.pathMatch;

      return route;
    } else if (r.component) {
      route.component = r.component;
    } else if (r.loadComponent) {
      route.loadComponent = r.loadComponent;
    } else if (r.children) {
      route.children = r.children.map((child) => {
        if (child.data && r.name) {
          (child.data as RouteData).parent = r.name;
        }
        return child;
      });
    } else if (r.loadChildren) {
      route.loadChildren = r.loadChildren;
    }

    if (r.rule) {
      route.canActivate = [RouteAccessGuard];
      route.data = { name: r.name, rule: r.rule, iconClass: r.iconClass } as RouteData;
    }

    return route;
  });
}
