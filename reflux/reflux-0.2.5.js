type RefluxActionChild = "progressed" | "completed" | "failed";

type Hooks = {
  preEmit?: Function;
  shouldEmit?: (preEmitValue: any) => boolean;
}

type RefluxActionOptions = Hooks & {
  sync?: boolean;
  asyncResult?: boolean;
  children?: RefluxActionChild[];
};

type RefluxAction = Function & Hooks & {
  sync: boolean;
  triggerAsync: Function;
  trigger: Function;
  listen: Function;
  completed: RefluxAction;
  failed: RefluxAction;
  promise(promise: Promise): any;
  listenAndPromise(asyncOperation: (...payloads: any) => Promise): any;
};

type StoreOptions = {
  init: Function;
};

type Store = {
  listen: Function;
  trigger: Function;
  listenToMany(actions: {[key: string]: RefluxAction}): any;
  listenTo(action: RefluxAction, listener: Function): any;
  listenables: Object;
};

declare module reflux {

  declare function createAction(options?: RefluxActionOptions): RefluxAction;

  declare function createActions(options: string[] | {[key: string]: RefluxActionOptions;}): Object;

  declare function createStore(options: StoreOptions): Store;

}