declare class ReactRouterLocationBase {
  push(path: string): void;
  replace(path: string): void;
  pop(): void;
  getCurrentPath(): string;
}

declare class ReactRouterLocationListener extends ReactRouterLocationBase {
  addChangeListener(listener: Function): void;
  removeChangeListener(listener: Function): void;
}

declare class ReactRouterHashLocation extends ReactRouterLocationListener {}
declare class ReactRouterHistoryLocation extends ReactRouterLocationListener {}
declare class ReactRouterRefreshLocation extends ReactRouterLocationBase {}
declare class ReactRouterStaticLocation extends ReactRouterLocationBase {}

type ReactRouterLocation = ReactRouterHashLocation
  | ReactRouterHistoryLocation
  | ReactRouterRefreshLocation
  | ReactRouterStaticLocation;

declare class ReactRouterRoute {
  childRoutes?: ReactRouterRoute[];
  defaultRoute?: ReactRouterRoute;
  handler: ReactClass;
  ignoreScrollBehavior: boolean;
  isDefault: boolean;
  isNotFound: boolean;
  name?: string;
  onEnter?: Function;
  onLeave?: Function;
  paramNames: string[];
  path: string;
}

/*
declare class ReactRouterStateContextTypes {
  getCurrentParams(): Object;
  getCurrentPath(): string;
  getCurrentPathname(): string;
  getCurrentQuery(): Object;
  getCurrentRoutes(): ReactRouterRoute[];
  isActive(to: string, params?: Object, query?: Object): boolean;
}
*/

declare class ReactRouterState {
  //contextTypes: ReactRouterStateContextTypes;
  getParams(): Object;
  getPath(): string;
  getPathname(): string;
  getQuery(): Object;
  getRoutes(): ReactRouterRoute[];
  isActive(routeName: string, params?: Object, query?: Object): boolean;
}

type ReactRouterAction = "pop" | "push" | "replace";

declare class ReactRouterRunState {
  path: string;
  action: ?ReactRouterAction;
  pathname: string;
  params: Object;
  query: Object;
  routes: ReactRouterRoute[];
}

type ReactRouterEvent = {
  preventDefault(): void;
  stopPropagation(): void;
};

type ReactRouterLinkProps = {
  to: string;
  params?: Object;
  query?: Object;
  activeClassName?: string;
  activeStyle?: Object;
  onClick?: (event: ReactRouterEvent) => ?boolean;

  // some standard <a> attributes...
  title?: string;
  id?: string;
  className?: string;
  style?: Object;
  rel?: string;
};

type ReactRouterLink = ReactClass<any, ReactRouterLinkProps, any>;

type ReactRouterConfigProps = {
  name: string;
  path: string;
  handler: ReactClass<any, any, any>;
  ignoreScrollBehavior?: boolean;
};

type ReactRouterConfig = ReactClass<any, ReactRouterConfigProps, any>;

type ReactRouterRedirectProps = {
  from: string;
  to: string;
  params?: Object;
  query?: Object;
};

type ReactRouterRedirect = ReactClass<any, ReactRouterRedirectProps, any>;

declare class ReactRouterHistory {
  back(): void;
  length: number;
}

declare class ReactRouterNavigation {
  transitionTo(routeNameOrPath: string, params?: Object, query?: Object): void;
  replaceWith(routeNameOrPath: string, params?: Object, query?: Object): void;
  goBack(): void;
  makePath(routeName: string, params?: Object, query?: Object): string;
  makeHref(routeName: string, params?: Object, query?: Object): string;
}

type ReactRouterElement = ReactElement<any, ReactRouterConfigProps, any>;

declare class ReactRouterRouteHandlerMixin {
  getRouteDepth(): number;
  createChildRouteHandler(props: Object): ReactRouterElement;
}

type ReactRouterRunCallback = (handler: ReactClass<any, any, any>, state: ReactRouterRunState) => void;

type ReactRouterRun2 = (routes: ReactRouterElement, callback: ReactRouterRunCallback) => ReactRouter;
type ReactRouterRun3 = (routes: ReactRouterElement, location: string | ReactRouterLocation, callback: ReactRouterRunCallback) => ReactRouter;

declare class ReactRouterImitateBrowserBehavior {
  updateScrollPosition(position: {x: number; y: number;}, actionType: ReactRouterAction): void;
}

declare class ReactRouterScrollToTopBehavior {
  updateScrollPosition(): void;
}

type ReactRouterCreateOptions = {
  routes: ReactRouterElement;
  location?: ?ReactRouterLocation;
  scrollBehavior?: ReactRouterImitateBrowserBehavior | ReactRouterScrollToTopBehavior;
};

declare class ReactRouter {
  run(callback: ReactRouterRunCallback): void;
}

declare module 'react-router' {

  declare var DefaultRoute: ReactRouterConfig;
  declare var Link: ReactRouterLink;
  declare var NotFoundRoute: ReactRouterConfig;
  declare var Redirect: ReactRouterRedirect;
  declare var Route: ReactRouterConfig;
  declare var RouteHandler: ReactClass<any, {}, any>;

  declare var HashLocation: ReactRouterHashLocation;
  declare var HistoryLocation: ReactRouterHistoryLocation;
  declare var RefreshLocation: ReactRouterRefreshLocation;
  declare var StaticLocation: ReactRouterStaticLocation;

  declare var ImitateBrowserBehavior: ReactRouterImitateBrowserBehavior;
  declare var ScrollToTopBehavior: ReactRouterScrollToTopBehavior;

  declare var History: ReactRouterHistory;
  declare var Navigation: ReactRouterNavigation;
  declare var RouteHandlerMixin: ReactRouterRouteHandlerMixin;
  declare var State: ReactRouterState;

  /*
  declare var createRoute: any;
  declare var createDefaultRoute: any;
  declare var createNotFoundRoute: any;
  declare var createRedirect: any;
  declare var createRoutesFromReactChildren: any;
  */

  declare var run: ReactRouterRun2 & ReactRouterRun3;

  declare function create(options: ReactRouterCreateOptions): ReactRouter;

}
