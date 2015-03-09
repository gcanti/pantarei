type RefluxActionChild = "progressed" | "completed" | "failed";

type RefluxActionOptions = {
  sync?: boolean;
  asyncResult?: boolean;
  children?: RefluxActionChild[];
  preEmit?: Function;
  shouldEmit?: (preEmitValue: any) => boolean;
};

type RefluxActionProps = {
  sync: boolean;
  triggerAsync: Function;
  trigger: Function;
  listen: Function;
  completed: RefluxAction;
  failed: RefluxAction;
  promise(promise: Promise): any;
  listenAndPromise(asyncOperation: (...payloads: any) => Promise): any;
  preEmit?: Function;
  shouldEmit?: (preEmitValue: any) => boolean;
};

type RefluxAction = Function & RefluxActionProps;

type RefluxStoreOptions = {
  init: Function;
};

declare class RefluxStore {
  listen: (callback: Function) => (() => void); // unsubscribe()
  trigger: Function;
  listenToMany(actions: {[key: string]: RefluxAction}): any;
  listenTo(action: RefluxAction, listener: Function): any;
  listenables: Object;
}

declare module reflux {

  declare function createAction(options?: RefluxActionOptions): RefluxAction;

  declare function createActions(options: string[] | {[key: string]: RefluxActionOptions;}): Object;

  declare function createStore(options: RefluxStoreOptions): RefluxStore;

}