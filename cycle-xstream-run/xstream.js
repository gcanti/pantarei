declare type xstream$Subscription<T> = {
  unsubscribe(): void;
};

declare type xstream$Listener<T> = {
  next(value: T): void;
  error(error: Error): void;
  complete(): void;
};

declare type xstream$Stream<T> = {
  addListener(listener: xstream$Listener<T>): void;
  removeListener(listener: xstream$Listener<T>): void;
  subscribe(listener: xstream$Listener<T>): xstream$Subscription<T>;
  map<R>(f: (f: T) => R): xstream$Stream<R>;
};

declare module "xstream" {

  declare type xstream$exports<T> = {
    default: xstream$exports<T>;
    of(...values: T[]): xstream$Stream<T>;
    fromArray(values: T[]): xstream$Stream<T>;
  };

  declare module.exports: xstream$exports<*>;
}
