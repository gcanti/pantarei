declare module 'react-router' {

  declare class Route extends React$Component<void, {
    path?: string,
    onEnter?: Function,
    component?: any
  }, void> {}

  declare interface ReactRouter extends React$Component {
    Link: typeof React$Component;
    Route: typeof Route;
    Router: typeof React$Component;
    Redirect: typeof React$Component;
    hashHistory: any;
    applyRouterMiddleware: Function;
  }

  declare var exports: ReactRouter;

}
