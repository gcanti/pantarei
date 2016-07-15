import React from 'react';

declare module 'react-router' {

  declare type Action = 'PUSH' | 'REPLACE' | 'POP';

  declare type BeforeUnloadHook = () => ?string;

  declare type CreateHistory = (options: ?HistoryOptions) => History;

  declare type CreateHistoryEnhancer = (createHistory: CreateHistory) => CreateHistory;

  declare type Hash = string;

  declare type History = {
    listenBefore: (hook: TransitionHook) => Function;
    listen: (listener: LocationListener) => Function;
    transitionTo: (location: Location) => void;
    push: (location: LocationDescriptor) => void;
    replace: (location: LocationDescriptor) => void;
    go: (n: number) => void;
    goBack: () => void;
    goForward: () => void;
    createKey: () => LocationKey;
    createPath: (location: LocationDescriptor) => Path;
    createHref: (location: LocationDescriptor) => Href;
  };

  declare type HistoryOptions = Object;

  declare type Href = string;

  declare type Location = {
    pathname: Pathname;
    search: Search;
    query: Query;
    state: LocationState;
    action: Action;
    key: LocationKey;
  };

  declare type LocationDescriptorObject = {
    pathname: Pathname;
    search: Search;
    query: Query;
    state: ?LocationState;
  };

  declare type LocationDescriptor = LocationDescriptorObject | Path;

  declare type LocationKey = string;

  declare type LocationListener = (location: Location) => void;

  declare type LocationState = Object;

  declare type Path = string;

  declare type Pathname = string;

  declare type Query = Object;

  declare type Search = string;

  declare type TransitionHook = (location: Location, callback: ?Function) => any;

  declare class Link extends React$Component {
    static defaultProps: {};
    props: {
      to: LocationDescriptor,
      activeClassName?: string,
      activeStyle?: Object,
      onClick?: Function,
      onlyActiveOnIndex?: boolean
    };
    state: void;
  }

  declare class Route extends React$Component {
    static defaultProps: {};
    props: {
      path?: string,
      onEnter?: (nextState: LocationState, replace: Function, callback?: Function) => void,
      component?: React.Component,
      components?: {[key: string]: React.Component},
      getComponent?: (nextState: LocationState, callback: Function) => void,
      getComponents?: (nextState: LocationState, callback: Function) => void,
      onChange?: (prevState: LocationState, nextState: LocationState, replace: Function, callback?: Function) => void,
      onLeave?: (prevState: LocationState) => void
    };
    state: void;
  }

  declare type RouterProps = Object;

  declare class Router extends React$Component {
    static defaultProps: {};
    props: {
      routes?: any,
      history: History,
      createElement?: (component: React.Component, props: RouterProps) => React$Element<*>,
      render?: (props: RouterProps) => void
    };
    state: void;
  }

  declare class Redirect extends React$Component {
    static defaultProps: {};
    props: {
      from: string,
      to: string,
      query?: Query
    };
    state: void;
  }

  declare module.exports: {
    Link: typeof Link;
    Route: typeof Route;
    Router: typeof Router;
    Redirect: typeof Redirect;
    hashHistory: any;
    applyRouterMiddleware: Function;
  };

}
