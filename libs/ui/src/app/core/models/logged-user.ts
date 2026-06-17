export type RouteRule = undefined;

interface LoggedUserProps {
  id: string;
  name: string;
  avatar?: string;
  rules: RouteRule[];
}

export class LoggedUser {
  private readonly _id?: string;
  private readonly _name?: string;
  private readonly _avatar?: string;
  private readonly _rules?: RouteRule[];

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get avatar() {
    return this._avatar;
  }

  hasPermission(routeRule: RouteRule | RouteRule[] | undefined) {
    if (!routeRule) {
      return true;
    }

    if (Array.isArray(routeRule)) {
      return routeRule.some((rule) => this._rules?.includes(rule) ?? false);
    }

    return this._rules?.includes(routeRule) ?? false;
  }

  constructor(props: LoggedUserProps) {
    this._id = props.id;
    this._name = props.name;
    this._avatar = props.avatar;
    this._rules = props.rules;
  }
}
